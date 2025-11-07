import {
  Body,
  Container,
  Head,
  Html,
  Img,
  Text,
  Font,
  Tailwind,
} from "@react-email/components";
import React from "react";

export const EmailTemplate = ({ orderItems }: any) => {
  // console.log(orderItems);
  // Calculate the total price
  const totalPrice = orderItems.reduce((acc: number, item: any) => acc + item.salePrice * item.qty, 0);

  return (
    <Html>
      <Head>
        <Font
          fontFamily="DM Sans"
          fallbackFontFamily="Verdana"
          webFont={{
            url: "https://fonts.gstatic.com/s/dmsans/v15/rP2Fp2ywxg089UriCZa4ET-DNl0.woff2",
            format: "woff2",
          }}
          fontWeight={400}
          fontStyle="initial"
        />
      </Head>
      <Body style={{ fontFamily: "DM Sans", margin: 0, padding: 0, background: "#f5f5f5" }}>
        <Tailwind>
          <Container className="bg-white mx-auto !mt-0 !mb-0">
            <div style={{ borderBottom: "1px solid #e1e1e1" }} className="!mt-0 !mb-0  mx-5">
              <div style={{ float: "left" }} className="w-1/2 h-[50px]">
                <img
                  src="https://res.cloudinary.com/dirpuqqib/image/upload/v1726769055/logo2_lygob7.png"
                  alt=""
                  className="w-full h-full object-contain mt-5"
                />
              </div>
              <Text style={{ float: "right" }} className="text-[#7d7d7d] text-sm pr-4">
                Thank You
              </Text>
            </div>

            <div className="p-6">
              <div className="text-center py-5 ">
                <div className="w-full h-[100px]">
                  <Img
                    src="https://a.mailmunch.co/user_data/landing_pages/1501739679705-animated-check.gif"
                    alt="Gift Card"
                    className="w-full h-full mx-auto object-contain mt-4"
                  />
                </div>
                <div>
                  <Text className="text-sm !mb-0 mt-4 text-[#303030]">Thank you for placing an order with us!</Text>
                  <Text className="text-sm !mt-0 text-[#303030]">Your order is in process now.</Text>
                </div>

                <Text className="text-[#7d7d7d] mt-2 text-[12px]">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit
                </Text>
              </div>

              {/* Products Table */}
              <div className="mt-2">
                <table className="w-full border-collapse">
                  <thead className="bg-[#000000] text-white text-left">
                    <tr>
                      <th className="p-3 text-xs ">PRODUCTS</th>
                      <th className="p-3 text-xs">PRICE</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orderItems.map((item: any) => (
                      <tr key={item.id}>
                        <td style={{ borderBottom: "1px solid #e1e1e1" }} className="p-3 border-t text-xs">
                          {item.qty}x {item.title}
                        </td>
                        <td style={{ borderBottom: "1px solid #e1e1e1" }} className="p-3 border-t text-xs">
                          Shs {item.salePrice}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td style={{ borderBottom: "1px solid #e1e1e1" }} className="p-3 border-t font-bold text-sm">
                        TOTAL
                      </td>
                      <td style={{ borderBottom: "1px solid #e1e1e1" }} className="p-2 border-t font-bold text-xs">
                       Shs{totalPrice}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>

              {/* Footer */}
              <div className="mt-10 text-center text-gray-500 text-xs">
                <Text className="text-xs !mt-0 !mb-0">
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium,
                  totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta
                  sunt explicabo.
                </Text>
                <div className="!mt-2 !mb-0">
                  <Text className="inline-block mx-2 text-gray-500 text-xs">Support</Text> |
                  <Text className="inline-block mx-2 text-gray-500 text-xs">Return Policy</Text> |
                  <Text className="inline-block mx-2 text-gray-500 text-xs">About us</Text>
                </div>
              </div>

              <div className="!mt-2 text-center text-gray-500 text-xs">
                <Text className="text-xs !mt-0 !mb-0">
                  Copyright © 2017 Your Company. All rights reserved. <br /> You received this email because you signed
                  up for My Company Inc.
                </Text>
              </div>

              <div className="mt-5 text-center text-gray-500 text-xs">
                <Text className="!mt-2 text-center text-gray-500 text-xs"></Text>
                <Text className="mt-2">
                  <a href="#" className="text-gray-500 text-xs">
                    Unsubscribe Now
                  </a>
                </Text>
              </div>
            </div>
          </Container>
        </Tailwind>
      </Body>
    </Html>
  );
};

export default EmailTemplate;
