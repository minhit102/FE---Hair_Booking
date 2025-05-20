"use client";
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

const data = [
  { name: "01/05", revenue: 2500000 },
  { name: "02/05", revenue: 3200000 },
  { name: "03/05", revenue: 2800000 },
  { name: "04/05", revenue: 3800000 },
  { name: "05/05", revenue: 4100000 },
  { name: "06/05", revenue: 3600000 },
  { name: "07/05", revenue: 4250000 },
  { name: "08/05", revenue: 2500000 },
  { name: "09/05", revenue: 3200000 },
  { name: "10/05", revenue: 2800000 },
  { name: "11/05", revenue: 3800000 },
  { name: "12/05", revenue: 4100000 },
  { name: "13/05", revenue: 3600000 },
  { name: "14/05", revenue: 4250000 },
  { name: "15/05", revenue: 2500000 },
  { name: "16/05", revenue: 3200000 },
  { name: "17/05", revenue: 2800000 },
  { name: "18/05", revenue: 3800000 },
  { name: "19/05", revenue: 4100000 },
  { name: "20/05", revenue: 3600000 },
  { name: "21/05", revenue: 4250000 },
];

export function DashboardChart() {
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

const dataByMonth = [
  { name: "Tháng 1", revenue: 250000000 },
  { name: "Tháng 2", revenue: 320000000 },
  { name: "Tháng 3", revenue: 280000000 },
  { name: "Tháng 4", revenue: 380000000 },
  { name: "Tháng 5", revenue: 410000000 },
  { name: "Tháng 6", revenue: 360000000 },
  { name: "Tháng 7", revenue: 425000000 },
  { name: "Tháng 8", revenue: 250000000 },
  { name: "Tháng 9", revenue: 320000000 },
  { name: "Tháng 10", revenue: 280000000 },
  { name: "Tháng 11", revenue: 380000000 },
  { name: "Tháng 12", revenue: 410000000 },
];

export function DashboardChartByMonth() {
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
