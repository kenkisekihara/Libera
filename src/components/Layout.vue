<template>
  <div class="min-h-screen bg-bg selection:bg-white/20">
    <div class="grain" />

    <nav 
      :class="[
        'fixed top-0 left-0 w-full z-50 px-6 md:px-16 transition-all duration-500 flex justify-between items-center',
        isScrolled ? 'bg-bg/85 backdrop-blur-md py-3 md:py-6' : 'bg-transparent py-5 md:py-10'
      ]"
    >
      <router-link to="/" class="flex flex-col group text-left">
        <span class="brand-logo-styled text-[2rem] md:text-[2.8rem]">Libera</span>
      </router-link>

      <!-- Desktop Menu -->
      <div class="hidden md:flex space-x-12 text-[10px] tracking-[0.5em] uppercase items-center font-medium">
        <div class="nav-item group">
          <span>Hobby</span>
          <ChevronDown :size="12" :stroke-width="1.5" />
          <div class="dropdown-menu">
            <router-link 
              v-for="cat in categories.Hobby" 
              :key="cat" 
              :to="`/category/${cat}`" 
              class="dropdown-link text-left"
              :style="cat === 'Mrs. GREEN APPLE' ? { textTransform: 'none' } : {}"
            >
              {{ cat }}
            </router-link>
          </div>
        </div>
        <div class="nav-item group">
          <span>Daily</span>
          <ChevronDown :size="12" :stroke-width="1.5" />
          <div class="dropdown-menu">
            <router-link 
              v-for="cat in categories.Daily" 
              :key="cat" 
              :to="`/category/${cat}`" 
              class="dropdown-link text-left"
            >
              {{ cat }}
            </router-link>
          </div>
        </div>
        <div class="pl-12 relative flex items-center">
          <router-link to="/contact" class="contact-btn uppercase">
            Contact
          </router-link>
        </div>
      </div>

      <!-- Mobile Menu Toggle -->
      <button 
        @click="isMenuOpen = !isMenuOpen"
        class="md:hidden text-white/60 hover:text-white transition-colors p-2"
      >
        <X v-if="isMenuOpen" :size="24" :stroke-width="1.5" />
        <Menu v-else :size="24" :stroke-width="1.5" />
      </button>
    </nav>

    <!-- Mobile Menu Overlay -->
    <transition name="slide-right">
      <div
        v-if="isMenuOpen"
        class="fixed inset-0 z-40 bg-bg pt-32 px-8 flex flex-col"
      >
        <div class="space-y-12">
          <div>
            <div class="text-[10px] tracking-[0.5em] text-white/30 uppercase mb-6">Hobby</div>
            <div class="grid grid-cols-1 gap-4">
              <router-link 
                v-for="cat in categories.Hobby" 
                :key="cat" 
                :to="`/category/${cat}`" 
                class="text-lg font-light tracking-widest text-white/80 hover:text-white transition-colors"
                @click="isMenuOpen = false"
              >
                {{ cat }}
              </router-link>
            </div>
          </div>
          <div>
            <div class="text-[10px] tracking-[0.5em] text-white/30 uppercase mb-6">Daily</div>
            <div class="grid grid-cols-1 gap-4">
              <router-link 
                v-for="cat in categories.Daily" 
                :key="cat" 
                :to="`/category/${cat}`" 
                class="text-lg font-light tracking-widest text-white/80 hover:text-white transition-colors"
                @click="isMenuOpen = false"
              >
                {{ cat }}
              </router-link>
            </div>
          </div>
          <div class="pt-8 border-t border-white/5">
            <router-link to="/contact" class="text-lg font-light tracking-[0.3em] text-white uppercase" @click="isMenuOpen = false">
              Contact
            </router-link>
          </div>
        </div>
      </div>
    </transition>

    <main><slot /></main>

    <footer class="py-40 text-center flex flex-col items-center">
      <router-link to="/" class="brand-logo-styled text-4xl mb-8 opacity-60 cursor-pointer">Libera</router-link>
      <p class="text-[7px] text-gray-700 tracking-[1.2em] uppercase">© 2026 LIBERA.</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { ChevronDown, Menu, X } from 'lucide-vue-next'

const isScrolled = ref(false)
const isMenuOpen = ref(false)
const route = useRoute()

const categories = {
  Hobby: ['Beauty', 'Fashion', 'Food', 'Drink', 'Mrs. GREEN APPLE'],
  Daily: ['Events', 'Study']
}

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

watch(() => route.path, () => {
  isMenuOpen.value = false
})
</script>

<style>
.slide-right-enter-active,
.slide-right-leave-active {
  transition: transform 0.4s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.4s ease;
}

.slide-right-enter-from,
.slide-right-leave-to {
  transform: translateX(100%);
  opacity: 0;
}
</style>
