"use client";

import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Clock, MoreHorizontal, Search } from "lucide-react";
import {
  getService,
  updateService,
  deleteService,
  Service,
} from "@/lib/api/service";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const getServices = async () => {
  const response = await getService();
  return response;
};

interface ServicesTableProps {
  refreshTrigger?: number;
}

export function ServicesTable({ refreshTrigger = 0 }: ServicesTableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [services, setServices] = useState<Service[]>([]);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [deletingService, setDeletingService] = useState<Service | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  useEffect(() => {
    const fetchServices = async () => {
      const data = await getServices();
      const formattedServices = data.map(
        (serviceConvert: any, index: number) => ({
          id: index + 1,
          _id: serviceConvert._id,
          name: serviceConvert.name,
          price: serviceConvert.price,
          duration: serviceConvert.duration,
          popular: serviceConvert.popular,
          image: serviceConvert.image,
          isActive: serviceConvert.isActive,
          description: serviceConvert.description,
        })
      );
      setServices(formattedServices);
    };
    fetchServices();
  }, [refreshTrigger]);

  const handleEdit = (service: Service) => {
    setEditingService(service);
    setIsEditDialogOpen(true);
  };

  const handleDelete = (service: Service) => {
    setDeletingService(service);
    setIsDeleteDialogOpen(true);
  };

  const handleUpdateService = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingService) return;

    try {
      await updateService({
        id: editingService._id,
        name: editingService.name,
        price: editingService.price,
        duration: editingService.duration,
        popular: editingService.popular,
        isActive: editingService.isActive,
        image: editingService.image,
        description: editingService.description,
      });

      toast.success("Cập nhật dịch vụ thành công");
      setIsEditDialogOpen(false);
      // Refresh services list
      const data = await getServices();
      setServices(data);
    } catch (error) {
      toast.error("Không thể cập nhật dịch vụ");
      console.error("Update service error:", error);
    }
  };

  const handleDeleteService = async () => {
    if (!deletingService) return;

    try {
      await deleteService(deletingService._id);
      console.log(deletingService._id);
      toast.success("Xóa dịch vụ thành công");
      setIsDeleteDialogOpen(false);
      // Refresh services list
      const data = await getServices();
      setServices(data);
    } catch (error) {
      toast.error("Không thể xóa dịch vụ");
      console.error("Delete service error:", error);
    }
  };

  const filteredServices = services.filter((service) => {
    const matchesSearch = service.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesCategory =
      categoryFilter === "all" || service.category === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  const formatPrice = (price: any) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col space-y-2 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Tìm dịch vụ..."
              className="pl-8 md:w-[300px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-col space-y-2 md:flex-row md:space-x-2 md:space-y-0"></div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tên dịch vụ</TableHead>
              <TableHead>Giá</TableHead>
              <TableHead>Thời gian</TableHead>
              <TableHead>Ảnh dịch vụ</TableHead>
              <TableHead>Activity</TableHead>
              <TableHead className="text-right">Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredServices.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  Không tìm thấy dịch vụ nào
                </TableCell>
              </TableRow>
            ) : (
              filteredServices.map((service) => (
                <TableRow key={service.id}>
                  <TableCell>
                    <div className="font-medium">{service.name}</div>
                  </TableCell>
                  <TableCell>{formatPrice(service.price)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>{service.duration} phút</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="relative h-10 w-10 overflow-hidden rounded-md">
                      <img
                        src={service.image}
                        alt={service.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </TableCell>
                  <TableCell>
                    <span
                      className={`font-medium ${
                        service.isActive ? "text-green-500" : "text-red-500"
                      }`}
                    >
                      {service.isActive ? "Đang hoạt động" : "Tạm dừng "}
                    </span>
                  </TableCell>
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
                        <DropdownMenuItem onClick={() => handleEdit(service)}>
                          Chỉnh sửa
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => {
                            const updatedService = {
                              ...service,
                              popular: !service.popular,
                            };
                            handleEdit(updatedService);
                          }}
                        >
                          {service.popular
                            ? "Bỏ đánh dấu phổ biến"
                            : "Đánh dấu phổ biến"}
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="text-red-600"
                          onClick={() => handleDelete(service)}
                        >
                          Xóa dịch vụ
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Chỉnh sửa dịch vụ</DialogTitle>
            <DialogDescription>
              Thay đổi thông tin dịch vụ. Nhấn lưu khi hoàn tất.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleUpdateService}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Tên dịch vụ</Label>
                <Input
                  id="name"
                  value={editingService?.name || ""}
                  onChange={(e) =>
                    setEditingService((prev) =>
                      prev ? { ...prev, name: e.target.value } : null
                    )
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="price">Giá</Label>
                <Input
                  id="price"
                  type="number"
                  value={editingService?.price || ""}
                  onChange={(e) =>
                    setEditingService((prev) =>
                      prev ? { ...prev, price: Number(e.target.value) } : null
                    )
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="duration">Thời gian (phút)</Label>
                <Input
                  id="duration"
                  type="number"
                  value={editingService?.duration || ""}
                  onChange={(e) =>
                    setEditingService((prev) =>
                      prev
                        ? { ...prev, duration: Number(e.target.value) }
                        : null
                    )
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label>Ảnh hiện tại</Label>
                {editingService?.image && (
                  <img
                    src={editingService.image}
                    alt="Service image"
                    className="w-32 h-32 object-cover rounded-md"
                  />
                )}
                <Label htmlFor="image">Link ảnh mới</Label>
                <Input
                  id="image"
                  value={editingService?.image || ""}
                  onChange={(e) =>
                    setEditingService((prev) =>
                      prev ? { ...prev, image: e.target.value } : null
                    )
                  }
                  placeholder="Nhập URL ảnh"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Mô tả</Label>
                <Input
                  id="description"
                  value={editingService?.description || ""}
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="isActive"
                  checked={editingService?.isActive || false}
                  onCheckedChange={(checked) =>
                    setEditingService((prev) =>
                      prev ? { ...prev, isActive: checked } : null
                    )
                  }
                />
                <Label htmlFor="isActive">Đang hoạt động</Label>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Lưu thay đổi</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Bạn có chắc chắn muốn xóa dịch vụ này?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Hành động này không thể hoàn tác. Dịch vụ sẽ bị xóa vĩnh viễn.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Hủy</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteService}
              className="bg-red-600 hover:bg-red-700"
            >
              Xóa
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
