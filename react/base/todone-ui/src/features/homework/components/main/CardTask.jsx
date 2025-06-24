import { useDraggable } from "@dnd-kit/core";

export const CardTask = ({ task }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
  });

  const style = transform
    ? {
        transform: `translate(${transform.x}px, ${transform.y}px)`,
      }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className="cursor-grab rounded-lg bg-white p-4 shadow-sm hover:shadow-md"
      style={style}
    >
      <h3 className="font-medium text-black-400">{task.title}</h3>
      <p className="mt-2 text-sm text-black-100">{task.description}</p>
    </div>
  );
};
