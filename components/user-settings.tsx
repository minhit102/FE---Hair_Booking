"use client";
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
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Plus } from "lucide-react";

const users = [
  {
    id: 1,
    name: "Nguyễn Văn Admin1om",
    role: "admin",
    branch: "Chi nhánh Quận Minh1",
    lastActive: "Hôm nay, 10:23",
  },
  {
    id: 2,
    name: "Trần Thị Quản Lý1",
    email: "manager@example.com",
    role: "admin",
    branch: "Chi nhánh Quận 3",
    lastActive: "Hôm nay, 09:15",
  },
  {
    id: 3,
    name: "Lê Văn Trợ Lý1",
    email: "assistant@example.com",
    role: "assistant",
    branch: "Chi nhánh Quận Minh2",
    lastActive: "Hôm qua, 17:30",
  },
  {
    id: 4,
    name: "Phạm Thị Nhân Viên11",
    email: "staff@example.com",
    role: "staff",
    branch: "Chi nhánh Quận 1",
    lastActive: "03/05/2023, 14:45",
  },
  {
    id: 5,
    name: "Hoàng Văn Super",
    email: "super@example.com",
    role: "super_admin",
    branch: "Tất cả chi nhánh",
    lastActive: "Hôm nay, 11:05",
  },
];

export function UserSettings() {
  const getRoleBadge = (role: any) => {
    switch (role) {
      case "super_admin":
        return <Badge className="bg-purple-500">Super Admin</Badge>;
      case "admin":
        return <Badge>Admin</Badge>;
      case "assistant":
        return <Badge variant="secondary">Trợ lý</Badge>;
      case "staff":
        return <Badge variant="outline">Nhân viên</Badge>;
      default:
        return <Badge variant="outline">{role}</Badge>;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Thêm người dùng
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Người dùng</TableHead>
              <TableHead>Vai trò</TableHead>
              <TableHead>Chi nhánh</TableHead>
              <TableHead>Hoạt động gần đây</TableHead>
              <TableHead className="text-right">Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{user.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {user.email}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{getRoleBadge(user.role)}</TableCell>
                <TableCell>{user.branch}</TableCell>
                <TableCell>{user.lastActive}</TableCell>
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
                      <DropdownMenuItem>Chỉnh sửa thông tin</DropdownMenuItem>
                      <DropdownMenuItem>Đổi mật khẩu</DropdownMenuItem>
                      <DropdownMenuItem>Thay đổi quyền</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive">
                        Vô hiệu hóa tài khoản
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
