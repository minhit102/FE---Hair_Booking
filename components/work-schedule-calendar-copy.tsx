// "use client";

// import { useState } from "react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { Avatar, AvatarFallback } from "@/components/ui/avatar";
// import { Badge } from "@/components/ui/badge";

// const employees = [
//   { id: 1, name: "Minh", position: "Thợ cắt tóc" },
//   { id: 2, name: "Hương", position: "Thợ nhuộm" },
//   { id: 3, name: "Tâm", position: "Thợ cắt tóc" },
//   { id: 4, name: "Hà", position: "Thợ gội đầu" },
//   { id: 5, name: "Nam", position: "Thợ cắt tóc" },
//   { id: 6, name: "Lan", position: "Thợ uốn tóc" },
// ];

// const days = ["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7", "Chủ nhật"];

// const shifts = {
//   morning: "Ca sáng (8:00 - 13:00)",
//   afternoon: "Ca chiều (13:00 - 18:00)",
//   evening: "Ca tối (18:00 - 22:00)",
// };

// // Sample schedule data
// const initialSchedule = {
//   1: {
//     "Thứ 2": ["morning", "afternoon"],
//     "Thứ 3": ["morning", "afternoon"],
//     "Thứ 4": ["morning"],
//     "Thứ 5": ["morning", "afternoon"],
//     "Thứ 6": ["morning", "afternoon"],
//     "Thứ 7": [],
//     "Chủ nhật": [],
//   },
//   2: {
//     "Thứ 2": ["morning"],
//     "Thứ 3": ["morning", "afternoon"],
//     "Thứ 4": ["morning", "afternoon"],
//     "Thứ 5": ["morning"],
//     "Thứ 6": ["morning", "afternoon"],
//     "Thứ 7": ["morning"],
//     "Chủ nhật": [],
//   },
//   3: {
//     "Thứ 2": [],
//     "Thứ 3": [],
//     "Thứ 4": ["afternoon", "evening"],
//     "Thứ 5": ["afternoon", "evening"],
//     "Thứ 6": ["afternoon", "evening"],
//     "Thứ 7": ["morning", "afternoon"],
//     "Chủ nhật": ["morning"],
//   },
//   4: {
//     "Thứ 2": ["afternoon", "evening"],
//     "Thứ 3": ["afternoon", "evening"],
//     "Thứ 4": [],
//     "Thứ 5": ["afternoon", "evening"],
//     "Thứ 6": ["afternoon"],
//     "Thứ 7": ["afternoon", "evening"],
//     "Chủ nhật": ["afternoon"],
//   },
//   5: {
//     "Thứ 2": ["morning"],
//     "Thứ 3": ["morning"],
//     "Thứ 4": ["morning", "afternoon"],
//     "Thứ 5": ["morning"],
//     "Thứ 6": ["morning"],
//     "Thứ 7": ["morning", "afternoon", "evening"],
//     "Chủ nhật": ["morning", "afternoon"],
//   },
//   6: {
//     "Thứ 2": ["afternoon"],
//     "Thứ 3": ["afternoon"],
//     "Thứ 4": ["afternoon"],
//     "Thứ 5": ["afternoon"],
//     "Thứ 6": ["afternoon", "evening"],
//     "Thứ 7": ["evening"],
//     "Chủ nhật": ["evening"],
//   },
// };

// export function WorkScheduleCalendar() {
//   const [schedule, setSchedule] = useState(initialSchedule);

//   const toggleShift = (employeeId, day, shift) => {
//     setSchedule((prev) => {
//       const employeeSchedule = { ...prev[employeeId] };
//       const dayShifts = [...(employeeSchedule[day] || [])];

//       if (dayShifts.includes(shift)) {
//         // Remove shift
//         const index = dayShifts.indexOf(shift);
//         dayShifts.splice(index, 1);
//       } else {
//         // Add shift
//         dayShifts.push(shift);
//       }

//       employeeSchedule[day] = dayShifts;

//       return {
//         ...prev,
//         [employeeId]: employeeSchedule,
//       };
//     });
//   };

//   const getShiftColor = (shift) => {
//     switch (shift) {
//       case "morning":
//         return "bg-blue-100 text-blue-800 hover:bg-blue-200";
//       case "afternoon":
//         return "bg-green-100 text-green-800 hover:bg-green-200";
//       case "evening":
//         return "bg-purple-100 text-purple-800 hover:bg-purple-200";
//       default:
//         return "bg-gray-100 text-gray-800 hover:bg-gray-200";
//     }
//   };

//   return (
//     <div className="space-y-4">
//       <div className="flex flex-wrap gap-2">
//         {Object.entries(shifts).map(([key, label]) => (
//           <Badge key={key} variant="outline" className={getShiftColor(key)}>
//             {label}
//           </Badge>
//         ))}
//       </div>

//       <div className="rounded-md border overflow-auto">
//         <Table>
//           <TableHeader>
//             <TableRow>
//               <TableHead className="min-w-[150px]">Nhân viên</TableHead>
//               {days.map((day) => (
//                 <TableHead key={day} className="min-w-[130px]">
//                   {day}
//                 </TableHead>
//               ))}
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {employees.map((employee) => (
//               <TableRow key={employee.id}>
//                 <TableCell>
//                   <div className="flex items-center gap-3">
//                     <Avatar className="h-8 w-8">
//                       <AvatarFallback>{employee.name.charAt(0)}</AvatarFallback>
//                     </Avatar>
//                     <div>
//                       <div className="font-medium">{employee.name}</div>
//                       <div className="text-xs text-muted-foreground">
//                         {employee.position}
//                       </div>
//                     </div>
//                   </div>
//                 </TableCell>

//                 {days.map((day) => (
//                   <TableCell key={day} className="p-2">
//                     <div className="flex flex-col gap-1">
//                       {["morning", "afternoon", "evening"].map((shift) => {
//                         const isActive =
//                           schedule[employee.id]?.[day]?.includes(shift);
//                         return (
//                           <div
//                             key={shift}
//                             className={`cursor-pointer rounded px-2 py-1 text-xs transition-colors ${
//                               isActive
//                                 ? getShiftColor(shift)
//                                 : "bg-muted/40 text-muted-foreground hover:bg-muted"
//                             }`}
//                             onClick={() => toggleShift(employee.id, day, shift)}
//                           >
//                             {shift === "morning" && "Sáng"}
//                             {shift === "afternoon" && "Chiều"}
//                             {shift === "evening" && "Tối"}
//                           </div>
//                         );
//                       })}
//                     </div>
//                   </TableCell>
//                 ))}
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </div>

//       <div className="text-sm text-muted-foreground">
//         Nhấp vào các ô để thêm hoặc xóa ca làm việc
//       </div>
//     </div>
//   );
// }
