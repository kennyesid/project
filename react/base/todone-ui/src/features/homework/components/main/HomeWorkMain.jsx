import { useState } from "react";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { Column } from "./Column";

const COLUMNS = [
  { id: "TODO", title: "Hacer" },
  { id: "IN_PROGRESS", title: "En Progreso" },
  { id: "IN_TESTING", title: "Pruebas" },
  { id: "DONE", title: "Realizado" },
];

const INITIAL_TASKS = [
  {
    id: "1",
    title: "Research Project",
    description: "Gather requirements and create initial documentation",
    status: "TODO",
  },
  {
    id: "2",
    title: "Design System",
    description: "Create component library and design tokens",
    status: "TODO",
  },
  {
    id: "3",
    title: "API Integration",
    description: "Implement REST API endpoints",
    status: "IN_PROGRESS",
  },
  {
    id: "4",
    title: "Testing",
    description: "Write unit tests for core functionality",
    status: "DONE",
  },
];

export const HomeWorkMain = () => {
  const [tasks, setTasks] = useState(INITIAL_TASKS);

  function handleDragEnd(event) {
    const { active, over } = event;

    if (!over) return;

    const taskId = active.id;
    const newStatus = over.id;

    setTasks(() =>
      tasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              status: newStatus,
            }
          : task
      )
    );
  }

  return (
    <div className="">
      <h1 className="txt-main text-4xl font-bold mb-4 text-center">
        Tareas por Realizar
      </h1>
      <div className="flex gap-6">
        <DndContext onDragEnd={handleDragEnd}>
          {COLUMNS.map((column) => {
            return (
              <Column
                key={column.id}
                column={column}
                tasks={tasks.filter((task) => task.status === column.id)}
              />
            );
          })}
        </DndContext>
      </div>
    </div>
  );
};
