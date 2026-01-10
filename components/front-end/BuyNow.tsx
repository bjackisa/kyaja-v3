"use client";
import { MdCheckCircle } from "react-icons/md";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { useRouter, useSearchParams } from "next/navigation";
import { clearCart } from "@/redux/slices/cartSlice";
import { UpdateProfile } from "./CheckOutProfileForm";

export default function BuyNow() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const dispatch = useDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();

  let singleBuyItem = searchParams.get("q") || "";

  const { data: session } = useSession();
  const user:any = session?.user;
  const [address, setAddress] = useState(user?.address || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [isLoadingOrder, setIsLoadingOrder] = useState(false);

  const singleItem = useSelector((store:any) => store.buynow);
  const cartItems = useSelector((store:any) => store.cart);
  // console.log(singleItem)
  useEffect(() => {
    // Check if the single item is stored in local storage
    const storedSingleItem = localStorage.getItem("singleItem");
    if (storedSingleItem) {
      // Use the stored single item if available
      singleBuyItem = JSON.parse(storedSingleItem);
      localStorage.removeItem("singleItem"); // Clear it from storage after use
    } else if (singleBuyItem.includes("single-item") && singleItem) {
      // If not in local storage, use the item from the search parameter
      localStorage.setItem("singleItem", JSON.stringify(singleItem));
    }
  }, [singleBuyItem, singleItem]);

  const hasSingleItem = singleBuyItem && singleItem;
  const hasCartItems = cartItems && cartItems.length > 0;

  // Update buyItems array based on the conditions
  const buyItems = hasSingleItem ? [singleItem] : cartItems;

  const subTotal = buyItems
    .reduce((acc:any, currentItem:any) => {
      return acc + currentItem.salePrice * (currentItem.qty || 1);
    }, 0)
    .toFixed(2);

  const generateOrderNumber = () => {
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 7).toUpperCase();
    return `ORD-${timestamp}-${randomString}`;
  };

  const handleOrder = async () => {
    const updatedSingleItem = { ...singleItem, qty: 1 };

    // console.log("btn clicked");
    if (!address || !phone) {
      toast.error("Please click the Change button to update your profile before checkout.");
      return;
    }

    setIsLoadingOrder(true);
    try {
      const orderNumber = generateOrderNumber();
      const orderData = {
        userId: user.id,
        name: user.name,
        email: user.email,
        phone,
        address,
        orderNumber,
        totalOrderAmount: parseInt(subTotal),
        paymentMethod: "Pay on Delivery",
        orderItems: [updatedSingleItem],
      };

      //  console.log(orderData)
      const response = await fetch(`${baseUrl}/api/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        const data = await response.json();
        toast.success("Order successfully placed!");
        router.push(`/order-confirmation/${data.id}`);
        if (!hasSingleItem) {
          dispatch(clearCart());
        }
      } else {
        toast.error("Failed to place the order.");
      }
    } finally {
      setIsLoadingOrder(false);
    }
  };
  return (
    <div className="flex lg:flex-row flex-col mx-auto gap-3 lg:py-10 py-4 lg:max-w-[70rem] w-full">
      <div className="lg:w-[70%] w-full bg-white">
        {/* Customer Address Section */}
        <div className="mb-5 bg-white lg:p-8 p-4 shadow-md lg:mt-0 mt-7">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-sm font-semibold text-gray-800 flex items-center gap-2">
           {
            !address || !phone ?(<MdCheckCircle color="red" size={17} />):(
              <MdCheckCircle color="#6dbd28" size={17} />
            )
           }
           
              1. CUSTOMER Details
            </h2>
            <UpdateProfile setAddress={setAddress} setPhone={setPhone} />
          </div>
              <p className="text-gray-700 text-sm">
            <span className="font-medium">{user?.name}</span>
            <br />
            {address ? (
              <>
                {address} | <span>{phone}</span>
              </>
            ) : (
              <span className="text-red-500">
                Please click the Change button to update your profile before checkout.
              </span>
            )}
          </p>
        </div>

        {/* Delivery Details Section */}
        <div className="mb-6 bg-white lg:p-8 p-2 shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-sm font-semibold text-gray-800 flex items-center gap-2">
              <MdCheckCircle color="#6dbd28" size={17} />
              2. DELIVERY DETAILS
            </h2>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-4">
            <div className="bg-green-100 text-green-800 text-xs p-2 rounded mt-2">
              SAVE UP TO UGX 4,000
            </div>
            <div className="text-orange-600 text-sm mt-2">
              Delivery starting from UGX 3,800 around Kampala
            </div>
          </div>

          {/* Shipments */}
          <div className="space-y-4">
            {hasSingleItem ? (
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <p className="text-gray-700 text-xs">Item to be Delivered</p>
                <div className="flex items-center mt-2">
                  <img
                      src={singleItem.imageUrl || "https://via.placeholder.com/50"}
                      alt="Product Image"
                    className="w-12 h-12 mr-4"
                  />
                  <div>
                    <p className="text-sm text-gray-700">
                      {singleItem.title} - {singleItem.description}
                    </p>
                    <p className="text-sm text-gray-600">QTY: 1</p>
                  </div>
                </div>
              </div>
            ) : (
              hasCartItems &&
              cartItems.map((item:any, index:any) => (
                <div
                  key={index}
                  className="p-4 bg-gray-50 rounded-lg border border-gray-200"
                >
                  <p className="text-gray-700 text-xs">Door Delivery</p>
                  <div className="flex items-center mt-2">
                    <img
                      src={item.imageUrl || "https://via.placeholder.com/50"}
                      alt="Product Image"
                      className="w-12 h-12 mr-4"
                    />
                    <div>
                      <p className="text-sm text-gray-700">{item.title}</p>
                      <p className="text-sm text-gray-600">QTY: {item.qty}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
 
          {
             !hasSingleItem && (
                <div className="flex justify-center items-center">
              <Link
                href="/cart"
                className="py-2 px-7 font-semibold hover:bg-[#ef7e0622] text-[#f89a1e] rounded-sm inline-flex items-center justify-center"
              >
                Modify cart
              </Link>
                </div>
             )
          }
          </div>
          <div className="mt-5">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-sm font-semibold text-gray-800 flex items-center gap-2">
                <MdCheckCircle color="#6dbd28" size={17} />
                4. Payment method
              </h2>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-4">
              <div className="bg-green-100 text-green-800 text-sm p-2 rounded mt-2">
                Pay on Delivery ( MTN or Airtel Money / Cash)
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="lg:w-[28%] w-full">
        <div className="bg-white p-6 rounded-lg shadow-md mt-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Order summary</h2>
          {hasSingleItem ? (
            <div className="flex justify-between items-center mb-4">
              <p className="text-gray-700 text-base">Item total (1)</p>
              <p className="text-gray-700 text-base">
                UGX {singleItem.salePrice}
              </p>
            </div>
          ) : (
            <>
              <div className="flex justify-between items-center mb-4">
                <p className="text-gray-700 text-base">
                  Items total ({cartItems.length})
                </p>
                <p className="text-gray-700 text-base">UGX {subTotal}</p>
              </div>
              <div className="flex justify-between items-center mb-4">
            <p className="text-gray-700">Delivery fees</p>
            <p className="text-gray-700">UGX 0</p>
          </div>
              <div className="flex justify-between items-center mb-6">
                <p className="text-base font-semibold text-gray-800">Total</p>
                <p className="text-base font-semibold text-gray-800">
                  UGX {parseFloat(subTotal)}
                </p>
              </div>
            </>
          )}
          <button  onClick={handleOrder}
            disabled={isLoadingOrder} className="w-full bg-[#f68b1e] text-white py-3 rounded-lg text-sm">
          {isLoadingOrder ? "Processing..." : "CONFIRM ORDER"}
          </button>
        </div>

        {/* Terms & Conditions */}
        <p className="text-xs text-gray-500 mt-6 text-center px-4">
          By proceeding, you are automatically accepting the{" "}
          <span className="text-orange-500 underline">Terms & Conditions</span>
        </p>
      </div>
    </div>
  );
}

