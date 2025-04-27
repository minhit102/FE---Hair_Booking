import Link from "next/link";
import { Scissors } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const services = {
  men: [
    {
      id: "men-1",
      name: "Cắt tóc cơ bản",
      description: "Cắt tóc nam cơ bản với kiểu dáng đơn giản",
      price: "100.000đ",
      duration: "30 phút",
    },
    {
      id: "men-2",
      name: "Cắt tóc + Tạo kiểu",
      description: "Cắt tóc nam và tạo kiểu với sản phẩm chuyên nghiệp",
      price: "150.000đ",
      duration: "45 phút",
    },
    {
      id: "men-3",
      name: "Cắt tóc + Gội đầu",
      description: "Cắt tóc nam kèm gội đầu massage thư giãn",
      price: "180.000đ",
      duration: "60 phút",
    },
    {
      id: "men-4",
      name: "Combo VIP",
      description: "Cắt tóc + Gội đầu + Tạo kiểu + Massage vai cổ",
      price: "250.000đ",
      duration: "90 phút",
    },
  ],
  women: [
    {
      id: "women-1",
      name: "Cắt tóc cơ bản",
      description: "Cắt tóc nữ cơ bản với kiểu dáng đơn giản",
      price: "150.000đ",
      duration: "45 phút",
    },
    {
      id: "women-2",
      name: "Cắt tóc + Tạo kiểu",
      description: "Cắt tóc nữ và tạo kiểu với sản phẩm chuyên nghiệp",
      price: "200.000đ",
      duration: "60 phút",
    },
    {
      id: "women-3",
      name: "Cắt tóc + Gội đầu",
      description: "Cắt tóc nữ kèm gội đầu massage thư giãn",
      price: "250.000đ",
      duration: "75 phút",
    },
    {
      id: "women-4",
      name: "Combo VIP",
      description: "Cắt tóc + Gội đầu + Tạo kiểu + Massage vai cổ",
      price: "350.000đ",
      duration: "120 phút",
    },
  ],
  coloring: [
    {
      id: "color-1",
      name: "Nhuộm tóc cơ bản",
      description: "Nhuộm tóc một màu cơ bản",
      price: "300.000đ",
      duration: "90 phút",
    },
    {
      id: "color-2",
      name: "Nhuộm tóc highlight",
      description: "Nhuộm tóc highlight với nhiều màu sắc",
      price: "500.000đ",
      duration: "120 phút",
    },
    {
      id: "color-3",
      name: "Nhuộm tóc ombre",
      description: "Nhuộm tóc ombre với màu sắc chuyển dần",
      price: "600.000đ",
      duration: "150 phút",
    },
    {
      id: "color-4",
      name: "Nhuộm tóc balayage",
      description: "Nhuộm tóc balayage với màu sắc tự nhiên",
      price: "700.000đ",
      duration: "180 phút",
    },
  ],
  treatment: [
    {
      id: "treat-1",
      name: "Hấp dầu",
      description: "Hấp dầu dưỡng tóc chuyên sâu",
      price: "200.000đ",
      duration: "60 phút",
    },
    {
      id: "treat-2",
      name: "Phục hồi tóc hư tổn",
      description: "Phục hồi tóc hư tổn với sản phẩm chuyên nghiệp",
      price: "350.000đ",
      duration: "90 phút",
    },
    {
      id: "treat-3",
      name: "Điều trị rụng tóc",
      description: "Điều trị rụng tóc với sản phẩm chuyên nghiệp",
      price: "400.000đ",
      duration: "90 phút",
    },
    {
      id: "treat-4",
      name: "Trị gàu",
      description: "Điều trị gàu với sản phẩm chuyên nghiệp",
      price: "250.000đ",
      duration: "60 phút",
    },
  ],
};

export default function ServicesPage() {
  return (
    <div className="container py-12 px-4 md:px-6">
      <div className="space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">
            Dịch vụ của chúng tôi
          </h1>
          <p className="text-gray-500 max-w-[700px] mx-auto">
            Chúng tôi cung cấp nhiều dịch vụ khác nhau để đáp ứng nhu cầu của
            bạn. Dưới đây là danh sách các dịch vụ chúng tôi cung cấp.
          </p>
        </div>

        <Tabs defaultValue="men" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="men">Nam</TabsTrigger>
            <TabsTrigger value="women">Nữ</TabsTrigger>
            <TabsTrigger value="coloring">Nhuộm tóc</TabsTrigger>
            <TabsTrigger value="treatment">Chăm sóc tóc</TabsTrigger>
          </TabsList>
          {Object.entries(services).map(([category, items]) => (
            <TabsContent key={category} value={category} className="mt-6">
              <div className="grid gap-6 md:grid-cols-2">
                {items.map((service) => (
                  <Card key={service.id}>
                    <CardHeader className="flex flex-row items-center gap-4 pb-2">
                      <Scissors className="h-8 w-8" />
                      <div className="grid gap-1">
                        <CardTitle>{service.name}</CardTitle>
                        <CardDescription>{service.duration}</CardDescription>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-500">
                        {service.description}
                      </p>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <p className="text-lg font-bold">{service.price}</p>
                      <Button asChild>
                        <Link href={`/booking?service=${service.id}`}>
                          Đặt lịch
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        <div className="bg-muted rounded-lg p-8 mt-12">
          <div className="grid gap-6 md:grid-cols-2 items-center">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">
                Bạn không chắc chắn về dịch vụ nào?
              </h2>
              <p className="text-gray-500">
                Đừng lo lắng, các thợ cắt tóc của chúng tôi sẽ tư vấn cho bạn
                dịch vụ phù hợp nhất với nhu cầu của bạn. Hãy đặt lịch tư vấn
                miễn phí ngay hôm nay!
              </p>
              <Button asChild>
                <Link href="/booking">Đặt lịch tư vấn</Link>
              </Button>
            </div>
            <div className="relative h-[300px] rounded-lg overflow-hidden">
              <img
                src="/placeholder.svg?height=300&width=500"
                alt="Salon consultation"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
