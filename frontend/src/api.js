import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8000',
})

export const fetchTasks = () => api.get('/tasks').then((res) => res.data)

export const createTask = (task) => api.post('/tasks', task).then((res) => res.data)

export const updateTask = (id, task) => api.put(`/tasks/${id}`, task).then((res) => res.data)

export const deleteTask = (id) => api.delete(`/tasks/${id}`)
