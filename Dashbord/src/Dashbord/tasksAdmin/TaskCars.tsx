import { useDraggable } from "@dnd-kit/core";
import type { Task } from "../../Interfaces/KanbanBordtype";
import { MdDeleteForever } from "react-icons/md";
import type { JSX } from "react";

export default function TaskCard({
  task,
  deleteTask,
}: {
  task: Task;
  deleteTask: (id: string) => void;
}): JSX.Element {

  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: task.id,
    });

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    opacity: isDragging ? 0.3 : 1,
    cursor: isDragging ? "grabbing" : "grab",
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`
        w-full border flex justify-between z-40 h-auto rounded-lg p-2 
        bg-white dark:bg-dark-surface-light 
        text-text dark:text-dark-text-primary
        transition-all duration-200
        hover:shadow-lg hover:scale-[1.02]
        ${isDragging ? "shadow-2xl ring-2 ring-primary-hover rotate-2 scale-105" : "shadow-md"}
      `}
    >
      {task.description}
      <MdDeleteForever
        onPointerDown={(e) => e.stopPropagation()}
        onClick={(e) => {
          e.stopPropagation();
          deleteTask(task.id);
        }}
        className="text-2xl text-primary-hover dark:text-white hover:font-bold ml-2 flex-shrink-0"
      />
    </div>
  );
}
