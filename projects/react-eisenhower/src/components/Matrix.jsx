import { useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const QUADRANTS = [
  { id: "urgent-important", label: "Urgente e importante" },
  { id: "not-urgent-important", label: "No urgente e importante" },
  { id: "urgent-not-important", label: "Urgente y no importante" },
  { id: "not-urgent-not-important", label: "No urgente y no importante" },
];

const initialTasks = [
  { id: 1, text: "Tarea 1", quadrant: "urgent-important" },
  { id: 2, text: "Tarea 2", quadrant: "not-urgent-important" },
  { id: 3, text: "Tarea 3", quadrant: "urgent-not-important" },
  { id: 4, text: "Tarea 4", quadrant: "not-urgent-not-important" },
];

/**
 * Draggable task card component.
 */
function TaskCard({ task }) {
  const [{ isDragging }, drag] = useDrag({
    type: "TASK",
    item: { id: task.id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  return (
    <div
      ref={drag}
      className={`rounded bg-white text-black px-2 py-1 mb-2 shadow cursor-move ${isDragging ? "opacity-50" : ""}`}
      style={{ fontSize: "1rem" }}
    >
      {task.text}
    </div>
  );
}

/**
 * Droppable quadrant component.
 */
function Quadrant({ quadrant, tasks, onDropTask }) {
  const [, drop] = useDrop({
    accept: "TASK",
    drop: (item) => onDropTask(item.id, quadrant.id),
  });
  return (
    <div
      ref={drop}
      className="flex-1 min-h-[150px] bg-gray-800 rounded-lg p-3 m-2 flex flex-col"
    >
      <h2 className="text-lg font-bold text-white mb-2 text-center">{quadrant.label}</h2>
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
}

/**
 * Eisenhower Matrix with drag-and-drop for tasks.
 */
export default function Matrix() {
  const [tasks, setTasks] = useState(initialTasks);

  // Move task to new quadrant
  const handleDropTask = (taskId, newQuadrant) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, quadrant: newQuadrant } : t))
    );
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="w-full max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
        {QUADRANTS.map((q) => (
          <Quadrant
            key={q.id}
            quadrant={q}
            tasks={tasks.filter((t) => t.quadrant === q.id)}
            onDropTask={handleDropTask}
          />
        ))}
      </div>
    </DndProvider>
  );
}