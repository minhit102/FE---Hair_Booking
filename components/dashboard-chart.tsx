"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "01/05", revenue: 2500000 },
  { name: "02/05", revenue: 3200000 },
  { name: "03/05", revenue: 2800000 },
  { name: "04/05", revenue: 3800000 },
  { name: "05/05", revenue: 4100000 },
  { name: "06/05", revenue: 3600000 },
  { name: "07/05", revenue: 4250000 },
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
