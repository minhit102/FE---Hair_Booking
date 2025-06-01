"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  CalendarClock,
  CreditCard,
  Users,
  Scissors,
  TrendingUp,
  DollarSign,
  UserPlus,
  BarChart3,
  CalendarDays,
  LineChart,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  Calendar,
} from "lucide-react";
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
const formatPercentage = (num: number | undefined) => {
  if (num === undefined) return "0.00%";
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
    <div className="flex flex-col gap-6 p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Tổng quan</h1>
        <div className="flex items-center gap-2">
          <Tabs defaultValue="day">
            <TabsList></TabsList>
          </Tabs>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-l-4 border-l-blue-500 hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Lịch hẹn hôm nay
            </CardTitle>
            <CalendarClock className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {revenue?.appointment?.totalAppointmentToday} Lịch hẹn
            </div>
            <div className="flex items-center gap-1 mt-1">
              {revenue?.appointment?.totalAppointmentTodayChange >= 0 ? (
                <ArrowUpRight className="h-4 w-4 text-green-500" />
              ) : (
                <ArrowDownRight className="h-4 w-4 text-red-500" />
              )}
              <p
                className={`text-sm ${
                  revenue?.appointment?.totalAppointmentTodayChange >= 0
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {formatPercentage(
                  revenue?.appointment?.totalAppointmentTodayChange
                )}{" "}
                so với hôm qua
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500 hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Doanh thu hôm nay
            </CardTitle>
            <DollarSign className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatNumber(revenue?.revenue?.totalRevenueToday)} VND
            </div>
            <div className="flex items-center gap-1 mt-1">
              {revenue?.revenue?.totalRevenueTodayChange >= 0 ? (
                <ArrowUpRight className="h-4 w-4 text-green-500" />
              ) : (
                <ArrowDownRight className="h-4 w-4 text-red-500" />
              )}
              <p
                className={`text-sm ${
                  revenue?.revenue?.totalRevenueTodayChange >= 0
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {formatPercentage(revenue?.revenue?.totalRevenueTodayChange)} so
                với hôm qua
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500 hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Khách hàng mới
            </CardTitle>
            <UserPlus className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatNumber(revenue?.invoice?.totalInvoiceToday)} khách hàng
            </div>
            <div className="flex items-center gap-1 mt-1">
              {revenue?.invoice?.totalInvoiceTodayChange >= 0 ? (
                <ArrowUpRight className="h-4 w-4 text-green-500" />
              ) : (
                <ArrowDownRight className="h-4 w-4 text-red-500" />
              )}
              <p
                className={`text-sm ${
                  revenue?.invoice?.totalInvoiceTodayChange >= 0
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {formatPercentage(revenue?.invoice?.totalInvoiceTodayChange)} so
                với hôm qua
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500 hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Dịch vụ phổ biến
            </CardTitle>
            <Scissors className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-700">
              Cắt tóc nam
            </div>
            <div className="flex items-center gap-1 mt-1">
              <ArrowUpRight className="h-4 w-4 text-green-500" />
              <p className="text-sm text-green-500">
                {formatPercentage(8)} so với tuần trước
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Weekly Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-gradient-to-br from-blue-50 to-white hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Doanh thu 7 ngày
            </CardTitle>
            <Clock className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold text-blue-700">
              {formatNumber(revenue?.revenue?.totalRevenue7days)} VND
            </div>
            <div className="flex items-center gap-1 mt-1">
              {revenue?.revenue?.totalRevenue7dayChange >= 0 ? (
                <ArrowUpRight className="h-4 w-4 text-green-500" />
              ) : (
                <ArrowDownRight className="h-4 w-4 text-red-500" />
              )}
              <p
                className={`text-sm ${
                  revenue?.revenue?.totalRevenue7dayChange >= 0
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {formatPercentage(revenue?.revenue?.totalRevenue7dayChange)} so
                với 7 ngày trước
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-white hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Khách hàng 7 ngày
            </CardTitle>
            <Users className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold text-green-700">
              {formatNumber(revenue?.invoice?.totalInvoice7days)} khách hàng
            </div>
            <div className="flex items-center gap-1 mt-1">
              {revenue?.invoice?.totalInvoice7dayChange >= 0 ? (
                <ArrowUpRight className="h-4 w-4 text-green-500" />
              ) : (
                <ArrowDownRight className="h-4 w-4 text-red-500" />
              )}
              <p
                className={`text-sm ${
                  revenue?.invoice?.totalInvoice7dayChange >= 0
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {formatPercentage(revenue?.invoice?.totalInvoice7dayChange)} so
                với 7 ngày trước
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-white hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Doanh thu 30 ngày
            </CardTitle>
            <Calendar className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold text-purple-700">
              {formatNumber(revenue?.revenue?.totalRevenue30days)} VND
            </div>
            <div className="flex items-center gap-1 mt-1">
              {revenue?.revenue?.totalRevenue30dayChange >= 0 ? (
                <ArrowUpRight className="h-4 w-4 text-green-500" />
              ) : (
                <ArrowDownRight className="h-4 w-4 text-red-500" />
              )}
              <p
                className={`text-sm ${
                  revenue?.revenue?.totalRevenue30dayChange >= 0
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {formatPercentage(revenue?.revenue?.totalRevenue30dayChange)} so
                với 30 ngày trước
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-white hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Khách hàng 30 ngày
            </CardTitle>
            <CalendarDays className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold text-orange-700">
              {formatNumber(revenue?.invoice?.totalInvoice30days)} khách hàng
            </div>
            <div className="flex items-center gap-1 mt-1">
              {revenue?.invoice?.totalInvoice30dayChange >= 0 ? (
                <ArrowUpRight className="h-4 w-4 text-green-500" />
              ) : (
                <ArrowDownRight className="h-4 w-4 text-red-500" />
              )}
              <p
                className={`text-sm ${
                  revenue?.invoice?.totalInvoice30dayChange >= 0
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {formatPercentage(revenue?.invoice?.totalInvoice30dayChange)} so
                với 30 ngày trước
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <LineChart className="h-5 w-5 text-blue-500" />
              Doanh thu theo thời gian
            </CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <DashboardChart />
          </CardContent>
        </Card>

        <Card className="shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <BarChart3 className="h-5 w-5 text-green-500" />
              Doanh thu theo từng tháng
            </CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <DashboardChartByMonth />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
