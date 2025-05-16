"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Check, MoreHorizontal, Search, X } from "lucide-react";

const appointments = [
  {
    id: 1,
    customer: "Nguyễn Văn A",
    phone: "0901234567",
    date: "07/05/2023",
    time: "10:00",
    service: "Cắt tóc nam",
    staff: "Minh",
    status: "confirmed",
  },
  {
    id: 2,
    customer: "Trần Thị B",
    phone: "0901234568",
    date: "07/05/2023",
    time: "11:30",
    service: "Nhuộm tóc",
    staff: "Hương",
    status: "pending",
  },
  {
    id: 3,
    customer: "Lê Văn C",
    phone: "0901234569",
    date: "07/05/2023",
    time: "13:00",
    service: "Uốn tóc",
    staff: "Tâm",
    status: "confirmed",
  },
  {
    id: 4,
    customer: "Phạm Thị D",
    phone: "0901234570",
    date: "07/05/2023",
    time: "15:30",
    service: "Gội đầu",
    staff: "Hà",
    status: "confirmed",
  },
  {
    id: 5,
    customer: "Hoàng Văn E",
    phone: "0901234571",
    date: "08/05/2023",
    time: "09:00",
    service: "Cắt tóc nam",
    staff: "Minh",
    status: "cancelled",
  },
  {
    id: 6,
    customer: "Đỗ Thị F",
    phone: "0901234572",
    date: "08/05/2023",
    time: "10:30",
    service: "Nhuộm tóc",
    staff: "Hương",
    status: "completed",
  },
  {
    id: 7,
    customer: "Vũ Văn G",
    phone: "0901234573",
    date: "08/05/2023",
    time: "14:00",
    service: "Cắt tóc nữ",
    staff: "Tâm",
    status: "confirmed",
  },
  {
    id: 8,
    customer: "Ngô Thị H",
    phone: "0901234574",
    date: "08/05/2023",
    time: "16:00",
    service: "Gội đầu",
    staff: "Hà",
    status: "pending",
  },
];

export function AppointmentsTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [staffFilter, setStaffFilter] = useState("all");

  const filteredAppointments = appointments.filter((appointment) => {
    const matchesSearch =
      appointment.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.phone.includes(searchTerm);

    const matchesStatus =
      statusFilter === "all" || appointment.status === statusFilter;

    const matchesStaff =
      staffFilter === "all" || appointment.staff === staffFilter;

    return matchesSearch && matchesStatus && matchesStaff;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case "confirmed":
        return <Badge>Đã xác nhận</Badge>;
      case "pending":
        return <Badge variant="outline">Chờ xác nhận</Badge>;
      case "cancelled":
        return <Badge variant="destructive">Đã hủy</Badge>;
      case "completed":
        return <Badge variant="secondary">Hoàn thành</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col space-y-2 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Tìm khách hàng hoặc số điện thoại..."
              className="pl-8 md:w-[300px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-col space-y-2 md:flex-row md:space-x-2 md:space-y-0">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Trạng thái" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả trạng thái</SelectItem>
              <SelectItem value="confirmed">Đã xác nhận</SelectItem>
              <SelectItem value="pending">Chờ xác nhận</SelectItem>
              <SelectItem value="cancelled">Đã hủy</SelectItem>
              <SelectItem value="completed">Hoàn thành</SelectItem>
            </SelectContent>
          </Select>

          <Select value={staffFilter} onValueChange={setStaffFilter}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Nhân viên" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả nhân viên</SelectItem>
              <SelectItem value="Minh">Minh</SelectItem>
              <SelectItem value="Hương">Hương</SelectItem>
              <SelectItem value="Tâm">Tâm</SelectItem>
              <SelectItem value="Hà">Hà</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Khách hàng</TableHead>
              <TableHead>Ngày & Giờ</TableHead>
              <TableHead>Dịch vụ</TableHead>
              <TableHead>Nhân viên</TableHead>
              <TableHead>Trạng thái</TableHead>
              <TableHead className="text-right">Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAppointments.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  Không tìm thấy lịch hẹn nào
                </TableCell>
              </TableRow>
            ) : (
              filteredAppointments.map((appointment) => (
                <TableRow key={appointment.id}>
                  <TableCell>
                    <div className="font-medium">{appointment.customer}</div>
                    <div className="text-sm text-muted-foreground">
                      {appointment.phone}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>{appointment.date}</div>
                    <div className="text-sm text-muted-foreground">
                      {appointment.time}
                    </div>
                  </TableCell>
                  <TableCell>{appointment.service}</TableCell>
                  <TableCell>{appointment.staff}</TableCell>
                  <TableCell>{getStatusBadge(appointment.status)}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Mở menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Thao tác</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <Check className="mr-2 h-4 w-4" />
                          Xác nhận
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <X className="mr-2 h-4 w-4" />
                          Hủy lịch
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Chỉnh sửa</DropdownMenuItem>
                        <DropdownMenuItem>Xem chi tiết</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
