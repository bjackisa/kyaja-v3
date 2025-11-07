import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function AnalyticsCard({ item }:any) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{item.title}</CardTitle>
        {/* <Icon className="h-4 w-4 text-muted-foreground" /> */}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {item.countUnit && item.countUnit}
          {item.count.toString().padStart(3, "0")}
        </div>
        <Link href={item.detailLink} className="text-xs text-muted-foreground">
          View Details
        </Link>
      </CardContent>
    </Card>
  );
}
