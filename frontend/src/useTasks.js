import { ref } from 'vue'
import { createTask, deleteTask, fetchTasks, updateTask } from './api'

export const STATUSES = ['Todo', 'In Progress', 'Done']

export function useTasks() {
  const tasks = ref([])
  const loading = ref(false)
  const error = ref('')

  async function load() {
    loading.value = true
    error.value = ''
    try {
      tasks.value = await fetchTasks()
    } catch (err) {
      error.value = 'Failed to load tasks. Is the backend running?'
    } finally {
      loading.value = false
    }
  }

  async function add(task) {
    const created = await createTask(task)
    tasks.value.push(created)
  }

  async function changeStatus(task, status) {
    const updated = await updateTask(task.id, { status })
    const index = tasks.value.findIndex((t) => t.id === task.id)
    if (index !== -1) tasks.value[index] = updated
  }

  async function changeDueDate(task, due_date) {
    const updated = await updateTask(task.id, { due_date })
    const index = tasks.value.findIndex((t) => t.id === task.id)
    if (index !== -1) tasks.value[index] = updated
  }

  async function remove(task) {
    await deleteTask(task.id)
    tasks.value = tasks.value.filter((t) => t.id !== task.id)
  }

  return { tasks, loading, error, load, add, changeStatus, changeDueDate, remove }
}
