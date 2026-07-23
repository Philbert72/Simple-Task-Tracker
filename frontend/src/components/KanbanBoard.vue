<script setup>
import { computed } from 'vue'
import { STATUSES } from '../useTasks'
import TaskCard from './TaskCard.vue'

const props = defineProps({
  tasks: { type: Array, required: true },
})

const emit = defineEmits(['change-status', 'change-due-date', 'delete'])

const columnStyles = {
  Todo: { border: 'border-t-slate-400', tint: 'bg-slate-100/70', dot: 'bg-slate-400', count: 'text-slate-500' },
  'In Progress': { border: 'border-t-amber-400', tint: 'bg-amber-50/70', dot: 'bg-amber-400', count: 'text-amber-600' },
  Done: { border: 'border-t-emerald-400', tint: 'bg-emerald-50/70', dot: 'bg-emerald-400', count: 'text-emerald-600' },
}

const columns = computed(() =>
  STATUSES.map((status) => ({
    status,
    tasks: props.tasks.filter((task) => task.status === status),
  })),
)
</script>

<template>
  <div class="grid grid-cols-1 gap-4 md:grid-cols-3 md:items-start">
    <section
      v-for="column in columns"
      :key="column.status"
      class="flex flex-col gap-3 rounded-xl border-t-4 p-3"
      :class="[columnStyles[column.status].border, columnStyles[column.status].tint]"
    >
      <header class="flex items-center justify-between px-1">
        <h2 class="flex items-center gap-2 text-xs font-bold tracking-wide text-slate-500 uppercase">
          <span class="size-1.5 rounded-full" :class="columnStyles[column.status].dot" />
          {{ column.status }}
        </h2>
        <span class="rounded-full bg-white px-2 py-0.5 text-xs font-semibold" :class="columnStyles[column.status].count">
          {{ column.tasks.length }}
        </span>
      </header>

      <TransitionGroup tag="div" name="task" class="relative flex min-h-16 flex-col gap-2">
        <TaskCard
          v-for="task in column.tasks"
          :key="task.id"
          :task="task"
          @change-status="(status) => emit('change-status', task, status)"
          @change-due-date="(dueDate) => emit('change-due-date', task, dueDate)"
          @delete="emit('delete', task)"
        />
      </TransitionGroup>
      <p v-if="!column.tasks.length" class="py-4 text-center text-xs text-slate-400">No tasks</p>
    </section>
  </div>
</template>
