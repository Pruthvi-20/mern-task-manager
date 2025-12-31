import api from "./index";

// export const fetchTasks = () => api.get("/tasks");
export const fetchTasks = (filters = {}) => api.get("/tasks", { params: filters });
export const createTask = (data) => api.post("/tasks", data);
export const updateTask = (id, data) => api.put(`/tasks/${id}`, data);
export const deleteTask = (id) => api.delete(`/tasks/${id}`);