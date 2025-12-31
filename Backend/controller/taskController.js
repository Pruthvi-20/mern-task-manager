import Task from "../models/Task.js";

/**
 * CREATE Task
 * POST /api/tasks
 */
export const createTask = async (req, res) => {
    try {
        const { title, description, dueDate } = req.body;

        if (!title) {
            return res.status(400).json({ message: "Title is required" });
        }

        const task = await Task.create({
            title,
            description,
            dueDate: dueDate || null,
            user: req.userId
        });

        res.status(201).json(task);

    } catch (error) {
        console.error("CREATE TASK ERROR:", error);
        res.status(500).json({ message: "Failed to create task" });
    }
};

/**
 * READ all tasks for logged-in user
 * GET /api/tasks
 */
// export const getTasks = async (req, res) => {
//     try {
//         const tasks = await Task.find({ user: req.userId }).sort({ createdAt: -1 });
//         res.json(tasks);

//     } catch (error) {
//         console.error("GET TASKS ERROR:", error);
//         res.status(500).json({ message: "Failed to fetch tasks" });
//     }
// };

/**
 * UPDATE task
 * PUT /api/tasks/:id
 */
export const updateTask = async (req, res) => {
    try {
        const { title, completed, description, dueDate } = req.body;

        const task = await Task.findOneAndUpdate(
            { _id: req.params.id, user: req.userId },
            { title, completed, description, dueDate },
            { new: true }
        );

        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        res.json(task);

    } catch (error) {
        console.error("UPDATE TASK ERROR:", error);
        res.status(500).json({ message: "Failed to update task" });
    }
};

/**
 * DELETE task
 * DELETE /api/tasks/:id
 */
export const deleteTask = async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.userId });

        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        res.json({ message: "Task deleted successfully" });

    } catch (error) {
        console.error("DELETE TASK ERROR:", error);
        res.status(500).json({ message: "Failed to delete task" });
    }
};

export const getTasks = async (req, res) => {
    try {
        const { status, priority } = req.query;

        let filter = { user: req.userId };

        if (status === "completed") filter.completed = true;
        if (status === "pending") filter.completed = false;
        if (priority) filter.priority = priority;

        const tasks = await Task.find(filter).sort({ dueDate: 1, createdAt: -1 });
        res.json(tasks);

    } catch (error) {
        console.error("GET TASKS ERROR:", error);
        res.status(500).json({ message: "Failed to fetch tasks" });
    }
};