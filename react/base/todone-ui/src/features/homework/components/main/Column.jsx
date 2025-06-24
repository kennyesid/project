import { useDroppable } from "@dnd-kit/core";
import { CardTask } from "./CardTask";

export const Column = ({ column, tasks }) => {
  const { setNodeRef } = useDroppable({
    id: column.id,
  });

  return (
    // <div className="flex w-80 flex-col rounded-lg bg-neutral-800 p-4">    B4D7D8
    <div
      className="column-main flex w-full h-[87vh] flex-col rounded-xl p-4"
      style={{}}
    >
      <h2 className="mb-4 font-semibold text-neutral-100">{column.title}</h2>
      <div ref={setNodeRef} className="flex flex-1 flex-col gap-4">
        {tasks.map((task) => {
          return <CardTask key={task.id} task={task} />;
        })}
      </div>
    </div>
  );
};
