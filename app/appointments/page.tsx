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

type Appointment = {
  id: string;
  service: string;
  date: string;
  time: string;
  name: string;
  phone: string;
  notes: string;
  status: "pending" | "cancelled";
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

  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  const handleTabChange = (newTab: string) => {
    setActiveTab(newTab);
    router.replace(`?tab=${newTab}`, { scroll: false });
  };

  const appointmentsData = useMemo<Appointment[]>(
    () => [
      {
        id: "1",
        service: "Nhuộm tóc",
        date: "2025-05-20",
        time: "10:00",
        name: "Nguyễn Văn A",
        phone: "0987654321",
        notes: "Nhuộm màu đỏ",
        status: "pending",
      },
      {
        id: "2",
        service: "Cắt tóc nam",
        date: "2025-05-19",
        time: "14:00",
        name: "Trần Thị B",
        phone: "0912345678",
        notes: "Cắt ngắn",
        status: "cancelled",
      },
    ],
    []
  );

  const serviceHistoryData = useMemo<ServiceHistory[]>(
    () => [
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
    ],
    []
  );

  const appointmentColumnHelper = createColumnHelper<Appointment>();
  const appointmentColumns = useMemo(
    () => [
      appointmentColumnHelper.accessor("id", { header: "STT" }),
      appointmentColumnHelper.accessor("service", { header: "Dịch vụ" }),
      appointmentColumnHelper.accessor("time", { header: "Thời gian đặt" }),
      appointmentColumnHelper.accessor("name", { header: "Họ tên" }),
      appointmentColumnHelper.accessor("phone", { header: "Số điện thoại" }),
      appointmentColumnHelper.accessor("notes", { header: "Ghi chú" }),
      appointmentColumnHelper.accessor("status", {
        header: "Trạng thái",
        cell: (info) => (
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              info.getValue() === "pending"
                ? "bg-blue-100 text-blue-800"
                : "bg-gray-100 text-gray-800"
            }`}
          >
            {info.getValue() === "pending" ? "Chờ xác nhận" : "Đã hủy"}
          </span>
        ),
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
    </div>
  );
}
