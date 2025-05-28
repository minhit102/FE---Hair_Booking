import { Button } from "@/components/ui/button";
import { Plus, Search } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { CustomersTable } from "@/components/customers-table";

export default function CustomersPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Thông kê đơn hàng</h1>
        <div className="flex items-center gap-2"></div>
      </div>

      <Card>
        <CardHeader></CardHeader>
        <CardContent>
          <CustomersTable />
        </CardContent>
      </Card>
    </div>
  );
}
