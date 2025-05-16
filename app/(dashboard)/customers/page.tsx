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
        <h1 className="text-3xl font-bold tracking-tight">Khách hàng</h1>
        <div className="flex items-center gap-2">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Thêm khách hàng
          </Button>
        </div>
      </div>

      <div className="flex items-center">
        <div className="relative max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Tìm kiếm khách hàng..."
            className="pl-8 w-[300px]"
          />
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Tất cả khách hàng</CardTitle>
          <CardDescription>
            Quản lý thông tin khách hàng và lịch sử dịch vụ
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CustomersTable />
        </CardContent>
      </Card>
    </div>
  );
}
