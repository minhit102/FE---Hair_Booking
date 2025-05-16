"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Calendar, Phone, Mail, MapPin, Clock, Star } from "lucide-react";

export function CustomerDetailsDialog({
  customer,
  open,
  onOpenChange,
}: {
  customer: any;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  if (!customer) return null;
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Thông tin khách hàng</DialogTitle>
          <DialogDescription>
            Chi tiết thông tin và lịch sử của khách hàng
          </DialogDescription>
        </DialogHeader>

        <div className="flex items-center gap-4 py-2">
          <Avatar className="h-16 w-16">
            <AvatarFallback className="text-lg">
              {customer.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-lg font-semibold">{customer.name}</h3>
            <div className="flex items-center gap-2">
              {customer.isRegular && (
                <Badge className="mt-1">
                  <Star className="mr-1 h-3 w-3 fill-primary text-primary" />
                  Khách quen
                </Badge>
              )}
            </div>
          </div>
        </div>

        <Separator />

        <div className="grid gap-3">
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-muted-foreground" />
            <span>{customer.phone}</span>
          </div>

          {customer.email && (
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span>{customer.email}</span>
            </div>
          )}

          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>Lần cuối đến: {customer.lastVisit}</span>
          </div>

          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span>Số lần đến: {customer.visits} lần</span>
          </div>

          {customer.address && (
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span>{customer.address}</span>
            </div>
          )}
        </div>

        <Separator />

        <div>
          <h4 className="mb-2 font-medium">Dịch vụ thường sử dụng</h4>
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary">Cắt tóc nữ</Badge>
            <Badge variant="secondary">Nhuộm tóc</Badge>
            <Badge variant="secondary">Uốn tóc</Badge>
          </div>
        </div>

        <DialogFooter className="flex sm:justify-between">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Đóng
          </Button>
          <div className="flex gap-2">
            <Button variant="outline">Lịch sử dịch vụ</Button>
            <Button>Đặt lịch mới</Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
