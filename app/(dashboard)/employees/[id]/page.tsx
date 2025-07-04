"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Clock, Mail, Phone, Star } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import {
  getHairStylistById,
  getReviewsByStylistId,
} from "@/lib/api/hair-stylist";

interface StylistDetail {
  id: string;
  name: string;
  position: string;
  phone: string;
  email: string;
  avatar?: string;
  schedule: string;
  rating: number;
  services: number;
  status: "active" | "inactive";
  bio?: string;
  skills?: string[];
  experience?: number;
  joinDate?: string;
}

interface Review {
  id: string;
  customerName: string;
  customerAvatar?: string;
  rating: number;
  comment: string;
  date: string;
  serviceName: string;
}

export default function EmployeeDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [employee, setEmployee] = useState<StylistDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await getHairStylistById({ id: params.id as string });
        setEmployee(response);
      } catch (error) {
        toast.error("Không thể tải thông tin nhân viên");
      } finally {
        setIsLoading(false);
      }
    };

    const fetchReviews = async () => {
      try {
        const responses = await getReviewsByStylistId({
          id: params.id as string,
        });
        const convertReview = responses.map((res: any) => {
          return {
            id: res.review._id,
            customerName: res.userName,
            customerAvatar: res.service.image || "",
            rating: res.review.rating,
            comment: res.review.review,
            date: res.review.updatedAt,
            serviceName: res.service.name,
          };
        });
        setReviews(convertReview);
      } catch (error) {
        toast.error("Không thể tải đánh giá");
      }
    };
    fetchEmployee();
    fetchReviews();
  }, [params.id]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-muted-foreground">Đang tải...</p>
        </div>
      </div>
    );
  }

  if (!employee) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Không tìm thấy nhân viên</h2>
          <p className="text-muted-foreground mt-2">
            Nhân viên này có thể đã bị xóa hoặc không tồn tại
          </p>
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => router.push("/employees")}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Quay lại danh sách
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => router.push("/employees")}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-3xl font-bold tracking-tight">
            Thông tin nhân viên
          </h1>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-[300px_1fr]">
        <Card>
          <CardHeader>
            <div className="flex flex-col items-center gap-4">
              <Avatar className="h-32 w-32">
                {employee.avatar ? (
                  <AvatarImage src={employee.avatar} alt={employee.name} />
                ) : (
                  <AvatarFallback className="text-4xl">
                    {employee.name.charAt(0)}
                  </AvatarFallback>
                )}
              </Avatar>
              <div className="text-center">
                <h2 className="text-2xl font-bold">{employee.name}</h2>
                <p className="text-muted-foreground">{employee.position}</p>
              </div>
              <Badge
                variant={employee.status === "active" ? "default" : "secondary"}
              >
                {employee.status === "active" ? "Đang làm việc" : "Nghỉ việc"}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>{employee.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>{employee.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span>{employee.schedule}</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 text-muted-foreground" />
                <span>{employee.rating} / 5.0</span>
              </div>
              {employee.joinDate && (
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>Ngày vào làm: {employee.joinDate}</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Tabs defaultValue="overview">
            <TabsList>
              <TabsTrigger value="overview">Tổng quan</TabsTrigger>
              <TabsTrigger value="schedule">Lịch làm việc</TabsTrigger>
              <TabsTrigger value="services">Dịch vụ</TabsTrigger>
              <TabsTrigger value="reviews">Đánh giá</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Thông tin chi tiết</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {employee.bio && (
                      <div>
                        <h3 className="font-semibold mb-2">Giới thiệu</h3>
                        <p className="text-muted-foreground">{employee.bio}</p>
                      </div>
                    )}
                    {employee.skills && employee.skills.length > 0 && (
                      <div>
                        <h3 className="font-semibold mb-2">Kỹ năng</h3>
                        <div className="flex flex-wrap gap-2">
                          {employee.skills.map((skill, index) => (
                            <Badge key={index} variant="secondary">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                    {employee.experience && (
                      <div>
                        <h3 className="font-semibold mb-2">Kinh nghiệm</h3>
                        <p className="text-muted-foreground">
                          {employee.experience} năm
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Thống kê</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Tổng số dịch vụ</p>
                      <p className="text-2xl font-bold">{employee.services}</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Đánh giá trung bình</p>
                      <p className="text-2xl font-bold">{employee.rating}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="schedule">
              <Card>
                <CardHeader>
                  <CardTitle>Lịch làm việc</CardTitle>
                  <CardDescription>
                    Xem và quản lý lịch làm việc của nhân viên
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {/* Add schedule component here */}
                  <p className="text-muted-foreground">
                    Chức năng đang được phát triển...
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="services">
              <Card>
                <CardHeader>
                  <CardTitle>Dịch vụ đã thực hiện</CardTitle>
                  <CardDescription>
                    Danh sách các dịch vụ mà nhân viên đã thực hiện
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {/* Add services list component here */}
                  <p className="text-muted-foreground">
                    Chức năng đang được phát triển...
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reviews">
              <Card>
                <CardHeader>
                  <CardTitle>Đánh giá từ khách hàng</CardTitle>
                  <CardDescription>
                    Xem các đánh giá và phản hồi từ khách hàng
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {reviews.length > 0 ? (
                      reviews.map((review) => (
                        <div
                          key={review.id}
                          className="border-b pb-6 last:border-0"
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex items-center gap-3">
                              <Avatar className="h-10 w-10">
                                {review.customerAvatar ? (
                                  <AvatarImage
                                    src={review.customerAvatar}
                                    alt={review.customerName}
                                  />
                                ) : (
                                  <AvatarFallback>
                                    {review.customerName.charAt(0)}
                                  </AvatarFallback>
                                )}
                              </Avatar>
                              <div>
                                <h4 className="font-medium">
                                  {review.customerName}
                                </h4>
                                <p className="text-sm text-muted-foreground">
                                  {new Date(review.date).toLocaleDateString(
                                    "vi-VN"
                                  )}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-1">
                              <span className="font-medium">
                                {review.rating}
                              </span>
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            </div>
                          </div>
                          <div className="mt-3">
                            <p className="text-sm text-muted-foreground mb-2">
                              Dịch vụ: {review.serviceName}
                            </p>
                            <p className="text-sm">{review.comment}</p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-muted-foreground">
                          Chưa có đánh giá nào cho nhân viên này
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
