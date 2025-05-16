import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { EmployeesTable } from "@/components/employees-table";

export default function EmployeesPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Nhân viên</h1>
        <div className="flex items-center gap-2">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Thêm nhân viên
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Tất cả nhân viên</CardTitle>
          <CardDescription>
            Quản lý thông tin và lịch làm việc của nhân viên
          </CardDescription>
        </CardHeader>
        <CardContent>
          <EmployeesTable />
        </CardContent>
      </Card>
    </div>
  );
}
