import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchTasks, createTask, deleteTask, updateTask } from "../api/taskApi";
import { TaskChart } from "../components/TaskChart";
import { ProfileCard } from "../components/ProfileCard";

export const Dashboard = () => {
    const navigate = useNavigate();
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState("");
    const [priority, setPriority] = useState("medium");
    const [dueDate, setDueDate] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [priorityFilter, setPriorityFilter] = useState("");
    const [editingId, setEditingId] = useState(null);
    const [editTitle, setEditTitle] = useState("");
    const [user, setUser] = useState(null);

    const formatDate = (date) =>
        new Date(date).toLocaleDateString("en-IN", { day: "numeric", month: "short" });

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login", { replace: true });
    };

    const loadTasks = async () => {
        const res = await fetchTasks({ status: statusFilter, priority: priorityFilter });
        setTasks(res.data);
    };

    const handleAdd = async () => {
        if (!title.trim()) return;
        await createTask({ title, priority, dueDate });
        setTitle("");
        setDueDate("");
        setPriority("medium");
        loadTasks();
    };

    const handleDelete = async (id) => {
        await deleteTask(id);
        loadTasks();
    };

    const toggleComplete = async (task) => {
        await updateTask(task._id, { completed: !task.completed });
        loadTasks();
    };

    const startEdit = (task) => {
        setEditingId(task._id);
        setEditTitle(task.title);
    };

    const saveEdit = async () => {
        await updateTask(editingId, { title: editTitle });
        setEditingId(null);
        loadTasks();
    };

    useEffect(() => {
        loadTasks();
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const payload = JSON.parse(atob(token.split(".")[1]));
                setUser({ firstName: payload.firstName, email: payload.email });
            } catch { }
        }
    }, [statusFilter, priorityFilter]);

    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-indigo-100 to-purple-100 p-4 md:p-6">
            <div className="w-full bg-white rounded-2xl shadow-xl p-4 md:p-6 grid grid-cols-1 md:grid-cols-4 gap-6">

                {/* LEFT */}
                <div className="md:col-span-3">

                    <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4 gap-3">
                        <h1 className="text-2xl font-bold text-indigo-600">Task Dashboard</h1>
                        <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition">
                            Logout
                        </button>
                    </div>

                    {user && (
                        <p className="text-gray-500 mb-4">
                            Welcome, <span className="font-semibold text-indigo-600">{user.firstName}</span> 👋
                        </p>
                    )}

                    {/* Filters */}
                    <div className="flex flex-wrap gap-3 mb-4">
                        <select onChange={(e) => setStatusFilter(e.target.value)} className="border px-3 py-2 rounded hover:ring transition">
                            <option value="">All</option>
                            <option value="completed">Completed</option>
                            <option value="pending">Pending</option>
                        </select>

                        <select onChange={(e) => setPriorityFilter(e.target.value)} className="border px-3 py-2 rounded hover:ring transition">
                            <option value="">All priorities</option>
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select>
                    </div>

                    {/* Add task */}
                    <div className="flex flex-wrap gap-3 mb-6">
                        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter task..." className="flex-1 min-w-[180px] px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-300 transition" />
                        <select value={priority} onChange={(e) => setPriority(e.target.value)} className="border px-3 py-2 rounded">
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select>
                        <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} className="border px-3 py-2 rounded" />
                        <button onClick={handleAdd} className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 active:scale-95 transition">
                            Add
                        </button>
                    </div>

                    {/* Task List */}
                    <div className="space-y-3">
                        {tasks.map(task => {
                            const overdue = task.dueDate && new Date(task.dueDate) < new Date() && !task.completed;
                            return (
                                <div key={task._id} className={`flex flex-col sm:flex-row justify-between sm:items-center p-3 rounded-lg shadow-sm transition hover:shadow-md ${task.completed ? "bg-green-50" : "bg-gray-50"}`}>
                                    <div className="flex flex-wrap items-center gap-3">
                                        <input type="checkbox" checked={task.completed} onChange={() => toggleComplete(task)} />
                                        {editingId === task._id ? (
                                            <input value={editTitle} onChange={(e) => setEditTitle(e.target.value)} className="border px-2 py-1 rounded" />
                                        ) : (
                                            <span className={`${task.completed ? "line-through text-gray-400" : "text-gray-800"}`}>{task.title}</span>
                                        )}
                                        <span className="text-xs px-2 py-1 rounded bg-indigo-100">{task.priority}</span>
                                        {task.dueDate && <span className="text-xs text-gray-500">📅 {formatDate(task.dueDate)}</span>}
                                        {overdue && <span className="text-xs text-red-500 font-semibold">Overdue</span>}
                                    </div>

                                    <div className="flex gap-2 mt-2 sm:mt-0">
                                        {editingId === task._id ? (
                                            <button onClick={saveEdit} className="text-green-600 hover:scale-110 transition">💾</button>
                                        ) : (
                                            <button onClick={() => startEdit(task)} className="text-blue-600 hover:scale-110 transition">✏️</button>
                                        )}
                                        <button onClick={() => handleDelete(task._id)} className="text-red-500 hover:scale-110 transition">❌</button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* RIGHT */}
                <div className="flex flex-col gap-4">
                    <ProfileCard user={user} />
                    <TaskChart tasks={tasks} />
                </div>

            </div>
        </div>
    );
};
