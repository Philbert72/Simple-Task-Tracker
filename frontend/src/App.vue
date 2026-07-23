<script setup>
import { onMounted } from 'vue'
import TaskForm from './components/TaskForm.vue'
import KanbanBoard from './components/KanbanBoard.vue'
import { useTasks } from './useTasks'

const { tasks, loading, error, load, add, changeStatus, changeDueDate, remove } = useTasks()

onMounted(load)
</script>

<template>
  <div class="min-h-screen bg-slate-50 px-4 py-10">
    <div class="mx-auto flex max-w-5xl flex-col gap-6">
      <header class="flex items-center gap-3">
        <div class="flex size-10 shrink-0 items-center justify-center rounded-xl bg-indigo-600 text-white">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="size-5">
            <path
              fill-rule="evenodd"
              d="M6.75 2.5a.75.75 0 0 0-.75.75V4h-1A2.25 2.25 0 0 0 2.75 6.25v9A2.25 2.25 0 0 0 5 17.5h10a2.25 2.25 0 0 0 2.25-2.25v-9A2.25 2.25 0 0 0 15 4h-1v-.75a.75.75 0 0 0-1.5 0V4h-5v-.75a.75.75 0 0 0-.75-.75Zm7.03 6.53a.75.75 0 0 0-1.06-1.06L9 11.69l-1.72-1.72a.75.75 0 1 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.06 0l4.25-4.25Z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
        <div>
          <h1 class="text-2xl font-semibold text-slate-900">Task Tracker</h1>
          <p class="text-sm text-slate-500">A simple board for tracking tasks from creation to done.</p>
        </div>
      </header>

      <TaskForm @create="add" />

      <div v-if="error" class="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="size-5 shrink-0">
          <path
            fill-rule="evenodd"
            d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.63-1.516 2.63H3.72c-1.347 0-2.189-1.463-1.516-2.63L8.485 2.495ZM10 5a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-3.5A.75.75 0 0 1 10 5Zm0 8a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
            clip-rule="evenodd"
          />
        </svg>
        {{ error }}
      </div>

      <div v-else-if="loading" class="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div v-for="i in 3" :key="i" class="flex animate-pulse flex-col gap-3 rounded-xl bg-slate-100/70 p-3">
          <div class="h-4 w-20 rounded bg-slate-200"></div>
          <div class="h-20 rounded-xl bg-white"></div>
          <div class="h-20 rounded-xl bg-white"></div>
        </div>
      </div>

      <KanbanBoard
        v-else
        :tasks="tasks"
        @change-status="(task, status) => changeStatus(task, status)"
        @change-due-date="(task, dueDate) => changeDueDate(task, dueDate)"
        @delete="remove"
      />
    </div>
  </div>
</template>
