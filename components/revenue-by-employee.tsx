"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
  { name: "Minh", revenue: 8500000, services: 42 },
  { name: "Hương", revenue: 12000000, services: 38 },
  { name: "Tâm", revenue: 9800000, services: 35 },
  { name: "Hà", revenue: 7200000, services: 28 },
  { name: "Nam", revenue: 6500000, services: 25 },
  { name: "Lan", revenue: 5800000, services: 22 },
];

export function RevenueByEmployee() {
  const formatPrice = (price: any) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nhân viên</TableHead>
                <TableHead className="text-right">Doanh thu</TableHead>
                <TableHead className="text-right">Số dịch vụ</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((item) => (
                <TableRow key={item.name}>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell className="text-right">
                    {formatPrice(item.revenue)}
                  </TableCell>
                  <TableCell className="text-right">{item.services}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <div>
        <ResponsiveContainer width="100%" height={300}>
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
            <XAxis dataKey="name" tickLine={false} axisLine={false} />
            <YAxis
              tickFormatter={(value) => `${value / 1000000}M`}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip formatter={(value) => formatPrice(value)} />
            <Bar dataKey="revenue" fill="#8884d8" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
