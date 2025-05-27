"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarClock, CreditCard, Users, Scissors } from "lucide-react";
import {
  DashboardChart,
  DashboardChartByMonth,
} from "@/components/dashboard-chart";
import { AppointmentsList } from "@/components/appointments-list";
import { StaffSchedule } from "@/components/staff-schedule";
import { useEffect, useState } from "react";
import { getDashboardData, getRevenue } from "@/lib/api/dashboard";

// Add number formatting function
const formatNumber = (num: number) => {
  return new Intl.NumberFormat("vi-VN").format(num);
};

// Add percentage formatting function
const formatPercentage = (num: number) => {
  const sign = num >= 0 ? "+" : "";
  return `${sign}${num.toFixed(2)}%`;
};

export default function DashboardPage() {
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [revenue, setRevenue] = useState<any>(null);
  useEffect(() => {
    const fetchDashboardData = async () => {
      const revenue = await getRevenue();
      setRevenue(revenue);
    };
    fetchDashboardData();
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Tổng quan</h1>
        <div className="flex items-center gap-2">
          <Tabs defaultValue="day">
            <TabsList></TabsList>
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
            <div className="text-2xl font-bold">
              {revenue?.appointment?.totalAppointmentToday} Lịch hẹn
            </div>
            <p
              className={`text-xs ${
                revenue?.appointment?.totalAppointmentTodayChange >= 0
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {formatPercentage(
                revenue?.appointment?.totalAppointmentTodayChange
              )}{" "}
              so với hôm qua
            </p>
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
            <div className="text-2xl font-bold">
              {formatNumber(revenue?.revenue?.totalRevenueToday)} VND
            </div>
            <p
              className={`text-xs ${
                revenue?.revenue?.totalRevenueTodayChange >= 0
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {formatPercentage(revenue?.revenue?.totalRevenueTodayChange)} so
              với hôm qua
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Số lượng khách hàng hôm nay
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatNumber(revenue?.invoice?.totalInvoiceToday)} khách hàng{" "}
            </div>
            <p
              className={`text-xs ${
                revenue?.invoice?.totalInvoiceTodayChange >= 0
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {formatPercentage(revenue?.invoice?.totalInvoiceTodayChange)} so
              với hôm qua
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Doanh thu 7 ngày gần đây
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatNumber(revenue?.revenue?.totalRevenue7days)} VND{" "}
            </div>
            <p
              className={`text-xs ${
                revenue?.revenue?.totalRevenue7dayChange >= 0
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {formatPercentage(revenue?.revenue?.totalRevenue7dayChange)} so
              với 7 ngày trước
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Khách hàng 7 ngày gần đây
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatNumber(revenue?.invoice?.totalInvoice7days)} khách hàng{" "}
            </div>
            <p
              className={`text-xs ${
                revenue?.invoice?.totalInvoice7dayChange >= 0
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {formatPercentage(revenue?.invoice?.totalInvoice7dayChange)} so
              với 7 ngày trước{" "}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Doanh thu 30 ngày gần đây
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatNumber(revenue?.revenue?.totalRevenue30days)} VND{" "}
            </div>
            <p
              className={`text-xs ${
                revenue?.revenue?.totalRevenue30dayChange >= 0
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {formatPercentage(revenue?.revenue?.totalRevenue30dayChange)} so
              với 30 ngày trước
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Khách hàng 30 ngày gần đây
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatNumber(revenue?.invoice?.totalInvoice30days)} khách hàng{" "}
            </div>
            <p
              className={`text-xs ${
                revenue?.invoice?.totalInvoice30dayChange >= 0
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {formatPercentage(revenue?.invoice?.totalInvoice30dayChange)} so
              với 30 ngày trước{" "}
            </p>
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
            <p
              className={`text-xs ${
                30 >= 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              {formatPercentage(8)} so với 8 ngày trước{" "}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Doanh thu theo thời gian</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <DashboardChart />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Doanh thu theo từng tháng</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <DashboardChartByMonth />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
