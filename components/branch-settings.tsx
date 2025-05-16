"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";

export function BranchSettings() {
  const [branchInfo, setBranchInfo] = useState({
    name: "Salon Tóc Đẹp - Chi nhánh Quận 1",
    address: "123 Nguyễn Huệ, Quận 1, TP.HCM",
    phone: "028 1234 5678",
    email: "quan1@salontoc.com",
    openTime: "08:00",
    closeTime: "22:00",
    openDays: [
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
    ],
    facebook: "facebook.com/salontoc",
    instagram: "instagram.com/salontoc",
    description:
      "Salon tóc chuyên nghiệp với đội ngũ thợ tay nghề cao, phục vụ tận tâm.",
  });

  const handleChange = (field: any, value: any) => {
    setBranchInfo((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const toggleDay = (day: any) => {
    setBranchInfo((prev) => {
      const openDays = [...prev.openDays];

      if (openDays.includes(day)) {
        return {
          ...prev,
          openDays: openDays.filter((d) => d !== day),
        };
      } else {
        return {
          ...prev,
          openDays: [...openDays, day],
        };
      }
    });
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="branch-name">Tên chi nhánh</Label>
          <Input
            id="branch-name"
            value={branchInfo.name}
            onChange={(e) => handleChange("name", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="branch-phone">Số điện thoại</Label>
          <Input
            id="branch-phone"
            value={branchInfo.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="branch-address">Địa chỉ</Label>
        <Input
          id="branch-address"
          value={branchInfo.address}
          onChange={(e) => handleChange("address", e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="branch-email">Email</Label>
        <Input
          id="branch-email"
          type="email"
          value={branchInfo.email}
          onChange={(e) => handleChange("email", e.target.value)}
        />
      </div>

      <Separator />

      <div>
        <h3 className="text-lg font-medium">Giờ hoạt động</h3>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="open-time">Giờ mở cửa</Label>
            <Input
              id="open-time"
              type="time"
              value={branchInfo.openTime}
              onChange={(e) => handleChange("openTime", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="close-time">Giờ đóng cửa</Label>
            <Input
              id="close-time"
              type="time"
              value={branchInfo.closeTime}
              onChange={(e) => handleChange("closeTime", e.target.value)}
            />
          </div>
        </div>

        <div className="mt-4 space-y-2">
          <Label>Ngày hoạt động</Label>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {[
              { id: "monday", label: "Thứ 2" },
              { id: "tuesday", label: "Thứ 3" },
              { id: "wednesday", label: "Thứ 4" },
              { id: "thursday", label: "Thứ 5" },
              { id: "friday", label: "Thứ 6" },
              { id: "saturday", label: "Thứ 7" },
              { id: "sunday", label: "Chủ nhật" },
            ].map((day) => (
              <div key={day.id} className="flex items-center space-x-2">
                <Switch
                  id={`day-${day.id}`}
                  checked={branchInfo.openDays.includes(day.id)}
                  onCheckedChange={() => toggleDay(day.id)}
                />
                <Label htmlFor={`day-${day.id}`}>{day.label}</Label>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="text-lg font-medium">Mạng xã hội</h3>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="facebook">Facebook</Label>
            <Input
              id="facebook"
              value={branchInfo.facebook}
              onChange={(e) => handleChange("facebook", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="instagram">Instagram</Label>
            <Input
              id="instagram"
              value={branchInfo.instagram}
              onChange={(e) => handleChange("instagram", e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Mô tả</Label>
        <Textarea
          id="description"
          rows={4}
          value={branchInfo.description}
          onChange={(e) => handleChange("description", e.target.value)}
        />
      </div>
    </div>
  );
}
