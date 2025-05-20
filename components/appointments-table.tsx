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
    username: "Nguyễn Văn A",
    phone: "0901234567",
    date: "07/05/2023",
    time: "10:00",
    service: "Cắt tóc nam",
    staff: "Minh",
    status: "accepted",
    notes: "Cắt phòng VIP",
  },
  {
    id: 2,
    username: "Trần Thị B",
    phone: "0901234568",
    date: "07/05/2023",
    time: "11:30",
    service: "Nhuộm tóc",
    staff: "Hương",
    status: "accepted",
    notes: "Cắt phòng LUX",
  },
  {
    id: 3,
    username: "Lê Văn C",
    phone: "0901234569",
    date: "07/05/2023",
    time: "13:00",
    service: "Uốn tóc",
    staff: "Tâm",
    status: "accepted",
    notes: "Uốn phòng LUX",
  },
  {
    id: 4,
    username: "Phạm Thị D",
    phone: "0901234570",
    date: "07/05/2023",
    time: "15:30",
    service: "Gội đầu",
    staff: "Hà",
    status: "accepted",
    notes: "Gội phòng LUX",
  },
  {
    id: 5,
    username: "Hoàng Văn E",
    phone: "0901234571",
    date: "08/05/2023",
    time: "09:00",
    service: "Cắt tóc nam",
    staff: "Minh",
    status: "cancelled",
    notes: "Cắt phòng VIP",
  },
  {
    id: 6,
    username: "Đỗ Thị F",
    phone: "0901234572",
    date: "08/05/2023",
    time: "10:30",
    service: "Nhuộm tóc",
    staff: "Hương",
    status: "accepted",
    notes: "Nhuộm phòng LUX",
  },
  {
    id: 7,
    username: "Vũ Văn G",
    phone: "0901234573",
    date: "08/05/2023",
    time: "14:00",
    service: "Cắt tóc nữ",
    staff: "Tâm",
    status: "accepted",
    notes: "Cắt phòng VIP",
  },
  {
    id: 8,
    username: "Ngô Thị H",
    phone: "0901234574",
    date: "08/05/2023",
    time: "16:00",
    service: "Gội đầu",
    staff: "Hà",
    status: "accepted",
    notes: "",
  },
];

export function AppointmentsTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [staffFilter, setStaffFilter] = useState("all");

  const filteredAppointments = appointments.filter((appointment) => {
    const matchesSearch =
      appointment.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.phone.includes(searchTerm);

    const matchesStatus =
      statusFilter === "all" || appointment.status === statusFilter;

    const matchesStaff =
      staffFilter === "all" || appointment.staff === staffFilter;

    return matchesSearch && matchesStatus && matchesStaff;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "accepted":
        return <Badge>Đã xác nhận</Badge>;
      case "cancelled":
        return <Badge variant="destructive">Đã hủy</Badge>;
      // case "completed":
      //   return <Badge variant="secondary">Hoàn thành</Badge>;
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
              {/* <SelectItem value="pending">Chờ xác nhận</SelectItem> */}
              <SelectItem value="cancelled">Đã hủy</SelectItem>
              {/* <SelectItem value="completed">Hoàn thành</SelectItem> */}
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
              <TableHead>Notes</TableHead>
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
                    <div className="font-medium">{appointment.username}</div>
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
                  <TableCell>{appointment.notes}</TableCell>
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
