"use client";

import { useState } from "react";
import { Search, Edit, UserPlus, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CustomerDetailsDialog } from "@/components/customer-details-dialog";

// Mock customer data
const mockCustomers = [
  {
    id: 1,
    name: "Nguyễn Thị Anh",
    phone: "0901234567",
    email: "nguyenthianh@example.com",
    gender: "female",
    visits: 12,
    lastVisit: "05/05/2023",
    isRegular: true,
  },
  {
    id: 2,
    name: "Trần Văn Bình",
    phone: "0901234568",
    email: "tranvanbinh@example.com",
    gender: "male",
    visits: 8,
    lastVisit: "28/04/2023",
    isRegular: true,
  },
  {
    id: 3,
    name: "Lê Thị Cẩm",
    phone: "0901234569",
    email: "lethicam@example.com",
    gender: "female",
    visits: 5,
    lastVisit: "15/04/2023",
    isRegular: false,
  },
  {
    id: 4,
    name: "Phạm Văn Dũng",
    phone: "0901234570",
    email: "phamvandung@example.com",
    gender: "male",
    visits: 3,
    lastVisit: "10/04/2023",
    isRegular: false,
  },
  {
    id: 5,
    name: "Hoàng Thị Em",
    phone: "0901234571",
    email: "hoangthiem@example.com",
    gender: "female",
    visits: 15,
    lastVisit: "02/05/2023",
    isRegular: true,
  },
];

export function CustomerSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const filteredCustomers = mockCustomers.filter((customer) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      customer.name.toLowerCase().includes(searchLower) ||
      customer.phone.includes(searchTerm) ||
      (customer.email && customer.email.toLowerCase().includes(searchLower))
    );
  });

  const handleSearch = (e: any) => {
    setSearchTerm(e.target.value);
  };

  const handleViewDetails = (customer: any) => {
    setSelectedCustomer(customer);
    setIsDialogOpen(true);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Tìm theo tên, số điện thoại hoặc email..."
            className="pl-8"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <Button variant="outline">
          <Search className="mr-2 h-4 w-4" />
          Tìm kiếm
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Khách hàng</TableHead>
              <TableHead>Số điện thoại</TableHead>
              <TableHead>Lần cuối đến</TableHead>
              <TableHead>Số lần đến</TableHead>
              <TableHead className="text-right">Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCustomers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
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
                        <div className="text-xs text-muted-foreground">
                          {customer.email}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{customer.phone}</TableCell>
                  <TableCell>{customer.lastVisit}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {customer.visits} lần
                      {customer.isRegular && (
                        <Badge variant="outline" className="ml-2">
                          Khách quen
                        </Badge>
                      )}
                    </div>
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
                        <DropdownMenuItem
                          onClick={() => handleViewDetails(customer)}
                        >
                          <UserPlus className="mr-2 h-4 w-4" />
                          Xem chi tiết
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Chỉnh sửa
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Đặt lịch mới</DropdownMenuItem>
                        <DropdownMenuItem>Lịch sử dịch vụ</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {selectedCustomer && (
        <CustomerDetailsDialog
          customer={selectedCustomer}
          open={isDialogOpen}
          onOpenChange={setIsDialogOpen}
        />
      )}
    </div>
  );
}
