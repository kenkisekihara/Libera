<template>
  <div>
    <transition name="fade">
      <LoadingScreen v-if="isLoading" />
    </transition>
    <Layout>
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </Layout>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Layout from './components/Layout.vue'
import LoadingScreen from './components/LoadingScreen.vue'

const isLoading = ref(true)

onMounted(() => {
  setTimeout(() => {
    isLoading.value = false
  }, 2500)
})
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
