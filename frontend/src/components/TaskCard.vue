<script setup>
import { computed } from 'vue'
import { STATUSES } from '../useTasks'

const props = defineProps({
  task: { type: Object, required: true },
})

const emit = defineEmits(['change-status', 'change-due-date', 'delete'])

const todayISO = new Date().toISOString().slice(0, 10)

const isOverdue = computed(
  () => !!props.task.due_date && props.task.due_date < todayISO && props.task.status !== 'Done',
)

const shortLabels = { Todo: 'Todo', 'In Progress': 'Doing', Done: 'Done' }

const activeClasses = {
  Todo: 'bg-white text-slate-700 shadow-sm',
  'In Progress': 'bg-amber-100 text-amber-700 shadow-sm',
  Done: 'bg-emerald-100 text-emerald-700 shadow-sm',
}

function formatDueDate(value) {
  return new Date(`${value}T00:00:00`).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
  })
}
</script>

<template>
  <article
    class="group flex flex-col gap-2.5 rounded-xl border border-slate-200 bg-white p-3.5 shadow-sm transition-all duration-150 hover:-translate-y-0.5 hover:shadow-md"
    :class="{ 'opacity-70': task.status === 'Done' }"
  >
    <div class="flex items-start justify-between gap-2">
      <p
        class="text-sm font-medium text-slate-900 break-words"
        :class="{ 'line-through text-slate-400': task.status === 'Done' }"
      >
        {{ task.title }}
      </p>
      <button
        @click="emit('delete')"
        class="shrink-0 rounded-md p-1.5 text-slate-300 transition-opacity duration-150 hover:bg-red-50 hover:text-red-600 md:opacity-0 md:group-hover:opacity-100 md:focus-visible:opacity-100"
        title="Delete task"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="size-4">
          <path
            fill-rule="evenodd"
            d="M8.75 1A2.75 2.75 0 0 0 6 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 1 0 .23 1.482l.149-.022.841 10.518A2.75 2.75 0 0 0 7.596 19h4.807a2.75 2.75 0 0 0 2.742-2.53l.841-10.52.149.023a.75.75 0 0 0 .23-1.482A41.03 41.03 0 0 0 14 4.193V3.75A2.75 2.75 0 0 0 11.25 1h-2.5ZM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4ZM8.58 7.72a.75.75 0 0 0-1.5.06l.3 7.5a.75.75 0 1 0 1.5-.06l-.3-7.5Zm4.34.06a.75.75 0 1 0-1.5-.06l-.3 7.5a.75.75 0 1 0 1.5.06l.3-7.5Z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
    </div>

    <p v-if="task.description" class="text-xs leading-relaxed text-slate-500 break-words">
      {{ task.description }}
    </p>

    <div v-if="task.due_date" class="flex items-center gap-1 text-xs font-medium" :class="isOverdue ? 'text-red-600' : 'text-slate-400'">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="size-3.5 shrink-0">
        <path
          fill-rule="evenodd"
          d="M5.75 2a.75.75 0 0 1 .75.75V4h7V2.75a.75.75 0 0 1 1.5 0V4h.25A2.75 2.75 0 0 1 18 6.75v8.5A2.75 2.75 0 0 1 15.25 18H4.75A2.75 2.75 0 0 1 2 15.25v-8.5A2.75 2.75 0 0 1 4.75 4H5V2.75A.75.75 0 0 1 5.75 2Zm-1 5.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25v-6.5c0-.69-.56-1.25-1.25-1.25H4.75Z"
          clip-rule="evenodd"
        />
      </svg>
      {{ isOverdue ? 'Overdue' : 'Due' }} {{ formatDueDate(task.due_date) }}
    </div>

    <div class="mt-1 grid grid-cols-3 gap-1 rounded-lg bg-slate-100 p-1">
      <button
        v-for="status in STATUSES"
        :key="status"
        type="button"
        @click="emit('change-status', status)"
        :title="status"
        class="rounded-md px-1.5 py-1.5 text-[11px] font-semibold transition-colors duration-150"
        :class="task.status === status ? activeClasses[status] : 'text-slate-400 hover:text-slate-600'"
      >
        {{ shortLabels[status] }}
      </button>
    </div>

    <input
      type="date"
      :value="task.due_date ?? ''"
      @change="emit('change-due-date', $event.target.value || null)"
      aria-label="Due date"
      class="w-full rounded-md border-0 bg-slate-50 px-2 py-1.5 text-xs font-medium text-slate-500 transition-colors duration-150 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
    />
  </article>
</template>
