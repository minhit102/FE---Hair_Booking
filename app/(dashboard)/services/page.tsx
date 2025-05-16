import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ServicesTable } from "@/components/services-table";

export default function ServicesPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Dịch vụ</h1>
        <div className="flex items-center gap-2">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Thêm dịch vụ
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Tất cả dịch vụ</CardTitle>
          <CardDescription>Quản lý các dịch vụ của salon</CardDescription>
        </CardHeader>
        <CardContent>
          <ServicesTable />
        </CardContent>
      </Card>
    </div>
  );
}
