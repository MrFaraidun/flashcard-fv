import { useState } from "react";
import { RiDeleteBack2Fill } from "react-icons/ri";

const TodoGuest = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");

  const addTask = (e) => {
    e.preventDefault();
    if (!input) return;

    const newTask = { id: Date.now(), task: input, completed: false };

    setTasks((prevTasks) => [...prevTasks, newTask]);
    setInput("");
  };

  const removeTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  };

  const toggleComplete = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const incompleteTasks = tasks.filter((task) => !task.completed);
  const completeTasks = tasks.filter((task) => task.completed);

  return (
    <div className="flex items-center justify-center min-h-screen mt-6 bg-[#1F2937]">
      <div className="w-full h-full max-w-md bg-[#131c30] shadow-lg rounded-2xl p-6">
        <h1 className="text-2xl font-bold text-[#facc15] mb-4">To-Do List</h1>

        <form onSubmit={addTask} className="flex gap-2 mb-4">
          <input
            type="text"
            className="flex-1 p-2 rounded-lg bg-[#06081fe0] text-white placeholder-[#8b8f91] focus:outline-none"
            placeholder="Add a new task..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            type="submit"
            className="bg-[#f59e0b] hover:bg-[#fbbf24] text-white p-2 rounded-lg disabled:opacity-50"
          >
            +
          </button>
        </form>

        {completeTasks.length > 0 && (
          <>
            <h2 className="text-xl font-bold text-[#facc15] mt-6 mb-2">
              Completed
            </h2>
            <ul className="space-y-2">
              {completeTasks.map((task) => (
                <TaskItemGuest
                  key={task.id}
                  task={task}
                  removeTask={removeTask}
                  toggleComplete={toggleComplete}
                />
              ))}
            </ul>
          </>
        )}

        {incompleteTasks.length > 0 && (
          <>
            <h2 className="text-xl font-bold text-[#facc15] mt-6 mb-2">
              Incomplete
            </h2>
            <ul className="space-y-2">
              {incompleteTasks.map((task) => (
                <TaskItemGuest
                  key={task.id}
                  task={task}
                  removeTask={removeTask}
                  toggleComplete={toggleComplete}
                />
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
};

const TaskItemGuest = ({ task, removeTask, toggleComplete }) => {
  return (
    <li className="flex justify-between items-center max-w-md bg-[#06081fe0] break-words flex-1 text-white p-4 rounded-lg">
      <span className="flex-col">
        <div className="flex items-center justify-start text-xl">
          <input
            type="checkbox"
            className="w-5 h-5 accent-[#f59e0b] rounded-md hover:scale-110 focus:ring-[#f59e0b] focus:ring-2 cursor-pointer transition-transform duration-200 ease-in-out mx-2 mt-2"
            checked={task.completed}
            onChange={() => toggleComplete(task.id)}
          />
          <span
            className={`${task.completed ? "line-through text-gray-400" : ""}`}
          >
            {task.task}
          </span>
        </div>
      </span>
      <div className="ml-2">
        <button
          onClick={() => removeTask(task.id)}
          className="text-white hover:text-[#f59e0b]"
        >
          <RiDeleteBack2Fill className="w-6 h-6" />
        </button>
      </div>
    </li>
  );
};

export default TodoGuest;
