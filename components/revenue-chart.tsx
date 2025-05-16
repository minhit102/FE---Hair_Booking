"use client";

import {
  BarChart,
  Bar,
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
  { name: "08/05", revenue: 3900000 },
  { name: "09/05", revenue: 3700000 },
  { name: "10/05", revenue: 4300000 },
  { name: "11/05", revenue: 3800000 },
  { name: "12/05", revenue: 4500000 },
  { name: "13/05", revenue: 4200000 },
  { name: "14/05", revenue: 3900000 },
  { name: "15/05", revenue: 4100000 },
];

export function RevenueChart() {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        data={data}
        margin={{
          top: 5,
          right: 10,
          left: 10,
          bottom: 5,
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
          tickFormatter={(value: any) => `${value / 1000000}M`}
          tickLine={false}
          axisLine={false}
          style={{ fontSize: "12px" }}
        />
        <Tooltip
          formatter={(value: any) => [
            `${value.toLocaleString("vi-VN")} ₫`,
            "Doanh thu",
          ]}
          labelFormatter={(label: any) => `Ngày ${label}`}
        />
        <Bar dataKey="revenue" fill="#8884d8" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
