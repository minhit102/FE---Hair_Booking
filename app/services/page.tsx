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
import { getServiceList } from "@/services/service/get-service-list.api";

const services = [
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
];

export default async function ServicesPage() {
  const serviceList = await getServiceList();
  return (
    <div className="container py-12 px-4 md:px-6">
      <div className="space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">
            Dịch vụ cắt tóc nam
          </h1>
          <p className="text-gray-500 max-w-[700px] mx-auto">
            Chúng tôi cung cấp các dịch vụ cắt tóc nam chuyên nghiệp với đội ngũ
            thợ cắt tóc giàu kinh nghiệm.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {serviceList.map((service: any) => (
            <Card key={service.id}>
              <CardHeader className="flex flex-col items-start gap-4 pb-2">
                <img
                  src={service.image}
                  alt={service.name}
                  className="w-full h-32 object-cover rounded-lg"
                />
                <div className="flex flex-row items-center gap-4">
                  <Scissors className="h-8 w-8" />
                  <div className="grid gap-1">
                    <CardTitle>{service.name}</CardTitle>
                    <CardDescription>{service.duration}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500">{service.description}</p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <p className="text-lg font-bold">{service.price} VND</p>
                <Button asChild>
                  <Link href={`/booking?service=${service._id}&step=info`}>
                    Đặt lịch
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="bg-muted rounded-lg p-8 mt-12">
          <div className="grid gap-6 md:grid-cols-2 items-center">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">
                Bạn không chắc chắn về kiểu tóc nào phù hợp?
              </h2>
              <p className="text-gray-500">
                Đừng lo lắng, các thợ cắt tóc của chúng tôi sẽ tư vấn cho bạn
                kiểu tóc phù hợp nhất với khuôn mặt và phong cách của bạn. Hãy
                đặt lịch tư vấn miễn phí ngay hôm nay!
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
