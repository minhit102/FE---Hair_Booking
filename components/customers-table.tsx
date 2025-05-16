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
import { MoreHorizontal, Search, Star } from "lucide-react";

const customers = [
  {
    id: 1,
    name: "Nguyễn Văn A",
    phone: "0901234567",
    email: "nguyenvana@example.com",
    visits: 12,
    lastVisit: "05/05/2023",
    favoriteService: "Cắt tóc nam",
    isRegular: true,
  },
  {
    id: 2,
    name: "Trần Thị B",
    phone: "0901234568",
    email: "tranthib@example.com",
    visits: 8,
    lastVisit: "28/04/2023",
    favoriteService: "Nhuộm tóc",
    isRegular: true,
  },
  {
    id: 3,
    name: "Lê Văn C",
    phone: "0901234569",
    email: "levanc@example.com",
    visits: 5,
    lastVisit: "15/04/2023",
    favoriteService: "Uốn tóc",
    isRegular: false,
  },
  {
    id: 4,
    name: "Phạm Thị D",
    phone: "0901234570",
    email: "phamthid@example.com",
    visits: 3,
    lastVisit: "10/04/2023",
    favoriteService: "Gội đầu",
    isRegular: false,
  },
  {
    id: 5,
    name: "Hoàng Văn E",
    phone: "0901234571",
    email: "hoangvane@example.com",
    visits: 15,
    lastVisit: "02/05/2023",
    favoriteService: "Cắt tóc nam",
    isRegular: true,
  },
  {
    id: 6,
    name: "Đỗ Thị F",
    phone: "0901234572",
    email: "dothif@example.com",
    visits: 7,
    lastVisit: "25/04/2023",
    favoriteService: "Nhuộm tóc",
    isRegular: true,
  },
  {
    id: 7,
    name: "Vũ Văn G",
    phone: "0901234573",
    email: "vuvang@example.com",
    visits: 2,
    lastVisit: "18/04/2023",
    favoriteService: "Cắt tóc nữ",
    isRegular: false,
  },
  {
    id: 8,
    name: "Ngô Thị H",
    phone: "0901234574",
    email: "ngothih@example.com",
    visits: 1,
    lastVisit: "05/04/2023",
    favoriteService: "Gội đầu",
    isRegular: false,
  },
];

export function CustomersTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch =
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.includes(searchTerm) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "regular" && customer.isRegular) ||
      (statusFilter === "new" && !customer.isRegular);

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-col space-y-2 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Tìm khách hàng, số điện thoại hoặc email..."
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
              <SelectItem value="all">Tất cả khách hàng</SelectItem>
              <SelectItem value="regular">Khách quen</SelectItem>
              <SelectItem value="new">Khách mới</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Khách hàng</TableHead>
              <TableHead>Số lần sử dụng</TableHead>
              <TableHead>Lần cuối</TableHead>
              <TableHead>Dịch vụ yêu thích</TableHead>
              <TableHead>Trạng thái</TableHead>
              <TableHead className="text-right">Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCustomers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  Không tìm thấy khách hàng nào
                </TableCell>
              </TableRow>
            ) : (
              filteredCustomers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback>
                          {customer.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{customer.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {customer.phone}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {customer.email}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{customer.visits} lần</TableCell>
                  <TableCell>{customer.lastVisit}</TableCell>
                  <TableCell>{customer.favoriteService}</TableCell>
                  <TableCell>
                    {customer.isRegular ? (
                      <Badge>
                        <Star className="mr-1 h-3 w-3 fill-primary text-primary" />
                        Khách quen
                      </Badge>
                    ) : (
                      <Badge variant="outline">Khách mới</Badge>
                    )}
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
                        <DropdownMenuItem>Xem chi tiết</DropdownMenuItem>
                        <DropdownMenuItem>Lịch sử dịch vụ</DropdownMenuItem>
                        <DropdownMenuItem>Đặt lịch mới</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Gửi khuyến mãi</DropdownMenuItem>
                        <DropdownMenuItem>Chỉnh sửa thông tin</DropdownMenuItem>
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
