import { Button } from "@/components/ui/button";
import { Calendar, Download } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RevenueChart } from "@/components/revenue-chart";
import { RevenueByService } from "@/components/revenue-by-service";
import { RevenueByEmployee } from "@/components/revenue-by-employee";

export default function RevenuePage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Doanh thu</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Calendar className="mr-2 h-4 w-4" />
            Chọn ngày
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Xuất báo cáo
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Lịch hẹn hôm nay
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.250.000 ₫</div>
            <p className="text-xs text-muted-foreground">+15% so với hôm qua</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Doanh thu hôm nay
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24.500.000 ₫</div>
            <p className="text-xs text-muted-foreground">
              +8% so với tuần trước
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Doanh thu 7 ngày gần nhất
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">98.750.000 ₫</div>
            <p className="text-xs text-muted-foreground">
              +12% so 7 ngày trước đó
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Doanh thu 30 ngày gần nhất</CardTitle>
          <CardDescription>
            Biểu đồ doanh thu theo ngày trong tháng
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RevenueChart />
        </CardContent>
      </Card>

      <Tabs defaultValue="service">
        <TabsList>
          <TabsTrigger value="service">Theo dịch vụ</TabsTrigger>
          <TabsTrigger value="employee">Theo nhân viên</TabsTrigger>
        </TabsList>

        <TabsContent value="service" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Doanh thu theo dịch vụ</CardTitle>
              <CardDescription>
                Phân tích doanh thu theo từng loại dịch vụ
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RevenueByService />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="employee" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Doanh thu theo nhân viên</CardTitle>
              <CardDescription>
                Phân tích doanh thu theo từng nhân viên
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RevenueByEmployee />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
