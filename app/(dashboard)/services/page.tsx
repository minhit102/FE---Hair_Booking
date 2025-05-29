"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ServicesTable } from "@/components/services-table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { createService } from "@/lib/api/service";
import { toast } from "sonner";

export default function ServicesPage() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [newService, setNewService] = useState({
    name: "",
    price: 0,
    duration: 0,
    image: "",
    popular: false,
    isActive: true,
    description: "",
  });

  const handleCreateService = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createService(newService);
      toast.success("Thêm dịch vụ thành công");
      setIsCreateDialogOpen(false);
      setRefreshTrigger((prev) => prev + 1);
      // Reset form
      setNewService({
        name: "",
        price: 0,
        duration: 0,
        image: "",
        popular: false,
        isActive: true,
        description: "",
      });
    } catch (error) {
      toast.error("Không thể thêm dịch vụ");
      console.error("Create service error:", error);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Dịch vụ</h1>
        <div className="flex items-center gap-2">
          <Button onClick={() => setIsCreateDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Thêm dịch vụ
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Tất cả dịch vụ</CardTitle>
          <CardDescription>Quản lý các dịch vụ của salon</CardDescription>
        </CardHeader>
        <CardContent>
          <ServicesTable refreshTrigger={refreshTrigger} />
        </CardContent>
      </Card>

      {/* Create Service Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Thêm dịch vụ mới</DialogTitle>
            <DialogDescription>
              Điền thông tin dịch vụ mới. Nhấn lưu khi hoàn tất.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleCreateService}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Tên dịch vụ</Label>
                <Input
                  id="name"
                  value={newService.name}
                  onChange={(e) =>
                    setNewService((prev) => ({ ...prev, name: e.target.value }))
                  }
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="price">Giá</Label>
                <Input
                  id="price"
                  type="number"
                  min="0"
                  value={newService.price || ""}
                  onChange={(e) =>
                    setNewService((prev) => ({
                      ...prev,
                      price: Number(e.target.value) || 0,
                    }))
                  }
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="duration">Thời gian (phút)</Label>
                <Input
                  id="duration"
                  type="number"
                  min="0"
                  value={newService.duration || ""}
                  onChange={(e) =>
                    setNewService((prev) => ({
                      ...prev,
                      duration: Number(e.target.value) || 0,
                    }))
                  }
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="image">Link ảnh</Label>
                <Input
                  id="image"
                  value={newService.image}
                  onChange={(e) =>
                    setNewService((prev) => ({
                      ...prev,
                      image: e.target.value,
                    }))
                  }
                  placeholder="Nhập URL ảnh"
                  required
                />
                {newService.image && (
                  <div className="mt-2">
                    <Label>Xem trước ảnh</Label>
                    <div className="relative h-40 w-40 overflow-hidden rounded-md border">
                      <img
                        src={newService.image}
                        alt="Preview"
                        className="h-full w-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src =
                            "https://via.placeholder.com/160?text=Invalid+Image";
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Mô tả</Label>
                <Input
                  id="description"
                  value={newService.description}
                  onChange={(e) =>
                    setNewService((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="popular"
                  checked={newService.popular}
                  onCheckedChange={(checked) =>
                    setNewService((prev) => ({ ...prev, popular: checked }))
                  }
                />
                <Label htmlFor="popular">Dịch vụ phổ biến</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="isActive"
                  checked={newService.isActive}
                  onCheckedChange={(checked) =>
                    setNewService((prev) => ({ ...prev, isActive: checked }))
                  }
                />
                <Label htmlFor="isActive">Đang hoạt động</Label>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Thêm dịch vụ</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
