"use client";
import { getChartDay, getChartMonth } from "@/lib/api/dashboard";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Bar,
  BarChart,
} from "recharts";
import { useEffect, useState } from "react";

interface ChartData {
  name: string;
  revenue: number;
}

export function DashboardChart() {
  const [data, setData] = useState<ChartData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const chartData = await getChartDay();
        const formattedData = chartData.map((item: any) => {
          const date = new Date(item.createdAt);
          const day = String(date.getDate()).padStart(2, "0");
          const month = String(date.getMonth() + 1).padStart(2, "0"); // Tháng bắt đầu từ 0
          return {
            name: `${day}/${month}`,
            revenue: item?.totalRevenue || 0,
          };
        });
        setData(formattedData);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu biểu đồ:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart
        data={data}
        margin={{
          top: 5,
          right: 10,
          left: 10,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis
          dataKey="name"
          tickLine={false}
          axisLine={false}
          style={{ fontSize: "12px" }}
        />
        <YAxis
          tickFormatter={(value) => `${value / 1000000}M`}
          tickLine={false}
          axisLine={false}
          style={{ fontSize: "12px" }}
        />
        <Tooltip
          formatter={(value) => [
            `${value.toLocaleString("vi-VN")} ₫`,
            "Doanh thu",
          ]}
          labelFormatter={(label) => `Ngày ${label}`}
        />
        <Line
          type="monotone"
          dataKey="revenue"
          stroke="#8884d8"
          strokeWidth={2}
          dot={{ r: 4 }}
          activeDot={{ r: 6 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

// const dataByMonth = [
//   { name: "Tháng 1", revenue: 250000000 },
//   { name: "Tháng 2", revenue: 320000000 },
//   { name: "Tháng 3", revenue: 280000000 },
//   { name: "Tháng 4", revenue: 380000000 },
//   { name: "Tháng 5", revenue: 410000000 },
//   { name: "Tháng 6", revenue: 360000000 },
//   { name: "Tháng 7", revenue: 425000000 },
//   { name: "Tháng 8", revenue: 250000000 },
//   { name: "Tháng 9", revenue: 320000000 },
//   { name: "Tháng 10", revenue: 280000000 },
//   { name: "Tháng 11", revenue: 380000000 },
//   { name: "Tháng 12", revenue: 410000000 },
// ];

export function DashboardChartByMonth() {
  const [dataByMonth, setDataByMonth] = useState<ChartData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const chartData = await getChartMonth();
      setDataByMonth(
        chartData.map((item: any) => ({
          name: item.createdAt.split("T")[0].slice(0, 7),
          revenue: item?.totalRevenue || 0,
        }))
      );
    };
    fetchData();
  }, []);

  return (
    <ResponsiveContainer width="100%" height={500}>
      <BarChart
        data={dataByMonth}
        margin={{ top: 10, right: 30, left: 30, bottom: 30 }}
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis
          dataKey="name"
          tickLine={false}
          axisLine={false}
          style={{ fontSize: "12px" }}
        />
        <YAxis
          tickFormatter={(value) => `${value / 1000000}M`}
          tickLine={false}
          axisLine={false}
          style={{ fontSize: "12px" }}
        />
        <Tooltip
          formatter={(value) => [
            `${Number(value).toLocaleString("vi-VN")} ₫`,
            "Doanh thu",
          ]}
          labelFormatter={(label) => `${label}`}
        />
        <Bar dataKey="revenue" fill="#8884d8" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
