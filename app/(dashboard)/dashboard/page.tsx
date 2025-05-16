import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarClock, CreditCard, Users, Scissors } from "lucide-react";
import { DashboardChart } from "@/components/dashboard-chart";
import { AppointmentsList } from "@/components/appointments-list";
import { StaffSchedule } from "@/components/staff-schedule";

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Tổng quan</h1>
        <div className="flex items-center gap-2">
          <Tabs defaultValue="day">
            <TabsList>
              <TabsTrigger value="day">Ngày</TabsTrigger>
              <TabsTrigger value="week">Tuần</TabsTrigger>
              <TabsTrigger value="month">Tháng</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Lịch hẹn hôm nay
            </CardTitle>
            <CalendarClock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">+2 so với hôm qua</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Doanh thu hôm nay
            </CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.250.000 ₫</div>
            <p className="text-xs text-muted-foreground">+15% so với hôm qua</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Khách hàng mới
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">+1 so với hôm qua</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Dịch vụ phổ biến
            </CardTitle>
            <Scissors className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Cắt tóc nam</div>
            <p className="text-xs text-muted-foreground">8 lượt đặt hôm nay</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Doanh thu theo thời gian</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <DashboardChart />
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Dịch vụ theo số lượng</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-full flex-1">
                  <div className="flex items-center justify-between">
                    <div>Cắt tóc nam</div>
                    <div className="font-medium">42%</div>
                  </div>
                  <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full bg-primary"
                      style={{ width: "42%" }}
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center">
                <div className="w-full flex-1">
                  <div className="flex items-center justify-between">
                    <div>Nhuộm tóc</div>
                    <div className="font-medium">27%</div>
                  </div>
                  <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full bg-primary"
                      style={{ width: "27%" }}
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center">
                <div className="w-full flex-1">
                  <div className="flex items-center justify-between">
                    <div>Uốn tóc</div>
                    <div className="font-medium">18%</div>
                  </div>
                  <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full bg-primary"
                      style={{ width: "18%" }}
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center">
                <div className="w-full flex-1">
                  <div className="flex items-center justify-between">
                    <div>Gội đầu</div>
                    <div className="font-medium">13%</div>
                  </div>
                  <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full bg-primary"
                      style={{ width: "13%" }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Lịch hẹn sắp tới</CardTitle>
            <CardDescription>Các lịch hẹn trong hôm nay</CardDescription>
          </CardHeader>
          <CardContent>
            <AppointmentsList />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Nhân viên làm việc hôm nay</CardTitle>
            <CardDescription>Lịch làm việc và trạng thái</CardDescription>
          </CardHeader>
          <CardContent>
            <StaffSchedule />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
