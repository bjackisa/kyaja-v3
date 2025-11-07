import {
  Activity,
  CreditCard,
  DollarSign,
  Users,
} from "lucide-react"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { getData } from "@/lib/getData";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
// import { format } from "date-fns";

export default async function UserDashboard() {
  const session = await getServerSession(authOptions);
  const id = session?.user?.id;
  const orders = await getData("orders");
  const userOrders = orders.filter((order:any) => order.userId === id);
  
  // Total Amount
  const totalAmount = userOrders.reduce((acc:any, order:any) => acc + order.totalOrderAmount , 0);
  
  // Orders Received This Month
  const currentMonth = new Date().getMonth();
  const ordersThisMonth = userOrders.filter((order:any)=>{
    const orderMonth = new Date(order.createdAt).getMonth();
    return orderMonth === currentMonth;
  });

  // Pending Orders
  const pendingOrders = userOrders.filter((order:any)=> order.orderStatus === "PROCESSING");

  return (
    <div className="flex min-h-screen w-full flex-col">
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Orders
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userOrders.length}</div>
            <p className="text-xs text-muted-foreground">
              All your total orders
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Amount
            </CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalAmount.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              Total amount from your orders
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Orders This Month
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{ordersThisMonth.length}</div>
            <p className="text-xs text-muted-foreground">
              Orders made this month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Orders</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingOrders.length}</div>
            <p className="text-xs text-muted-foreground">
              Orders with status pending
            </p>
          </CardContent>
        </Card>
      </div>

    
    </div>
  );
}

