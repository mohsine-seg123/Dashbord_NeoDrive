import type { JSX } from "react";
import { useState } from "react";
import { DndContext, DragOverlay } from "@dnd-kit/core";
import type { Task, Column as ColumnType } from "../Interfaces/KanbanBordtype";
import Column from "./tasksAdmin/Column";
import type {
  DragEndEvent,
  DragStartEvent,
  DragOverEvent,
} from "@dnd-kit/core";
import { INITIAL_TASKS } from "./tasksAdmin/tasksdata";
import confetti from "canvas-confetti";

const COLUMNS: ColumnType[] = [
  { id: "TODO", title: "To do" },
  { id: "IN_PROGRESS", title: "In progress" },
  { id: "Done", title: "Done" },
];

export default function TasksAdmin(): JSX.Element {
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [overId, setOverId] = useState<string | null>(null);

  function deleteTask(id: string) {
    setTasks((tasks) => tasks.filter((task) => task.id !== id));
  }

  function handleDragStart(event: DragStartEvent) {
    setActiveId(event.active.id as string);
  }

  function handleDragOver(event: DragOverEvent) {
    const { over } = event;
    setOverId(over ? (over.id as string) : null);
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (!over) {
      setActiveId(null);
      setOverId(null);
      return;
    }

    const taskId = active.id as string;
    const newStatus = over.id as Task["status"];

    setTasks(() =>
      tasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task,
      ),
    );

    if (newStatus === "Done") {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    }

    setActiveId(null);
    setOverId(null);
  }

  function handleDragCancel() {
    setActiveId(null);
    setOverId(null);
  }

  const activeTask = activeId
    ? tasks.find((task) => task.id === activeId)
    : null;

  return (
    <div className="w-full h-full flex flex-col gap-2 bg-white dark:bg-dark-surface-light p-4">
      <div className="text-xl pl-6 font-sans text-text dark:text-dark-text-primary">
        Tasks of the day
      </div>
      <div className="w-full gap-8 p-4 h-full rounded-lg shadow-inherit flex">
        <DndContext
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
          onDragCancel={handleDragCancel}
        >
          {COLUMNS.map((column) => {
            const isOver = overId === column.id;
            const isDragging = activeId !== null;

            return (
              <Column
                key={column.id}
                column={column}
                tasks={tasks.filter((task) => task.status === column.id)}
                setTasks={setTasks}
                deleteTask={deleteTask}
                isOver={isOver}
                isDragging={isDragging}
              />
            );
          })}

          <DragOverlay>
            {activeTask ? (
              <div className="bg-white dark:bg-dark-bg border-2 border-blue-500 rounded-lg p-4 shadow-2xl opacity-90 rotate-3 transform scale-105">
                <h3 className="font-semibold text-text dark:text-dark-text-primary">
                  {activeTask.title}
                </h3>
                <p className="text-sm text-text-muted dark:text-slate-400 mt-1">
                  {activeTask.description}
                </p>
              </div>
            ) : null}
          </DragOverlay>
        </DndContext>
      </div>
    </div>
  );
}
