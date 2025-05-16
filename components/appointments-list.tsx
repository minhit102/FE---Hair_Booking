import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const appointments = [
  {
    id: 1,
    customer: "Nguyễn Văn A",
    time: "10:00",
    service: "Cắt tóc nam",
    staff: "Minh",
    status: "confirmed",
  },
  {
    id: 2,
    customer: "Trần Thị B",
    time: "11:30",
    service: "Nhuộm tóc",
    staff: "Hương",
    status: "pending",
  },
  {
    id: 3,
    customer: "Lê Văn C",
    time: "13:00",
    service: "Uốn tóc",
    staff: "Tâm",
    status: "confirmed",
  },
  {
    id: 4,
    customer: "Phạm Thị D",
    time: "15:30",
    service: "Gội đầu",
    staff: "Hà",
    status: "confirmed",
  },
];

export function AppointmentsList() {
  return (
    <div className="space-y-4">
      {appointments.map((appointment) => (
        <div
          key={appointment.id}
          className="flex items-center justify-between space-x-4"
        >
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarFallback>{appointment.customer.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium leading-none">
                {appointment.customer}
              </p>
              <p className="text-sm text-muted-foreground">
                {appointment.time} - {appointment.service}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="text-sm text-muted-foreground">
              {appointment.staff}
            </div>
            <Badge
              variant={
                appointment.status === "confirmed" ? "default" : "outline"
              }
            >
              {appointment.status === "confirmed"
                ? "Đã xác nhận"
                : "Chờ xác nhận"}
            </Badge>
          </div>
        </div>
      ))}
    </div>
  );
}
