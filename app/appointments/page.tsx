"use client";

import { useEffect, useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
} from "@tanstack/react-table";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { getAppointments } from "@/services/appointment/appointment";
import api from "@/lib/axios";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

type Appointment = {
  id: number;
  _id: string;
  service: string;
  date: Date;
  username: string;
  phone: string;
  notes: string;
  branch: string;
  status: "accepted" | "cancelled";
};

type ServiceHistory = {
  id: string;
  date: string;
  service: string;
  stylist: string;
  total: string;
};

export default function AppointmentsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialTab = searchParams.get("tab") || "appointments";
  const [activeTab, setActiveTab] = useState(initialTab);
  const [appointmentsData, setAppointmentsData] = useState<Appointment[]>([]);
  const [serviceHistoryData, setServiceHistoryData] = useState<
    ServiceHistory[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [selectedAppointmentId, setSelectedAppointmentId] = useState<
    string | null
  >(null);

  const handleCancelAppointment = async (appointmentId: string) => {
    try {
      await api.patch(`/appointments/${appointmentId}`, {
        status: "cancelled",
      });
      toast.success("Hủy lịch thành công");
      // Refresh appointments data
      const appointmentsResponse = await getAppointments();
      const updatedAppointments = appointmentsResponse.map(
        (appointment: any, index: number) => ({
          id: index + 1,
          _id: appointment._id,
          service: appointment.service,
          date: new Date(appointment.date).toLocaleString("vi-VN"),
          username: appointment.username,
          branch: appointment.branch,
          phone: appointment.phone,
          notes: appointment.notes,
          status: appointment.status,
        })
      );
      setAppointmentsData(updatedAppointments);
      setShowCancelDialog(false);
      setSelectedAppointmentId(null);
    } catch (error) {
      toast.error("Không thể hủy lịch. Vui lòng thử lại sau.");
    }
  };

  // Hàm tạo dữ liệu giả cho historyResponse
  const getFakeHistoryData = (): ServiceHistory[] => [
    {
      id: "1",
      date: "2025-05-18",
      service: "Cắt tóc nữ",
      stylist: "Lê Thị C",
      total: "150.000đ",
    },
    {
      id: "2",
      date: "2025-05-17",
      service: "Nhuộm tóc",
      stylist: "Phạm Văn D",
      total: "200.000đ",
    },
    {
      id: "3",
      date: "2025-05-16",
      service: "Uốn tóc",
      stylist: "Nguyễn Thị E",
      total: "300.000đ",
    },
    {
      id: "4",
      date: "2025-05-15",
      service: "Gội đầu massage",
      stylist: "Trần Văn F",
      total: "100.000đ",
    },
  ];

  // Gọi API và sử dụng dữ liệu giả cho historyResponse
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Gọi API cho appointments (giữ nguyên nếu bạn muốn gọi API thật)
        const appointmentsResponse = await getAppointments();
        // const appointments = await appointmentsResponse.json();

        const appointmentsData = appointmentsResponse.map(
          (appointment: any, index: number) => ({
            id: index + 1,
            _id: appointment._id,
            service: appointment.service,
            date: new Date(appointment.date).toLocaleString("vi-VN"),
            username: appointment.username,
            branch: appointment.branch,
            phone: appointment.phone,
            notes: appointment.notes,
            status: appointment.status,
          })
        );

        setAppointmentsData(appointmentsData);

        // Sử dụng dữ liệu giả cho historyResponse thay vì gọi API
        const history = getFakeHistoryData();
        setServiceHistoryData(history);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Lỗi get data ");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Cập nhật tab khi search params thay đổi
  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  const handleTabChange = (newTab: string) => {
    setActiveTab(newTab);
    router.replace(`?tab=${newTab}`, { scroll: false });
  };

  const appointmentColumnHelper = createColumnHelper<Appointment>();
  const appointmentColumns = useMemo(
    () => [
      appointmentColumnHelper.accessor("id", { header: "STT" }),
      appointmentColumnHelper.accessor("service", { header: "Dịch vụ" }),
      appointmentColumnHelper.accessor("date", { header: "Thời gian đặt" }),
      appointmentColumnHelper.accessor("username", { header: "Họ tên" }),
      appointmentColumnHelper.accessor("phone", { header: "Số điện thoại" }),
      appointmentColumnHelper.accessor("notes", { header: "Ghi chú" }),
      appointmentColumnHelper.accessor("branch", { header: "Chi nhánh" }),
      appointmentColumnHelper.accessor("status", {
        header: "Trạng thái",
        cell: (info) => {
          const status = info.getValue();
          const isAccepted = status === "accepted";
          const appointmentDate = new Date(info.row.original.date);

          return (
            <div className="flex items-center gap-2">
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  isAccepted
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {isAccepted ? "Xác nhận" : "Đã hủy"}
              </span>
              {isAccepted && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={() => {
                        setSelectedAppointmentId(info.row.original._id);
                        setShowCancelDialog(true);
                      }}
                      className="text-red-600"
                    >
                      Hủy lịch
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
          );
        },
      }),
    ],
    []
  );

  const historyColumnHelper = createColumnHelper<ServiceHistory>();
  const serviceHistoryColumns = useMemo(
    () => [
      historyColumnHelper.accessor("id", { header: "STT" }),
      historyColumnHelper.accessor("date", { header: "Ngày cắt tóc" }),
      historyColumnHelper.accessor("service", { header: "Dịch vụ" }),
      historyColumnHelper.accessor("stylist", { header: "Tên thợ cắt tóc" }),
      historyColumnHelper.accessor("total", { header: "Tổng tiền" }),
    ],
    []
  );

  const appointmentsTable = useReactTable({
    data: appointmentsData,
    columns: appointmentColumns,
    getCoreRowModel: getCoreRowModel(),
  });

  const serviceHistoryTable = useReactTable({
    data: serviceHistoryData,
    columns: serviceHistoryColumns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading) {
    return <div className="container py-12">Đang tải...</div>;
  }

  if (error) {
    return <div className="container py-12">Lỗi: {error}</div>;
  }

  return (
    <div className="container py-12">
      <div className="flex mb-6 border-b">
        <a
          href="?tab=appointments"
          onClick={(e) => {
            e.preventDefault();
            handleTabChange("appointments");
          }}
          className={`px-6 py-3 font-medium text-lg cursor-pointer ${
            activeTab === "appointments"
              ? "border-b-2 border-blue-500 text-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Lịch hẹn
        </a>
        <a
          href="?tab=history"
          onClick={(e) => {
            e.preventDefault();
            handleTabChange("history");
          }}
          className={`px-6 py-3 font-medium text-lg cursor-pointer ${
            activeTab === "history"
              ? "border-b-2 border-blue-500 text-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Lịch sử dịch vụ
        </a>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {activeTab === "appointments" ? (
            <Card>
              <CardHeader>
                <CardTitle>Lịch hẹn</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead>
                      {appointmentsTable
                        .getHeaderGroups()
                        .map((headerGroup) => (
                          <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                              <th
                                key={header.id}
                                className="px-4 py-2 text-left"
                              >
                                {flexRender(
                                  header.column.columnDef.header,
                                  header.getContext()
                                )}
                              </th>
                            ))}
                          </tr>
                        ))}
                    </thead>
                    <tbody>
                      {appointmentsTable.getRowModel().rows.map((row) => (
                        <tr key={row.id}>
                          {row.getVisibleCells().map((cell) => (
                            <td key={cell.id} className="px-4 py-2">
                              {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext()
                              )}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Lịch sử dịch vụ</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead>
                      {serviceHistoryTable
                        .getHeaderGroups()
                        .map((headerGroup) => (
                          <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                              <th
                                key={header.id}
                                className="px-4 py-2 text-left"
                              >
                                {flexRender(
                                  header.column.columnDef.header,
                                  header.getContext()
                                )}
                              </th>
                            ))}
                          </tr>
                        ))}
                    </thead>
                    <tbody>
                      {serviceHistoryTable.getRowModel().rows.map((row) => (
                        <tr key={row.id}>
                          {row.getVisibleCells().map((cell) => (
                            <td key={cell.id} className="px-4 py-2">
                              {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext()
                              )}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          )}
        </motion.div>
      </AnimatePresence>

      <AlertDialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Xác nhận hủy lịch</AlertDialogTitle>
            <AlertDialogDescription>
              Bạn có chắc chắn muốn hủy lịch hẹn này không?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Không</AlertDialogCancel>
            <AlertDialogAction
              onClick={() =>
                selectedAppointmentId &&
                handleCancelAppointment(selectedAppointmentId)
              }
              className="bg-red-600 hover:bg-red-700"
            >
              Có, hủy lịch
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
