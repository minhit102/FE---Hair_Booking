import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CustomerRegistrationForm } from "@/components/customer-registration-form";
import { CustomerSearch } from "@/components/customer-search";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function CustomerRegistrationPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">
          Đăng ký khách hàng
        </h1>
      </div>

      <Tabs defaultValue="new" className="w-full">
        <TabsList>
          <TabsTrigger value="new">Khách hàng mới</TabsTrigger>
          <TabsTrigger value="existing">Tìm khách hàng</TabsTrigger>
        </TabsList>

        <TabsContent value="new" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Thông tin khách hàng mới</CardTitle>
              <CardDescription>
                Nhập thông tin để đăng ký khách hàng mới
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CustomerRegistrationForm />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="existing" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Tìm kiếm khách hàng</CardTitle>
              <CardDescription>
                Tìm kiếm khách hàng đã có trong hệ thống
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CustomerSearch />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
