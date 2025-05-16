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
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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
import { CalendarClock, MoreHorizontal, Search, Star } from "lucide-react";

const employees = [
  {
    id: 1,
    name: "Nguyễn Văn Minh",
    position: "Thợ cắt tóc",
    phone: "0901234567",
    schedule: "08:00 - 17:00",
    rating: 4.8,
    services: 245,
    status: "active",
  },
  {
    id: 2,
    name: "Trần Thị Hương",
    position: "Thợ nhuộm",
    phone: "0901234568",
    schedule: "08:00 - 17:00",
    rating: 4.7,
    services: 198,
    status: "active",
  },
  {
    id: 3,
    name: "Lê Văn Tâm",
    position: "Thợ cắt tóc",
    phone: "0901234569",
    schedule: "13:00 - 22:00",
    rating: 4.9,
    services: 312,
    status: "active",
  },
  {
    id: 4,
    name: "Phạm Thị Hà",
    position: "Thợ gội đầu",
    phone: "0901234570",
    schedule: "13:00 - 22:00",
    rating: 4.6,
    services: 178,
    status: "active",
  },
  {
    id: 5,
    name: "Hoàng Văn Nam",
    position: "Thợ cắt tóc",
    phone: "0901234571",
    schedule: "08:00 - 17:00",
    rating: 4.5,
    services: 156,
    status: "inactive",
  },
  {
    id: 6,
    name: "Đỗ Thị Lan",
    position: "Thợ uốn tóc",
    phone: "0901234572",
    schedule: "13:00 - 22:00",
    rating: 4.7,
    services: 203,
    status: "active",
  },
];

export function EmployeesTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const [positionFilter, setPositionFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredEmployees = employees.filter((employee) => {
    const matchesSearch =
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.phone.includes(searchTerm);

    const matchesPosition =
      positionFilter === "all" || employee.position === positionFilter;

    const matchesStatus =
      statusFilter === "all" || employee.status === statusFilter;

    return matchesSearch && matchesPosition && matchesStatus;
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-col space-y-2 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Tìm nhân viên hoặc số điện thoại..."
              className="pl-8 md:w-[300px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-col space-y-2 md:flex-row md:space-x-2 md:space-y-0">
          <Select value={positionFilter} onValueChange={setPositionFilter}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Vị trí" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả vị trí</SelectItem>
              <SelectItem value="Thợ cắt tóc">Thợ cắt tóc</SelectItem>
              <SelectItem value="Thợ nhuộm">Thợ nhuộm</SelectItem>
              <SelectItem value="Thợ uốn tóc">Thợ uốn tóc</SelectItem>
              <SelectItem value="Thợ gội đầu">Thợ gội đầu</SelectItem>
            </SelectContent>
          </Select>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Trạng thái" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả trạng thái</SelectItem>
              <SelectItem value="active">Đang làm việc</SelectItem>
              <SelectItem value="inactive">Nghỉ việc</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nhân viên</TableHead>
              <TableHead>Vị trí</TableHead>
              <TableHead>Lịch làm việc</TableHead>
              <TableHead>Đánh giá</TableHead>
              <TableHead>Dịch vụ</TableHead>
              <TableHead>Trạng thái</TableHead>
              <TableHead className="text-right">Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredEmployees.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  Không tìm thấy nhân viên nào
                </TableCell>
              </TableRow>
            ) : (
              filteredEmployees.map((employee) => (
                <TableRow key={employee.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback>
                          {employee.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{employee.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {employee.phone}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{employee.position}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <CalendarClock className="h-4 w-4 text-muted-foreground" />
                      <span>{employee.schedule}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-primary text-primary" />
                      <span>{employee.rating}</span>
                    </div>
                  </TableCell>
                  <TableCell>{employee.services}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        employee.status === "active" ? "default" : "secondary"
                      }
                    >
                      {employee.status === "active"
                        ? "Đang làm việc"
                        : "Nghỉ việc"}
                    </Badge>
                  </TableCell>
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
                        <DropdownMenuItem>Chỉnh sửa thông tin</DropdownMenuItem>
                        <DropdownMenuItem>Gán ca làm việc</DropdownMenuItem>
                        <DropdownMenuItem>Gửi thông báo</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Xem lịch sử dịch vụ</DropdownMenuItem>
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
