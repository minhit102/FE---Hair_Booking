"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import {
  CalendarClock,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  Search,
  Star,
} from "lucide-react";
import { toast } from "sonner";
import { getHairStylists } from "@/lib/api/hair-stylist";

interface HairStylists {
  id: string;
  username: string;
  email: string;
  phone: string;
  baseSalary: string;
  status: "active" | "inactive";
  imgAvatar: string;
  invoiceCount: number;
}

interface PaginatedResponse {
  hairStylists: HairStylists[];
  total: number;
  page: number;
  totalPages: number;
  limit: number;
}

export function EmployeesTable() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [employees, setEmployees] = useState<HairStylists[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const itemsPerPage = 10;

  const fetchEmployees = async () => {
    try {
      setIsLoading(true);
      const response = await getHairStylists({
        page: currentPage,
        limit: itemsPerPage,
        search: searchTerm,
        status: statusFilter,
      });
      const data: PaginatedResponse = response;
      setEmployees(data?.hairStylists || []);
      setTotalPages(data?.totalPages || 1);
      setTotalItems(data?.total || 0);
    } catch (error) {
      console.error("Error fetching employees:", error);
      toast.error("Không thể tải danh sách nhân viên");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, [currentPage, searchTerm, statusFilter]);

  const handleEmployeeClick = (employeeId: string) => {
    router.push(`/employees/${employeeId}`);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col space-y-2 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Tìm nhân viên..."
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
              <TableHead>Email</TableHead>
              <TableHead>Số điện thoại</TableHead>
              <TableHead>Số lượng hóa đơn</TableHead>
              <TableHead>Lương cơ bản</TableHead>
              <TableHead>Trạng thái</TableHead>
              <TableHead className="text-right">Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  Đang tải...
                </TableCell>
              </TableRow>
            ) : employees.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  Không tìm thấy nhân viên nào
                </TableCell>
              </TableRow>
            ) : (
              employees.map((employee) => (
                <TableRow key={employee.id}>
                  <TableCell>
                    <div
                      className="flex items-center gap-3 cursor-pointer hover:opacity-80"
                      onClick={() => handleEmployeeClick(employee.id)}
                    >
                      <Avatar>
                        {employee.imgAvatar ? (
                          <AvatarImage
                            src={employee.imgAvatar}
                            alt={employee.username}
                          />
                        ) : (
                          <AvatarFallback>
                            {employee.username.charAt(0)}
                          </AvatarFallback>
                        )}
                      </Avatar>
                      <div>
                        <div className="font-medium">{employee.username}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{employee.email}</TableCell>
                  <TableCell>{employee.phone}</TableCell>
                  <TableCell>{employee.invoiceCount}</TableCell>
                  <TableCell>{employee.baseSalary}</TableCell>
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
                        <DropdownMenuItem
                          onClick={() => handleEmployeeClick(employee.id)}
                        >
                          Xem chi tiết
                        </DropdownMenuItem>
                        <DropdownMenuItem>Chỉnh sửa</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600">
                          Xóa
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {!isLoading && employees.length > 0 && (
        <div className="flex items-center justify-between px-2">
          <div className="text-sm text-muted-foreground">
            Hiển thị {(currentPage - 1) * itemsPerPage + 1} đến{" "}
            {Math.min(currentPage * itemsPerPage, totalItems)} của {totalItems}{" "}
            nhân viên
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1 || isLoading}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="text-sm">
              Trang {currentPage} / {totalPages}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages || isLoading}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
