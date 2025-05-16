import { Button } from "@/components/ui/button";
import { Calendar, Plus } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AppointmentsTable } from "@/components/appointments-table";

export default function AppointmentsPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Lịch hẹn</h1>
        <div className="flex items-center gap-2">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Thêm lịch hẹn
          </Button>
        </div>
      </div>

      <Tabs defaultValue="list">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="list">Danh sách</TabsTrigger>
            <TabsTrigger value="calendar">Lịch</TabsTrigger>
          </TabsList>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Calendar className="mr-2 h-4 w-4" />
              Hôm nay
            </Button>
          </div>
        </div>

        <TabsContent value="list" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Tất cả lịch hẹn</CardTitle>
              <CardDescription>Quản lý lịch hẹn của khách hàng</CardDescription>
            </CardHeader>
            <CardContent>
              <AppointmentsTable />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="calendar" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Lịch hẹn theo ngày</CardTitle>
              <CardDescription>Xem lịch hẹn theo dạng lịch</CardDescription>
            </CardHeader>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
