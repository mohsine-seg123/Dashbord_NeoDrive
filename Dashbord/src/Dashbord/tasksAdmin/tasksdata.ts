import type { Task } from "../../Interfaces/KanbanBordtype";

export const INITIAL_TASKS: Task[] = [
  {
    id: "1",
    description: "Review and approve newly submitted car listings",
    status: "TODO",
  },
  {
    id: "2",
    description: "Update featured vehicles section on homepage",
    status: "TODO",
  },
  {
    id: "3",
    description: "Respond to pending customer inquiries",
    status: "TODO",
  },
  {
    id: "4",
    description: "Verify customer payment confirmations",
    status: "IN_PROGRESS",
  },
  {
    id: "5",
    description: "Coordinate with dealers for inventory updates",
    status: "IN_PROGRESS",
  },
  {
    id: "6",
    description: "Resolve reported issues on vehicle listings",
    status: "IN_PROGRESS",
  },
  {
    id: "7",
    description: "Generate monthly sales performance report",
    status: "Done",
  },
  {
    id: "8",
    description: "Archive sold vehicles from active listings",
    status: "Done",
  },
];