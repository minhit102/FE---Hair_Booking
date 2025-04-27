"use client";

import { useState } from "react";
import Link from "next/link";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import {
  CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Clock,
  Scissors,
  User,
} from "lucide-react";

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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

// Dữ liệu mẫu cho lịch sử đặt lịch
const appointments = [
  {
    id: "app-1",
    service: "Cắt tóc nam",
    hairstyle: "Undercut",
    stylist: "Nguyễn Văn A",
    date: new Date(2024, 4, 15),
    time: "10:00",
    status: "upcoming",
    price: "100.000đ",
  },
  {
    id: "app-2",
    service: "Nhuộm tóc",
    hairstyle: "Highlight",
    stylist: "Trần Thị B",
    date: new Date(2024, 4, 10),
    time: "14:30",
    status: "completed",
    price: "300.000đ",
  },
  {
    id: "app-3",
    service: "Combo VIP Nam",
    hairstyle: "Pompadour",
    stylist: "Lê Văn C",
    date: new Date(2024, 3, 28),
    time: "09:00",
    status: "completed",
    price: "250.000đ",
  },
  {
    id: "app-4",
    service: "Cắt tóc nữ",
    hairstyle: "Bob",
    stylist: "Phạm Thị D",
    date: new Date(2024, 3, 20),
    time: "15:30",
    status: "cancelled",
    price: "150.000đ",
  },
];

export default function AppointmentsPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [filter, setFilter] = useState("all");

  const filteredAppointments = appointments.filter((app) => {
    if (filter === "all") return true;
    return app.status === filter;
  });

  return (
    <div className="container py-12 px-4 md:px-6">
      <div className="mx-auto max-w-4xl space-y-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tighter">
              Lịch hẹn của tôi
            </h1>
            <p className="text-gray-500">
              Quản lý và theo dõi các lịch hẹn cắt tóc của bạn
            </p>
          </div>
          <Button asChild>
            <Link href="/booking">
              <Scissors className="mr-2 h-4 w-4" />
              Đặt lịch mới
            </Link>
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-[250px_1fr]">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Lịch</CardTitle>
              </CardHeader>
              <CardContent>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? (
                        format(date, "PPP", { locale: vi })
                      ) : (
                        <span>Chọn ngày</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Bộ lọc</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Button
                    variant={filter === "all" ? "default" : "outline"}
                    className="w-full justify-start"
                    onClick={() => setFilter("all")}
                  >
                    Tất cả
                  </Button>
                  <Button
                    variant={filter === "upcoming" ? "default" : "outline"}
                    className="w-full justify-start"
                    onClick={() => setFilter("upcoming")}
                  >
                    Sắp tới
                  </Button>
                  <Button
                    variant={filter === "completed" ? "default" : "outline"}
                    className="w-full justify-start"
                    onClick={() => setFilter("completed")}
                  >
                    Đã hoàn thành
                  </Button>
                  <Button
                    variant={filter === "cancelled" ? "default" : "outline"}
                    className="w-full justify-start"
                    onClick={() => setFilter("cancelled")}
                  >
                    Đã hủy
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          <div>
            <Tabs defaultValue="list" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="list">Danh sách</TabsTrigger>
                <TabsTrigger value="calendar">Lịch</TabsTrigger>
              </TabsList>
              <TabsContent value="list" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Lịch hẹn của tôi</CardTitle>
                    <CardDescription>
                      {filteredAppointments.length} lịch hẹn{" "}
                      {filter !== "all" ? `(${filter})` : ""}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {filteredAppointments.length > 0 ? (
                        filteredAppointments.map((appointment) => (
                          <div
                            key={appointment.id}
                            className="flex flex-col md:flex-row md:items-center justify-between gap-4 rounded-lg border p-4"
                          >
                            <div className="space-y-2">
                              <div className="flex items-center gap-2">
                                <Scissors className="h-4 w-4 text-gray-500" />
                                <p className="font-medium">
                                  {appointment.service}
                                </p>
                                <span
                                  className={cn(
                                    "ml-2 rounded-full px-2 py-0.5 text-xs",
                                    appointment.status === "completed" &&
                                      "bg-green-100 text-green-700",
                                    appointment.status === "upcoming" &&
                                      "bg-blue-100 text-blue-700",
                                    appointment.status === "cancelled" &&
                                      "bg-red-100 text-red-700"
                                  )}
                                >
                                  {appointment.status === "completed" &&
                                    "Hoàn thành"}
                                  {appointment.status === "upcoming" &&
                                    "Sắp tới"}
                                  {appointment.status === "cancelled" &&
                                    "Đã hủy"}
                                </span>
                              </div>
                              <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-gray-500">
                                <div className="flex items-center gap-1">
                                  <User className="h-4 w-4" />
                                  <span>{appointment.stylist}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <CalendarIcon className="h-4 w-4" />
                                  <span>
                                    {format(appointment.date, "dd/MM/yyyy")}
                                  </span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Clock className="h-4 w-4" />
                                  <span>{appointment.time}</span>
                                </div>
                              </div>
                            </div>
                            <div className="flex gap-2 self-end md:self-center">
                              {appointment.status === "upcoming" && (
                                <>
                                  <Button variant="outline" size="sm" asChild>
                                    <Link
                                      href={`/booking/edit/${appointment.id}`}
                                    >
                                      Chỉnh sửa
                                    </Link>
                                  </Button>
                                  <Dialog>
                                    <DialogTrigger asChild>
                                      <Button variant="destructive" size="sm">
                                        Hủy
                                      </Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                      <DialogHeader>
                                        <DialogTitle>
                                          Xác nhận hủy lịch
                                        </DialogTitle>
                                        <DialogDescription>
                                          Bạn có chắc chắn muốn hủy lịch đặt này
                                          không? Hành động này không thể hoàn
                                          tác.
                                        </DialogDescription>
                                      </DialogHeader>
                                      <DialogFooter>
                                        <Button variant="outline">
                                          Không, giữ lịch
                                        </Button>
                                        <Button variant="destructive">
                                          Có, hủy lịch
                                        </Button>
                                      </DialogFooter>
                                    </DialogContent>
                                  </Dialog>
                                </>
                              )}
                              {appointment.status === "completed" && (
                                <Button variant="outline" size="sm">
                                  Đặt lại
                                </Button>
                              )}
                              <Button variant="ghost" size="sm" asChild>
                                <Link href={`/appointments/${appointment.id}`}>
                                  Chi tiết
                                </Link>
                              </Button>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-8">
                          <p className="text-gray-500">Không có lịch hẹn nào</p>
                          <Button className="mt-4" asChild>
                            <Link href="/booking">Đặt lịch ngay</Link>
                          </Button>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="calendar" className="mt-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>
                        Lịch tháng {format(date || new Date(), "MM/yyyy")}
                      </CardTitle>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="icon">
                          <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon">
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-7 gap-2 text-center text-sm font-medium">
                      {["CN", "T2", "T3", "T4", "T5", "T6", "T7"].map(
                        (day, i) => (
                          <div key={i} className="py-2">
                            {day}
                          </div>
                        )
                      )}
                    </div>
                    <div className="grid grid-cols-7 gap-2">
                      {Array.from({ length: 35 }).map((_, i) => {
                        const day = i + 1;
                        const hasAppointment = appointments.some(
                          (app) =>
                            app.date.getDate() === day &&
                            app.date.getMonth() ===
                              (date || new Date()).getMonth()
                        );
                        const appointment = appointments.find(
                          (app) =>
                            app.date.getDate() === day &&
                            app.date.getMonth() ===
                              (date || new Date()).getMonth()
                        );
                        return (
                          <div
                            key={i}
                            className={cn(
                              "aspect-square flex flex-col items-center justify-center rounded-md border p-2",
                              hasAppointment &&
                                appointment?.status === "upcoming" &&
                                "border-blue-500 bg-blue-50",
                              hasAppointment &&
                                appointment?.status === "completed" &&
                                "border-green-500 bg-green-50",
                              hasAppointment &&
                                appointment?.status === "cancelled" &&
                                "border-red-500 bg-red-50"
                            )}
                          >
                            <span className="text-sm">{day}</span>
                            {hasAppointment && (
                              <div
                                className={cn(
                                  "mt-1 h-1 w-1 rounded-full",
                                  appointment?.status === "upcoming" &&
                                    "bg-blue-500",
                                  appointment?.status === "completed" &&
                                    "bg-green-500",
                                  appointment?.status === "cancelled" &&
                                    "bg-red-500"
                                )}
                              />
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
