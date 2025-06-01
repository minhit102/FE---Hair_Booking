"use client";

import { useState, useEffect } from "react";
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
import {
  Check,
  MoreHorizontal,
  Search,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { toast } from "sonner";
import {
  getAppointments,
  updateAppointmentStatus,
} from "@/lib/api/appointment";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

// Define types for our data
interface Appointment {
  id: string;
  username: string;
  phone: string;
  date: string;
  time: string;
  service: string;
  staff: string;
  status: string;
  notes: string;
}

interface PaginatedResponse {
  appointments: Appointment[];
  total: number;
  page: number;
  totalPages: number;
  limit: number;
}

export function AppointmentsTable() {
  // State for search and filters
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const itemsPerPage = 10;

  // Data state
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Function to get random pastel color
  const getRandomPastelColor = (username: string) => {
    const colors = [
      "bg-blue-100 text-blue-700",
      "bg-green-100 text-green-700",
      "bg-purple-100 text-purple-700",
      "bg-pink-100 text-pink-700",
      "bg-orange-100 text-orange-700",
      "bg-teal-100 text-teal-700",
      "bg-indigo-100 text-indigo-700",
      "bg-rose-100 text-rose-700",
    ];

    // Use the first character's ASCII code to consistently get the same color for the same username
    const charCode = username.charCodeAt(0);
    return colors[charCode % colors.length];
  };

  // Function to fetch appointments from API
  const fetchAppointments = async () => {
    try {
      setIsLoading(true);

      const response = await getAppointments({
        page: currentPage,
        limit: itemsPerPage,
        search: searchTerm,
        status: statusFilter,
      });
      const data: PaginatedResponse = response?.data;
      setAppointments(data?.appointments || []);
      setTotalPages(data?.totalPages || 1);
      setTotalItems(data?.total || 0);
    } catch (error) {
      console.error("Error fetching appointments:", error);
      toast.error("Không thể tải danh sách lịch hẹn");
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch appointments when filters or page changes
  useEffect(() => {
    fetchAppointments();
  }, [currentPage, searchTerm, statusFilter]);

  // Function to handle status update
  const handleStatusUpdate = async (
    appointmentId: string,
    newStatus: string
  ) => {
    try {
      const response = await updateAppointmentStatus(appointmentId, newStatus);

      toast.success("Hủy lịch hẹn thành công");
      fetchAppointments(); // Refresh the list
    } catch (error) {
      console.error("Error updating appointment:", error);
      toast.error("Không thể cập nhật trạng thái");
    }
  };

  // Function to get status badge with appropriate styling
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
              <SelectItem value="accepted">Đã xác nhận</SelectItem>
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
              <TableHead>Trạng thái</TableHead>
              <TableHead>Notes</TableHead>
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
            ) : appointments.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  Không tìm thấy lịch hẹn nào
                </TableCell>
              </TableRow>
            ) : (
              appointments.map((appointment) => (
                <TableRow key={appointment.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback
                          className={getRandomPastelColor(appointment.username)}
                        >
                          {appointment.username.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">
                          {appointment.username}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {appointment.phone}
                        </div>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell>
                    <div>{appointment.date}</div>
                    <div className="text-sm text-muted-foreground">
                      {appointment.time}
                    </div>
                  </TableCell>
                  <TableCell>{appointment.service}</TableCell>
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
                        {/* <DropdownMenuItem
                          onClick={() =>
                            handleStatusUpdate(appointment.id, "accepted")
                          }
                          disabled={appointment.status === "accepted"}
                        >
                          <Check className="mr-2 h-4 w-4" />
                          Xác nhận
                        </DropdownMenuItem> */}
                        <DropdownMenuItem
                          onClick={() =>
                            handleStatusUpdate(appointment.id, "cancelled")
                          }
                          disabled={appointment.status === "cancelled"}
                        >
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

      {!isLoading && appointments.length > 0 && (
        <div className="flex items-center justify-between px-2">
          <div className="text-sm text-muted-foreground">
            Hiển thị {(currentPage - 1) * itemsPerPage + 1} đến{" "}
            {Math.min(currentPage * itemsPerPage, totalItems)} của {totalItems}{" "}
            lịch hẹn
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
