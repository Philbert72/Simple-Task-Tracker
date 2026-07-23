<script setup>
import { ref } from 'vue'

const emit = defineEmits(['create'])

const title = ref('')
const description = ref('')
const dueDate = ref('')
const error = ref('')

function onSubmit() {
  if (!title.value.trim()) {
    error.value = 'Title is required.'
    return
  }
  error.value = ''
  emit('create', {
    title: title.value.trim(),
    description: description.value.trim(),
    due_date: dueDate.value || null,
  })
  title.value = ''
  description.value = ''
  dueDate.value = ''
}
</script>

<template>
  <form
    @submit.prevent="onSubmit"
    class="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
  >
    <div class="flex flex-col gap-3 sm:flex-row">
      <input
        v-model="title"
        type="text"
        placeholder="Task title"
        class="flex-1 rounded-md border border-slate-300 px-3 py-2 text-sm transition-colors duration-150 placeholder:text-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      <input
        v-model="description"
        type="text"
        placeholder="Description (optional)"
        class="flex-1 rounded-md border border-slate-300 px-3 py-2 text-sm transition-colors duration-150 placeholder:text-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      <input
        v-model="dueDate"
        type="date"
        aria-label="Due date (optional)"
        class="rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-600 transition-colors duration-150 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      <button
        type="submit"
        class="flex items-center justify-center gap-1.5 rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors duration-150 hover:bg-indigo-700 active:bg-indigo-800"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="size-4">
          <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" />
        </svg>
        Add Task
      </button>
    </div>
    <p v-if="error" class="text-sm text-red-600">{{ error }}</p>
  </form>
</template>
