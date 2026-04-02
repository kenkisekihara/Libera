<template>
  <div class="page-enter pt-48 pb-40 px-8 md:px-16 max-w-screen-xl mx-auto min-h-screen flex flex-col items-center justify-center text-center">
    <div class="font-serif italic text-[clamp(6rem,15vw,12rem)] leading-[0.8] text-white/5 select-none pointer-events-none mb-8">
      404
    </div>
    <h1 class="text-3xl md:text-5xl font-light text-white tracking-widest leading-tight mb-6">Page Not Found</h1>
    <p class="text-gray-400 font-light tracking-widest leading-loose mb-16">
      お探しのページは見つかりませんでした。<br />
      URLが間違っているか、ページが移動または削除された可能性があります。
    </p>
    
    <router-link to="/" class="inline-block px-12 py-4 border border-white/60 text-[10px] tracking-[0.5em] uppercase text-white/90 hover:text-white hover:border-white transition-all duration-300">
      Back Home
    </router-link>
  </div>
</template>

<script setup lang="ts">
import { useTitle } from '@vueuse/core'

useTitle('404 Not Found | Libera')
</script>

<style scoped>
.page-enter {
  animation: fade-in 0.8s ease-out forwards;
}

@keyframes fade-in {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>