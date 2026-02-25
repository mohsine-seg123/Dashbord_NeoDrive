import { useState, type JSX } from "react";
import type {Task ,Column as ColumnType } from "../../Interfaces/KanbanBordtype";
import TaskCard from "./TaskCars";
import { useDroppable } from "@dnd-kit/core";
import { IoIosAdd } from "react-icons/io";



export default function Column({
  column,
  tasks,
  setTasks,
  deleteTask,
  isOver,
  isDragging,
}: {
  column: ColumnType;
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  deleteTask: (id: string) => void;
  isOver: boolean;
  isDragging: boolean;
}): JSX.Element {

    
  const [forADD, setADD] = useState<boolean>(false);

  const { setNodeRef } = useDroppable({
    id: column.id,
  });

  const isTodo = column.id === "TODO";

  function changeForADD() {
    setADD(true);
  }

  const [newTask, setNewTask] = useState("");

  const addNewTask = () => {
    const desc = newTask.trim();
    if (!desc) return;

    const task: Task = {
      id: Date.now().toString(),
      description: desc,
      status: "TODO",
    };

    setTasks((prev) => [...prev, task]);
    setNewTask("");
    setADD(false);
  };

  return (
    <div className="w-full h-auto border transition-all duration-300 hover:cursor-pointer hover:-translate-y-1 dark:border-white border-primary dark:bg-dark-bg-secondary bg-surface-avbare bg-surface-available  rounded-lg shadow-inherit  flex flex-col gap-4 p-3">
      <h2 className="text-lg text-center font-sans text-text dark:text-dark-text-primary">
        {column.title}
      </h2>
      <div
        ref={setNodeRef}
        className={`w-full h-full rounded-lg shadow-inherit flex flex-col gap-4 transition-colors ${
          isOver
            ? "bg-blue-50/60 dark:bg-blue-950/30 ring-1 ring-blue-400"
            : isDragging
              ? "bg-black/5 dark:bg-white/5"
              : ""
        }`}
      >
        {tasks.map((task) => (
          <TaskCard key={task.id} deleteTask={deleteTask} task={task} />
        ))}
        {forADD && (
          <div className="mt-2 rounded-xl border border-dashed border-spacing-2 border-blue-700  bg-white/60 p-2
                  dark:bg-dark-surface-light dark:border-dark-text-primary">
    <div className="flex items-center gap-2">
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && addNewTask()}
        placeholder="Nouvelle tâche..."
        className="flex-1 bg-transparent px-3 py-2 text-sm outline-none
                   placeholder:text-gray-400 dark:text-dark-text-primary dark:bg-dark-surface-light"
      />

      <button
        type="button"
        onClick={addNewTask}
        disabled={!newTask.trim()}
        className="h-10 w-10 rounded-lg dark:bg-dark-bg bg-primary text-white grid place-items-center
                   hover:bg-primary-hover transition-colors
                   disabled:opacity-40 disabled:cursor-not-allowed"
        aria-label="Ajouter la tâche"
      >
        <IoIosAdd className="text-2xl" />
      </button>
    </div>
    </div>
        )}
      </div>

      {isTodo && (
        <div
          onClick={changeForADD}
          className="w-full mb-2 p-2 rounded-xl dark:bg-dark-border-light dark:text-dark-text-primary flex border border-primary justify-center border-dashed"
        >
          Add new Task{" "}
          <IoIosAdd className="text-2xl text-primary-hover dark:text-white hover:font-bold ml-2" />
        </div>
      )}
    </div>
  );
}