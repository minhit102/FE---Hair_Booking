"use client";

import { useState } from "react";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import {
  BarChart,
  CalendarIcon,
  LineChart,
  MoreHorizontal,
  Plus,
  Search,
  User,
  Users,
} from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

// Dữ liệu mẫu cho thống kê
const stats = [
  {
    title: "Tổng số lịch đặt",
    value: "128",
    change: "+14%",
    changeType: "increase",
  },
  {
    title: "Doanh thu",
    value: "12.5M",
    change: "+5.2%",
    changeType: "increase",
  },
  {
    title: "Khách hàng mới",
    value: "42",
    change: "+18%",
    changeType: "increase",
  },
  {
    title: "Tỷ lệ hoàn thành",
    value: "95%",
    change: "+2.3%",
    changeType: "increase",
  },
];

// Dữ liệu mẫu cho lịch đặt
const appointments = [
  {
    id: "app-1",
    customer: "Nguyễn Văn A",
    service: "Cắt tóc nam",
    stylist: "Trần Văn B",
    date: "2024-05-15",
    time: "09:00",
    status: "confirmed",
  },
  {
    id: "app-2",
    customer: "Lê Thị C",
    service: "Nhuộm tóc",
    stylist: "Phạm Văn D",
    date: "2024-05-15",
    time: "10:30",
    status: "confirmed",
  },
  {
    id: "app-3",
    customer: "Trần Văn E",
    service: "Cắt tóc + Gội đầu",
    stylist: "Trần Văn B",
    date: "2024-05-15",
    time: "13:00",
    status: "pending",
  },
  {
    id: "app-4",
    customer: "Phạm Thị F",
    service: "Uốn tóc",
    stylist: "Nguyễn Thị G",
    date: "2024-05-15",
    time: "15:30",
    status: "confirmed",
  },
  {
    id: "app-5",
    customer: "Hoàng Văn H",
    service: "Cắt tóc nam",
    stylist: "Phạm Văn D",
    date: "2024-05-16",
    time: "09:00",
    status: "confirmed",
  },
];

// Dữ liệu mẫu cho nhân viên
const stylists = [
  {
    id: "stylist-1",
    name: "Trần Văn B",
    role: "Senior Stylist",
    appointments: 5,
  },
  { id: "stylist-2", name: "Phạm Văn D", role: "Stylist", appointments: 3 },
  {
    id: "stylist-3",
    name: "Nguyễn Thị G",
    role: "Junior Stylist",
    appointments: 2,
  },
];

// Dữ liệu mẫu cho dịch vụ
const services = [
  { id: "service-1", name: "Cắt tóc nam", price: "100.000đ", bookings: 45 },
  { id: "service-2", name: "Cắt tóc nữ", price: "150.000đ", bookings: 32 },
  { id: "service-3", name: "Nhuộm tóc", price: "300.000đ", bookings: 28 },
  { id: "service-4", name: "Uốn tóc", price: "400.000đ", bookings: 15 },
  { id: "service-5", name: "Combo VIP Nam", price: "250.000đ", bookings: 20 },
];

// Dữ liệu mẫu cho khách hàng
const customers = [
  {
    id: "customer-1",
    name: "Nguyễn Văn A",
    email: "nguyenvana@example.com",
    phone: "0123456789",
    bookings: 3,
  },
  {
    id: "customer-2",
    name: "Lê Thị C",
    email: "lethic@example.com",
    phone: "0987654321",
    bookings: 5,
  },
  {
    id: "customer-3",
    name: "Trần Văn E",
    email: "tranvane@example.com",
    phone: "0369852147",
    bookings: 2,
  },
  {
    id: "customer-4",
    name: "Phạm Thị F",
    email: "phamthif@example.com",
    phone: "0123789456",
    bookings: 1,
  },
  {
    id: "customer-5",
    name: "Hoàng Văn H",
    email: "hoangvanh@example.com",
    phone: "0987123456",
    bookings: 4,
  },
];

export default function AdminPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [activeTab, setActiveTab] = useState("dashboard");
  const router = useRouter();

  const filteredAppointments = appointments.filter((app) => {
    const matchesDate = app.date === format(date || new Date(), "yyyy-MM-dd");
    const matchesSearch = app.customer
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || app.status === statusFilter;
    return matchesDate && matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <div className="hidden md:flex w-64 flex-col bg-gray-900 text-white">
        <div className="p-4 border-b border-gray-800">
          <h2 className="text-xl font-bold">Admin Dashboard</h2>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          <Button
            variant="ghost"
            className={cn(
              "w-full justify-start",
              activeTab === "dashboard" && "bg-gray-800"
            )}
            onClick={() => setActiveTab("dashboard")}
          >
            <BarChart className="mr-2 h-4 w-4" />
            Thống kê
          </Button>
          <Button
            variant="ghost"
            className={cn(
              "w-full justify-start",
              activeTab === "appointments" && "bg-gray-800"
            )}
            onClick={() => setActiveTab("appointments")}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            Lịch hẹn
          </Button>
          <Button
            variant="ghost"
            className={cn(
              "w-full justify-start",
              activeTab === "stylists" && "bg-gray-800"
            )}
            onClick={() => setActiveTab("stylists")}
          >
            <Users className="mr-2 h-4 w-4" />
            Nhân viên
          </Button>
          <Button
            variant="ghost"
            className={cn(
              "w-full justify-start",
              activeTab === "services" && "bg-gray-800"
            )}
            onClick={() => setActiveTab("services")}
          >
            <LineChart className="mr-2 h-4 w-4" />
            Dịch vụ
          </Button>
          <Button
            variant="ghost"
            className={cn(
              "w-full justify-start",
              activeTab === "customers" && "bg-gray-800"
            )}
            onClick={() => setActiveTab("customers")}
          >
            <User className="mr-2 h-4 w-4" />
            Khách hàng
          </Button>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-auto">
        <div className="container py-8 px-4 md:px-6">
          {/* Dashboard */}
          {activeTab === "dashboard" && (
            <div className="space-y-8">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-bold tracking-tighter">
                    Dashboard
                  </h1>
                  <p className="text-gray-500">
                    Tổng quan về hoạt động của salon
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-[240px] justify-start text-left font-normal"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? (
                          format(date, "PPP", { locale: vi })
                        ) : (
                          <span>Chọn ngày</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="end">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat, index) => (
                  <Card key={index}>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-sm font-medium">
                        {stat.title}
                      </CardTitle>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className={cn(
                          "h-4 w-4",
                          stat.changeType === "increase"
                            ? "text-emerald-500"
                            : "text-rose-500"
                        )}
                      >
                        {stat.changeType === "increase" ? (
                          <path d="M7 17l5-5 5 5M7 7l5 5 5-5" />
                        ) : (
                          <path d="M7 7l5 5 5-5M7 17l5-5 5 5" />
                        )}
                      </svg>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{stat.value}</div>
                      <p
                        className={cn(
                          "text-xs",
                          stat.changeType === "increase"
                            ? "text-emerald-500"
                            : "text-rose-500"
                        )}
                      >
                        {stat.change} so với tháng trước
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Doanh thu theo dịch vụ</CardTitle>
                    <CardDescription>
                      Thống kê doanh thu theo từng loại dịch vụ
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px] flex items-center justify-center bg-muted/20 rounded-lg">
                      <p className="text-muted-foreground">
                        Biểu đồ doanh thu theo dịch vụ
                      </p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Lịch đặt theo thời gian</CardTitle>
                    <CardDescription>
                      Thống kê số lượng lịch đặt theo thời gian
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px] flex items-center justify-center bg-muted/20 rounded-lg">
                      <p className="text-muted-foreground">
                        Biểu đồ lịch đặt theo thời gian
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <CardTitle>Lịch đặt gần đây</CardTitle>
                      <CardDescription>
                        Danh sách các lịch đặt mới nhất
                      </CardDescription>
                    </div>
                    <Button variant="outline" size="sm">
                      Xem tất cả
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {appointments.slice(0, 3).map((appointment) => (
                      <div
                        key={appointment.id}
                        className="flex flex-col md:flex-row md:items-center justify-between gap-4 rounded-lg border p-4"
                      >
                        <div className="flex items-center gap-4">
                          <div className="rounded-full bg-gray-100 p-2">
                            <User className="h-4 w-4" />
                          </div>
                          <div>
                            <p className="font-medium">
                              {appointment.customer}
                            </p>
                            <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-500">
                              <span>{appointment.service}</span>
                              <span>•</span>
                              <span>{appointment.time}</span>
                              <span>•</span>
                              <span>{appointment.stylist}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span
                            className={cn(
                              "rounded-full px-2 py-1 text-xs",
                              appointment.status === "confirmed" &&
                                "bg-green-100 text-green-700",
                              appointment.status === "pending" &&
                                "bg-yellow-100 text-yellow-700",
                              appointment.status === "cancelled" &&
                                "bg-red-100 text-red-700"
                            )}
                          >
                            {appointment.status === "confirmed" &&
                              "Đã xác nhận"}
                            {appointment.status === "pending" && "Chờ xác nhận"}
                            {appointment.status === "cancelled" && "Đã hủy"}
                          </span>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Tùy chọn</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>Xem chi tiết</DropdownMenuItem>
                              <DropdownMenuItem>Chỉnh sửa</DropdownMenuItem>
                              <DropdownMenuItem className="text-red-600">
                                Hủy lịch
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Appointments */}
          {activeTab === "appointments" && (
            <div className="space-y-8">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-bold tracking-tighter">
                    Lịch hẹn
                  </h1>
                  <p className="text-gray-500">Quản lý tất cả các lịch hẹn</p>
                </div>
                <div className="flex flex-col md:flex-row gap-2">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-[240px] justify-start text-left font-normal"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? (
                          format(date, "PPP", { locale: vi })
                        ) : (
                          <span>Chọn ngày</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="end">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Thêm lịch hẹn
                  </Button>
                </div>
              </div>

              <Card>
                <CardHeader>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <CardTitle>Lịch hẹn</CardTitle>
                      <CardDescription>
                        Quản lý lịch hẹn ngày{" "}
                        {date && format(date, "dd/MM/yyyy", { locale: vi })}
                      </CardDescription>
                    </div>
                    <div className="flex flex-col md:flex-row gap-2">
                      <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                        <Input
                          type="search"
                          placeholder="Tìm kiếm khách hàng..."
                          className="pl-8"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                      </div>
                      <Select
                        value={statusFilter}
                        onValueChange={setStatusFilter}
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Trạng thái" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Tất cả</SelectItem>
                          <SelectItem value="confirmed">Đã xác nhận</SelectItem>
                          <SelectItem value="pending">Chờ xác nhận</SelectItem>
                          <SelectItem value="cancelled">Đã hủy</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {filteredAppointments.length > 0 ? (
                      filteredAppointments.map((appointment) => (
                        <div
                          key={appointment.id}
                          className="flex flex-col md:flex-row md:items-center justify-between gap-4 rounded-lg border p-4"
                        >
                          <div className="flex items-center gap-4">
                            <div className="rounded-full bg-gray-100 p-2">
                              <User className="h-4 w-4" />
                            </div>
                            <div>
                              <p className="font-medium">
                                {appointment.customer}
                              </p>
                              <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-500">
                                <span>{appointment.service}</span>
                                <span>•</span>
                                <span>{appointment.time}</span>
                                <span>•</span>
                                <span>{appointment.stylist}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span
                              className={cn(
                                "rounded-full px-2 py-1 text-xs",
                                appointment.status === "confirmed" &&
                                  "bg-green-100 text-green-700",
                                appointment.status === "pending" &&
                                  "bg-yellow-100 text-yellow-700",
                                appointment.status === "cancelled" &&
                                  "bg-red-100 text-red-700"
                              )}
                            >
                              {appointment.status === "confirmed" &&
                                "Đã xác nhận"}
                              {appointment.status === "pending" &&
                                "Chờ xác nhận"}
                              {appointment.status === "cancelled" && "Đã hủy"}
                            </span>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="h-4 w-4" />
                                  <span className="sr-only">Tùy chọn</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                  Xem chi tiết
                                </DropdownMenuItem>
                                <DropdownMenuItem>Chỉnh sửa</DropdownMenuItem>
                                <DropdownMenuItem className="text-red-600">
                                  Hủy lịch
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-gray-500">
                          Không có lịch hẹn nào cho ngày này
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Stylists */}
          {activeTab === "stylists" && (
            <div className="space-y-8">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-bold tracking-tighter">
                    Nhân viên
                  </h1>
                  <p className="text-gray-500">
                    Quản lý thợ cắt tóc và lịch làm việc
                  </p>
                </div>
                <Button onClick={() => router.push("/admin/stylists/add")}>
                  <Plus className="mr-2 h-4 w-4" />
                  Thêm nhân viên
                </Button>
              </div>

              <Card>
                <CardHeader>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <CardTitle>Danh sách nhân viên</CardTitle>
                      <CardDescription>
                        Quản lý thông tin và lịch làm việc của nhân viên
                      </CardDescription>
                    </div>
                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                      <Input
                        type="search"
                        placeholder="Tìm kiếm nhân viên..."
                        className="pl-8"
                      />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {stylists.map((stylist) => (
                      <div
                        key={stylist.id}
                        className="flex flex-col md:flex-row md:items-center justify-between gap-4 rounded-lg border p-4"
                      >
                        <div className="flex items-center gap-4">
                          <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                            <User className="h-5 w-5" />
                          </div>
                          <div>
                            <p className="font-medium">{stylist.name}</p>
                            <p className="text-sm text-gray-500">
                              {stylist.role}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-sm">
                            <p className="font-medium">
                              {stylist.appointments} lịch hẹn
                            </p>
                            <p className="text-gray-500">Hôm nay</p>
                          </div>
                          <Button variant="outline" size="sm">
                            Xem lịch
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Tùy chọn</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>Xem chi tiết</DropdownMenuItem>
                              <DropdownMenuItem>Chỉnh sửa</DropdownMenuItem>
                              <DropdownMenuItem className="text-red-600">
                                Xóa
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Services */}
          {activeTab === "services" && (
            <div className="space-y-8">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-bold tracking-tighter">
                    Dịch vụ
                  </h1>
                  <p className="text-gray-500">Quản lý các dịch vụ của salon</p>
                </div>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Thêm dịch vụ
                </Button>
              </div>

              <Card>
                <CardHeader>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <CardTitle>Danh sách dịch vụ</CardTitle>
                      <CardDescription>
                        Quản lý thông tin và giá cả các dịch vụ
                      </CardDescription>
                    </div>
                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                      <Input
                        type="search"
                        placeholder="Tìm kiếm dịch vụ..."
                        className="pl-8"
                      />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {services.map((service) => (
                      <div
                        key={service.id}
                        className="flex flex-col md:flex-row md:items-center justify-between gap-4 rounded-lg border p-4"
                      >
                        <div>
                          <p className="font-medium">{service.name}</p>
                          <p className="text-sm text-gray-500">
                            {service.bookings} lượt đặt
                          </p>
                        </div>
                        <div className="flex items-center gap-4">
                          <p className="font-medium">{service.price}</p>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Tùy chọn</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>Xem chi tiết</DropdownMenuItem>
                              <DropdownMenuItem>Chỉnh sửa</DropdownMenuItem>
                              <DropdownMenuItem className="text-red-600">
                                Xóa
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Customers */}
          {activeTab === "customers" && (
            <div className="space-y-8">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-bold tracking-tighter">
                    Khách hàng
                  </h1>
                  <p className="text-gray-500">Quản lý thông tin khách hàng</p>
                </div>
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    type="search"
                    placeholder="Tìm kiếm khách hàng..."
                    className="pl-8"
                  />
                </div>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Danh sách khách hàng</CardTitle>
                  <CardDescription>
                    Quản lý thông tin và lịch sử đặt lịch của khách hàng
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {customers.map((customer) => (
                      <div
                        key={customer.id}
                        className="flex flex-col md:flex-row md:items-center justify-between gap-4 rounded-lg border p-4"
                      >
                        <div className="flex items-center gap-4">
                          <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                            <User className="h-5 w-5" />
                          </div>
                          <div>
                            <p className="font-medium">{customer.name}</p>
                            <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-500">
                              <span>{customer.email}</span>
                              <span>•</span>
                              <span>{customer.phone}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-sm">
                            <p className="font-medium">
                              {customer.bookings} lịch hẹn
                            </p>
                          </div>
                          <Button variant="outline" size="sm">
                            Xem lịch sử
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Tùy chọn</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>Xem chi tiết</DropdownMenuItem>
                              <DropdownMenuItem>Chỉnh sửa</DropdownMenuItem>
                              <DropdownMenuItem>Đặt lịch mới</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
