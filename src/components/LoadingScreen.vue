<template>
  <div class="fixed inset-0 z-[100] bg-bg flex flex-col items-center justify-center">
    <div class="relative w-64 h-64 flex items-center justify-center mb-12">
      <div class="absolute inset-0 border border-white/10 rounded-full animate-[spin_10s_linear_infinite]" />
      <div class="absolute inset-4 border border-white/20 rounded-full animate-[spin_7s_linear_infinite_reverse]" />
      <div class="absolute inset-8 border border-white/30 rounded-full animate-[spin_5s_linear_infinite]" />
      
      <div class="absolute inset-0 flex items-center justify-center">
        <div class="w-1 h-1 bg-white rounded-full shadow-[0_0_15px_rgba(255,255,255,0.8)] animate-pulse" />
      </div>
      
      <svg class="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
        <circle
          cx="50"
          cy="50"
          r="48"
          fill="none"
          stroke="rgba(255,255,255,0.5)"
          stroke-width="0.5"
          stroke-dasharray="301.59"
          :stroke-dashoffset="301.59 - (301.59 * progress) / 100"
          class="transition-all duration-300 ease-out"
          transform="rotate(-90 50 50)"
        />
      </svg>
    </div>

    <div class="text-center space-y-4">
      <h1 class="brand-logo-styled text-3xl tracking-widest text-white/90">Libera</h1>
      <div class="flex items-center justify-center gap-4">
        <div class="w-8 h-px bg-white/20" />
        <span class="text-[9px] tracking-[0.5em] text-white/40 uppercase font-light">
          {{ Math.round(progress) }}%
        </span>
        <div class="w-8 h-px bg-white/20" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const progress = ref(0)

onMounted(() => {
  const duration = 2000
  const interval = 20
  const steps = duration / interval
  const increment = 100 / steps

  const timer = setInterval(() => {
    progress.value = Math.min(progress.value + increment, 100)
    if (progress.value >= 100) {
      clearInterval(timer)
    }
  }, interval)
})
</script>
