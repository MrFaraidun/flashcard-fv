import { ImCheckmark } from "react-icons/im";
import { MdEdit } from "react-icons/md";
import { RiDeleteBack2Fill } from "react-icons/ri";
import { useState, useEffect } from "react";
import { useUser } from "../components/UserContext";
import { createTask, getTodos, updateTodo, deleteTodo } from "../api/apiTodo";
import { formatDistanceToNow } from "date-fns";

const Todo = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const [editId, setEditId] = useState(null); // Changed from editIndex to editId
  const [editInput, setEditInput] = useState("");
  const { userData } = useUser();

  useEffect(() => {
    const fetchTodos = async () => {
      const todos = await getTodos();
      if (todos) setTasks(todos);
    };
    fetchTodos();
  }, []);

  const addTask = async (e) => {
    e.preventDefault();
    if (!input) return;

    try {
      const newTask = await createTask(userData.UserID, input);
      setTasks([...tasks, newTask]);
      setInput("");
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  const removeTask = async (id) => {
    try {
      await deleteTodo(id);
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const editTask = (id) => {
    setEditId(id);
    const taskToEdit = tasks.find((task) => task.id === id);
    setEditInput(taskToEdit.task);
  };

  const saveEditedTask = async (id) => {
    try {
      const updatedTask = tasks.find((task) => task.id === id);
      updatedTask.task = editInput; // This updates the variable, but we need to trigger a re-render

      await updateTodo(id, { task: editInput }); // Ensure API receives correct format

      setTasks([...tasks]); // Force state update by spreading the array
      setEditId(null);
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const toggleComplete = async (taskId, currentStatus) => {
    try {
      const newStatus = !currentStatus;
      await updateTodo(taskId, { completed: newStatus });

      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === taskId ? { ...task, completed: newStatus } : task
        )
      );
    } catch (error) {
      console.error("Error updating task:", error);
    }
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
                <TaskItem
                  key={task.id}
                  task={task}
                  editId={editId}
                  editInput={editInput}
                  setEditId={setEditId}
                  setEditInput={setEditInput}
                  saveEditedTask={saveEditedTask}
                  toggleComplete={toggleComplete}
                  removeTask={removeTask}
                  editTask={editTask}
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
                <TaskItem
                  key={task.id}
                  task={task}
                  editId={editId}
                  editInput={editInput}
                  setEditId={setEditId}
                  setEditInput={setEditInput}
                  saveEditedTask={saveEditedTask}
                  toggleComplete={toggleComplete}
                  removeTask={removeTask}
                  editTask={editTask}
                />
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
};

const TaskItem = ({
  task,
  editId,
  editInput,
  setEditId,
  setEditInput,
  saveEditedTask,
  toggleComplete,
  removeTask,
  editTask,
}) => {
  const shortenTimeText = (timeString) => {
    return timeString
      .replace("less than a minute", "just now")
      .replace("about a minute", "1 min")
      .replace(" minutes", " min")
      .replace(" minute", " min")
      .replace(" seconds", " sec")
      .replace(" second", " sec")
      .replace(" days", " d")
      .replace(" day", " d")
      .replace(" months", " mo")
      .replace(" month", " mo")
      .replace(" years", " y")
      .replace(" year", " y");
  };

  const createdAt = new Date(task.createdat);
  const updatedAt = new Date(task.updatedat);

  return (
    <li className="flex justify-between items-center max-w-md bg-[#06081fe0] break-words flex-1 text-white p-4 rounded-lg">
      {editId === task.id ? (
        <input
          type="text"
          className="flex-1 p-1 rounded-lg bg-[#1e293b] text-white focus:outline-none"
          value={editInput}
          onChange={(e) => setEditInput(e.target.value)}
        />
      ) : (
        <span className="flex-col">
          <div className="flex items-center justify-start text-xl">
            <input
              type="checkbox"
              className="w-5 h-5 accent-[#f59e0b] rounded-md hover:scale-110 focus:ring-[#f59e0b] focus:ring-2 cursor-pointer transition-transform duration-200 ease-in-out mx-2 mt-2"
              checked={task.completed}
              onChange={() => toggleComplete(task.id, task.completed)}
            />
            <span
              className={`${
                task.completed ? "line-through text-gray-400" : ""
              }`}
            >
              {task.task}
            </span>
          </div>

          <div className="ml-10 text-sm text-gray-400">
            {createdAt && (
              <p>Created: {shortenTimeText(formatDistanceToNow(createdAt))}</p>
            )}
            {updatedAt && (
              <p>Updated: {shortenTimeText(formatDistanceToNow(updatedAt))}</p>
            )}
          </div>
        </span>
      )}
      <div className="ml-2">
        {editId === task.id ? (
          <button
            onClick={() => saveEditedTask(task.id)}
            className="text-white hover:text-[#f59e0b]"
          >
            <ImCheckmark />
          </button>
        ) : (
          <div className="flex space-x-4">
            <button
              onClick={() => editTask(task.id)}
              className="text-white hover:text-[#f59e0b]"
            >
              <MdEdit className="w-6 h-6" />
            </button>
            <button
              onClick={() => removeTask(task.id)}
              className="text-white hover:text-[#f59e0b]"
            >
              <RiDeleteBack2Fill className="w-6 h-6" />
            </button>
          </div>
        )}
      </div>
    </li>
  );
};

export default Todo;
