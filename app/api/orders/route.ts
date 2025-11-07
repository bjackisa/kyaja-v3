"use server";
import YelpRecentLoginEmail from "@/components/AdminTemplate";
import EmailTemplate from "@/components/front-end/EmailTemplate";
import db from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const requestData = await request.json();

    const {
      userId,
      name,
      email,
      phone,
      address,
      orderNumber,
      totalOrderAmount,
      paymentMethod,
      orderItems,
    } = requestData;

    // Validate orderItems array
    if (!Array.isArray(orderItems) || orderItems.length === 0) {
      return NextResponse.json(
        { message: "Order items cannot be empty" },
        { status: 400 }
      );
    }

    const result = await db.$transaction(async (prisma) => {
      const newOrder = await prisma.order.create({
        data: {
          userId,
          name,
          email,
          phone,
          address,
          orderNumber,
          totalOrderAmount,
          paymentMethod,
        },
      });

      const newOrderItems = await prisma.orderItem.createMany({
        data: orderItems.map((item) => ({
          productId: item.id,
          quantity: parseInt(item.qty),
          price: parseFloat(item.salePrice),
          orderId: newOrder.id,
          imageUrl: item.imageUrl,
          title: item.title,
        })),
      });

      // Update product stock
      for (const item of orderItems) {
        await prisma.product.update({
          where: { id: item.id },
          data: {
            productStock: {
              decrement: parseInt(item.qty),
            },
          },
        });
      }

      return { newOrder, newOrderItems };
    });

    // Send emails (make these non-blocking)
    try {
      const [customerEmail, ownerEmail] = await Promise.allSettled([
        resend.emails.send({
          from: "Thank You For Ordering on kyaja ecommerce <info@kyaja.com>",
          to: email,
          subject: "Order Successful",
          react: EmailTemplate({ orderItems }),
        }),
        resend.emails.send({
          from: "You have a new Order <info@kyaja.com>",
          to: "info.kyaja@gmail.com",
          subject: "New Order",
          react: YelpRecentLoginEmail({
            name,
            email,
            phone,
            address,
            totalOrderAmount,
            orderItems,
          }),
        }),
      ]);

      // Log email failures but don't fail the order
      if (customerEmail.status === "rejected") {
        console.error("Customer email failed:", customerEmail.reason);
      }
      if (ownerEmail.status === "rejected") {
        console.error("Owner email failed:", ownerEmail.reason);
      }
    } catch (emailError) {
      console.error("Email sending error:", emailError);
      // Don't fail the order due to email issues
    }

    return NextResponse.json(
      {
        ...result.newOrder,
        message: "Order created successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Order creation error:", error);

    // Return more specific error messages
    if (error.code === "P2002") {
      return NextResponse.json(
        { message: "Order number already exists" },
        { status: 409 }
      );
    }

    return NextResponse.json(
      {
        message: "Failed to create order",
        error:
          process.env.NODE_ENV === "development"
            ? error.message
            : "Internal server error",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const orders = await db.order.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        orderItems: true,
      },
    });
    return NextResponse.json(orders);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "Failed to Fetch Orders",
        error,
      },
      { status: 500 }
    );
  }
}
