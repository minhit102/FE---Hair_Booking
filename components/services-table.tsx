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
import { Clock, MoreHorizontal, Search } from "lucide-react";

const services = [
  {
    id: 1,
    name: "Cắt tóc nam",
    category: "Cắt tóc",
    price: 100000,
    duration: 30,
    popular: true,
  },
  {
    id: 2,
    name: "Cắt tóc nữ",
    category: "Cắt tóc",
    price: 150000,
    duration: 45,
    popular: true,
  },
  {
    id: 3,
    name: "Nhuộm tóc",
    category: "Nhuộm",
    price: 500000,
    duration: 120,
    popular: true,
  },
  {
    id: 4,
    name: "Uốn tóc",
    category: "Uốn",
    price: 600000,
    duration: 150,
    popular: false,
  },
  {
    id: 5,
    name: "Gội đầu",
    category: "Gội",
    price: 80000,
    duration: 20,
    popular: false,
  },
  {
    id: 6,
    name: "Duỗi tóc",
    category: "Duỗi",
    price: 700000,
    duration: 180,
    popular: false,
  },
  {
    id: 7,
    name: "Tạo kiểu tóc",
    category: "Tạo kiểu",
    price: 200000,
    duration: 45,
    popular: true,
  },
  {
    id: 8,
    name: "Massage đầu",
    category: "Massage",
    price: 120000,
    duration: 30,
    popular: false,
  },
];

export function ServicesTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const filteredServices = services.filter((service) => {
    const matchesSearch = service.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesCategory =
      categoryFilter === "all" || service.category === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  const formatPrice = (price: any) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col space-y-2 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Tìm dịch vụ..."
              className="pl-8 md:w-[300px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-col space-y-2 md:flex-row md:space-x-2 md:space-y-0">
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Danh mục" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả danh mục</SelectItem>
              <SelectItem value="Cắt tóc">Cắt tóc</SelectItem>
              <SelectItem value="Nhuộm">Nhuộm</SelectItem>
              <SelectItem value="Uốn">Uốn</SelectItem>
              <SelectItem value="Duỗi">Duỗi</SelectItem>
              <SelectItem value="Gội">Gội</SelectItem>
              <SelectItem value="Tạo kiểu">Tạo kiểu</SelectItem>
              <SelectItem value="Massage">Massage</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tên dịch vụ</TableHead>
              <TableHead>Danh mục</TableHead>
              <TableHead>Giá</TableHead>
              <TableHead>Thời gian</TableHead>
              <TableHead>Trạng thái</TableHead>
              <TableHead className="text-right">Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredServices.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  Không tìm thấy dịch vụ nào
                </TableCell>
              </TableRow>
            ) : (
              filteredServices.map((service) => (
                <TableRow key={service.id}>
                  <TableCell>
                    <div className="font-medium">{service.name}</div>
                  </TableCell>
                  <TableCell>{service.category}</TableCell>
                  <TableCell>{formatPrice(service.price)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>{service.duration} phút</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    {service.popular ? (
                      <Badge>Phổ biến</Badge>
                    ) : (
                      <Badge variant="outline">Thông thường</Badge>
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
                        <DropdownMenuItem>Chỉnh sửa</DropdownMenuItem>
                        <DropdownMenuItem>Đánh dấu phổ biến</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Xóa dịch vụ</DropdownMenuItem>
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
