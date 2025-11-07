import { generateSlug } from "@/lib/generateSlug";
import {
    Body,
    Button,
    Container,
    Column,
    Head,
    Heading,
    Html,
    Img,
    Preview,
    Row,
    Section,
    Text,
    Tailwind,
  } from "@react-email/components";
  import * as React from "react";
  
  interface YelpRecentLoginEmailProps {
    userFirstName?: string;
    loginDate?: Date;
    loginDevice?: string;
    loginLocation?: string;
    loginIp?: string;
  }
  
  export const YelpRecentLoginEmail = ({
    name, email, phone, address, totalOrderAmount ,orderItems
  }: {
    name:string,
    email:string ,
    phone:string,
    address:string ,
    totalOrderAmount:number,
    orderItems:any
  }) => {

    const totalPrice = orderItems.reduce((acc: number, item: any) => acc + item.salePrice * item.qty, 0);
  
    return (
      <Html>
        <Head />
        <Preview>Yelp recent login</Preview>
        <Body style={main}>
          <Tailwind>
          <Container>
            <Section style={logo}>
              <Img src={`https://res.cloudinary.com/dirpuqqib/image/upload/v1726769055/logo2_lygob7.png`} className="w-[30px] h-[30px]"/>
            </Section>
  
            <Section style={content}>
              <Row>
                <Img
                  style={image}
                  width={620}
                  src={"https://media.istockphoto.com/id/1324465031/photo/high-angle-view-close-up-asian-woman-using-meal-delivery-service-ordering-food-online-with.jpg?s=612x612&w=0&k=20&c=fvBRmqFb-nYK46nrfC9091HH72a4anMzWoojG7WyDMk="}
                />
              </Row>
  
              <Row style={{ ...boxInfos, paddingBottom: "0" }}>
                <Column>
                  <Heading
                    style={{
                      fontSize: 32,
                      fontWeight: "bold",
                      textAlign: "center",
                    }}
                  >
                    Hi Admin Kyaja,
                  </Heading>
                  <Heading
                    as="h2"
                    style={{
                      fontSize: 26,
                      fontWeight: "bold",
                      textAlign: "center",
                    }}
                  >
                    We noticed a You have a new order. From Client Details below
                  </Heading>
  
                  <Text style={paragraph}>
                    <b>Name: </b>
                    {name}
                  </Text>
                  <Text style={{ ...paragraph, marginTop: -5 }}>
                    <b>Email: </b>
                    {email}
                  </Text>
                  <Text style={{ ...paragraph, marginTop: -5 }}>
                    <b>Location: </b>
                    {address}
                  </Text>
                  <Text style={{ ...paragraph, marginTop: -5 }}>
                    <b>Phone Number: </b>
                    {phone}
                  </Text>
                  <Text
                    style={{
                      color: "rgb(0,0,0, 0.5)",
                      fontSize: 14,
                      marginTop: -5,
                    }}
                  >
                    *The total amount from the order is :
                    {totalOrderAmount}
                  </Text>
                
                  <Text style={paragraph}>
                    Kindly respond To the Client Immediately.
                  </Text>
                  <Text style={{ ...paragraph, marginTop: -5 }}>
                    Thank you
                  </Text>
                </Column>
              </Row>
              <Row style={{ ...boxInfos, paddingTop: "0" }}>
                <Column style={containerButton} colSpan={2}>
                  <Button style={button}>Learn More</Button>
                </Column>
              </Row>
            </Section>
          
            <div className="mt-2">
  <table className="w-full border-collapse">
    <thead className="bg-[#000000] text-white text-left">
      <tr>
        <th className="p-3 text-xs">PRODUCTS</th>
        <th className="p-3 text-xs">PRICE</th>
        <th className="p-3 text-xs">ACTION</th>
      </tr>
    </thead>
    <tbody>
      {orderItems.map((item: any) => {
        const slug = generateSlug(item.title);
        return (
          <tr key={item.id}>
            <td style={{ borderBottom: "1px solid #e1e1e1" }} className="p-3 border-t text-xs">
              {item.qty}x {item.title}
            </td>
            <td style={{ borderBottom: "1px solid #e1e1e1" }} className="p-3 border-t text-xs">
              Shs {item.salePrice}
            </td>
            <td style={{ borderBottom: "1px solid #e1e1e1" }} className="p-3 border-t text-xs">
              <a
                href={`https://www.kyaja.com/p/${slug}`}
                className="inline-flex items-center justify-center px-2 py-1 text-xs font-medium text-gray-900 transition-all duration-200 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 hover:bg-gray-100"
              >
                View Product
              </a>
            </td>
          </tr>
        );
      })}
    </tbody>
    <tfoot>
      <tr>
        <td style={{ borderBottom: "1px solid #e1e1e1" }} className="p-3 border-t font-bold text-sm" colSpan={2}>
          TOTAL
        </td>
        <td style={{ borderBottom: "1px solid #e1e1e1" }} className="p-2 border-t font-bold text-xs">
          Shs {totalPrice}
        </td>
      </tr>
    </tfoot>
  </table>
</div>
  
            <Text
              style={{
                textAlign: "center",
                fontSize: 12,
                color: "rgb(0,0,0, 0.7)",
              }}
            >
              © 2025 | Yelp Inc., Kyaja.com
            </Text>
          </Container>
          </Tailwind>
        
        </Body>
      </Html>
    );
  };
  
  YelpRecentLoginEmail.PreviewProps = {
    userFirstName: "Alan",
    loginDate: new Date("September 7, 2022, 10:58 am"),
    loginDevice: "Chrome on Mac OS X",
    loginLocation: "Upland, California, United States",
    loginIp: "47.149.53.167",
  } as YelpRecentLoginEmailProps;
  
  export default YelpRecentLoginEmail;
  
  const main = {
    backgroundColor: "#fff",
    fontFamily:
      '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
  };
  
  const paragraph = {
    fontSize: 16,
  };
  
  const logo = {
    padding: "30px 20px",
  };
  
  const containerButton = {
    display: "flex",
    justifyContent: "center",
    width: "100%",
  };
  
  const button = {
    backgroundColor: "#e00707",
    borderRadius: 3,
    color: "#FFF",
    fontWeight: "bold",
    border: "1px solid rgb(0,0,0, 0.1)",
    cursor: "pointer",
    padding: "12px 30px",
  };
  
  const content = {
    border: "1px solid rgb(0,0,0, 0.1)",
    borderRadius: "3px",
    overflow: "hidden",
  };
  
  const image = {
    maxWidth: "100%",
  };
  
  const boxInfos = {
    padding: "20px",
  };
  
  