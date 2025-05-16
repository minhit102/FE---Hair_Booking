"use client";

import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function NotificationSettings() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Nhắc lịch hẹn</h3>
        <p className="text-sm text-muted-foreground">
          Cấu hình thông báo nhắc lịch hẹn cho khách hàng
        </p>

        <div className="mt-4 space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="email-reminder">Gửi email nhắc lịch</Label>
              <p className="text-sm text-muted-foreground">
                Gửi email nhắc lịch hẹn cho khách hàng
              </p>
            </div>
            <Switch id="email-reminder" defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="sms-reminder">Gửi SMS nhắc lịch</Label>
              <p className="text-sm text-muted-foreground">
                Gửi tin nhắn SMS nhắc lịch hẹn cho khách hàng
              </p>
            </div>
            <Switch id="sms-reminder" defaultChecked />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="reminder-time">Thời gian nhắc trước</Label>
            <Select defaultValue="24">
              <SelectTrigger id="reminder-time">
                <SelectValue placeholder="Chọn thời gian" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1 giờ trước</SelectItem>
                <SelectItem value="3">3 giờ trước</SelectItem>
                <SelectItem value="12">12 giờ trước</SelectItem>
                <SelectItem value="24">24 giờ trước</SelectItem>
                <SelectItem value="48">2 ngày trước</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="text-lg font-medium">Mẫu thông báo</h3>
        <p className="text-sm text-muted-foreground">
          Tùy chỉnh nội dung thông báo gửi đến khách hàng
        </p>

        <div className="mt-4 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email-template">Mẫu email nhắc lịch</Label>
            <Textarea
              id="email-template"
              rows={4}
              defaultValue={`Kính gửi [TÊN KHÁCH HÀNG],\n\nĐây là email nhắc nhở về lịch hẹn của bạn tại Salon Tóc Đẹp vào lúc [GIỜ HẸN] ngày [NGÀY HẸN].\n\nXin vui lòng đến đúng giờ. Nếu bạn cần thay đổi lịch hẹn, vui lòng liên hệ với chúng tôi.\n\nTrân trọng,\nSalon Tóc Đẹp`}
            />
            <p className="text-xs text-muted-foreground">
              Sử dụng [TÊN KHÁCH HÀNG], [NGÀY HẸN], [GIỜ HẸN] để thay thế thông
              tin tương ứng
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="sms-template">Mẫu SMS nhắc lịch</Label>
            <Textarea
              id="sms-template"
              rows={3}
              defaultValue={`Salon Tóc Đẹp xin nhắc lịch hẹn của bạn vào lúc [GIỜ HẸN] ngày [NGÀY HẸN]. Liên hệ 028 1234 5678 nếu cần thay đổi.`}
            />
            <p className="text-xs text-muted-foreground">
              Sử dụng [TÊN KHÁCH HÀNG], [NGÀY HẸN], [GIỜ HẸN] để thay thế thông
              tin tương ứng
            </p>
          </div>
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="text-lg font-medium">Thông báo khuyến mãi</h3>
        <p className="text-sm text-muted-foreground">
          Cấu hình thông báo khuyến mãi cho khách hàng
        </p>

        <div className="mt-4 space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="promo-email">Gửi email khuyến mãi</Label>
              <p className="text-sm text-muted-foreground">
                Gửi thông tin khuyến mãi qua email
              </p>
            </div>
            <Switch id="promo-email" defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="promo-sms">Gửi SMS khuyến mãi</Label>
              <p className="text-sm text-muted-foreground">
                Gửi thông tin khuyến mãi qua SMS
              </p>
            </div>
            <Switch id="promo-sms" />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="birthday-promo">Khuyến mãi sinh nhật</Label>
              <p className="text-sm text-muted-foreground">
                Tự động gửi khuyến mãi vào sinh nhật khách hàng
              </p>
            </div>
            <Switch id="birthday-promo" defaultChecked />
          </div>
        </div>
      </div>
    </div>
  );
}
