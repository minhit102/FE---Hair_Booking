import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BranchSettings } from "@/components/branch-settings";
import { NotificationSettings } from "@/components/notification-settings";
import { UserSettings } from "@/components/user-settings";

export default function SettingsPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Cài đặt</h1>
        <div className="flex items-center gap-2">
          <Button>Lưu thay đổi</Button>
        </div>
      </div>

      <Tabs defaultValue="branch">
        <TabsList>
          <TabsTrigger value="branch">Chi nhánh</TabsTrigger>
          <TabsTrigger value="notifications">Thông báo</TabsTrigger>
          <TabsTrigger value="users">Người dùng</TabsTrigger>
        </TabsList>

        <TabsContent value="branch" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Cài đặt chi nhánh</CardTitle>
              <CardDescription>
                Quản lý thông tin chi nhánh và giờ hoạt động
              </CardDescription>
            </CardHeader>
            <CardContent>
              <BranchSettings />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Cài đặt thông báo</CardTitle>
              <CardDescription>
                Quản lý cách thức gửi thông báo đến khách hàng
              </CardDescription>
            </CardHeader>
            <CardContent>
              <NotificationSettings />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Quản lý người dùng</CardTitle>
              <CardDescription>Quản lý tài khoản và phân quyền</CardDescription>
            </CardHeader>
            <CardContent>
              <UserSettings />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
