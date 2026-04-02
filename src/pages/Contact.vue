<template>
  <div class="page-enter pt-48 pb-40 px-8 md:px-16 max-w-screen-xl mx-auto min-h-screen">
    <div class="flex items-center gap-5 mb-16">
      <div class="w-px h-7 bg-white/30" />
      <span class="font-light text-[1.2rem] tracking-[0.35em] text-white/70 uppercase">Contact</span>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-24">
      <div>
        <h1 class="brand-logo-styled text-6xl mb-12">Get in Touch</h1>
        <p class="text-gray-400 font-light tracking-widest leading-loose mb-12">
          「Libera」の世界観や、記録された雫についてのご質問、<br />
          あるいは共鳴する何かを感じた方は、こちらからご連絡ください。
        </p>
        
        <div class="space-y-8">
          <div>
            <div class="text-[10px] tracking-[0.5em] text-white/30 uppercase mb-2">Email</div>
            <div class="text-white font-light tracking-widest">info@libera-y.com</div>
          </div>
        </div>
      </div>

      <form class="space-y-12" @submit.prevent>
        <div class="space-y-2">
          <label class="text-[10px] tracking-[0.5em] text-white/30 uppercase">Name</label>
          <input 
            type="text" 
            class="w-full bg-transparent border-b border-white/10 py-4 text-white font-light tracking-widest focus:outline-none focus:border-white/40 transition-colors"
          />
        </div>
        <div class="space-y-2">
          <label class="text-[10px] tracking-[0.5em] text-white/30 uppercase">Email</label>
          <input 
            type="email" 
            class="w-full bg-transparent border-b border-white/10 py-4 text-white font-light tracking-widest focus:outline-none focus:border-white/40 transition-colors"
          />
        </div>
        <div class="space-y-2">
          <label class="text-[10px] tracking-[0.5em] text-white/30 uppercase">Message</label>
          <textarea 
            rows="4"
            class="w-full bg-transparent border-b border-white/10 py-4 text-white font-light tracking-widest focus:outline-none focus:border-white/40 transition-colors resize-none"
          ></textarea>
        </div>
        <button class="contact-btn w-full py-6 uppercase tracking-[0.5em] text-[10px]">
          Send Message
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTitle } from '@vueuse/core'

useTitle('Contact | Libera')
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
