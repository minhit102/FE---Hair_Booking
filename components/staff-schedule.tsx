import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const staffSchedule = [
  {
    id: 1,
    name: "Minh",
    shift: "08:00 - 17:00",
    appointments: 5,
    status: "available",
  },
  {
    id: 2,
    name: "Hương",
    shift: "08:00 - 17:00",
    appointments: 7,
    status: "busy",
  },
  {
    id: 3,
    name: "Tâm",
    shift: "13:00 - 22:00",
    appointments: 3,
    status: "available",
  },
  {
    id: 4,
    name: "Hà",
    shift: "13:00 - 22:00",
    appointments: 4,
    status: "available",
  },
];

export function StaffSchedule() {
  return (
    <div className="space-y-4">
      {staffSchedule.map((staff) => (
        <div
          key={staff.id}
          className="flex items-center justify-between space-x-4"
        >
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarFallback>{staff.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium leading-none">{staff.name}</p>
              <p className="text-sm text-muted-foreground">{staff.shift}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="text-sm text-muted-foreground">
              {staff.appointments} lịch hẹn
            </div>
            <Badge
              variant={staff.status === "available" ? "outline" : "secondary"}
            >
              {staff.status === "available" ? "Rảnh" : "Bận"}
            </Badge>
          </div>
        </div>
      ))}
    </div>
  );
}
