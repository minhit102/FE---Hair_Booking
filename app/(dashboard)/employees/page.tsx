import { Button } from "@/components/ui/button";
import { Plus, Users } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EmployeesTable } from "@/components/employees-table";

export default function EmployeesPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Nhân viên</h1>
        <div className="flex items-center gap-2"></div>
      </div>

      <Tabs defaultValue="list">
        <div className="flex items-center justify-between"></div>

        <TabsContent value="list" className="mt-4">
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
        </TabsContent>

        <TabsContent value="schedule" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Lịch làm việc</CardTitle>
              <CardDescription>
                Xem và quản lý lịch làm việc của nhân viên
              </CardDescription>
            </CardHeader>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
