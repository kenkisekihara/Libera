<template>
  <div class="page-enter pt-48 pb-32 px-8 md:px-16 max-w-4xl mx-auto">
    <div v-if="loading" class="text-center text-white/20 tracking-widest uppercase text-[10px] min-h-[50vh] flex items-center justify-center">
      Loading...
    </div>
    
    <div v-else-if="article">
      <div class="mb-12 text-center">
        <div class="text-[10px] tracking-[0.4em] text-white/40 uppercase mb-4">{{ article.category }}</div>
        <h1 class="text-3xl md:text-5xl font-light text-white tracking-widest leading-tight mb-6">{{ article.title }}</h1>
        <div class="text-[11px] tracking-[0.2em] text-white/60">{{ article.date }}</div>
      </div>
      
      <div class="aspect-video w-full overflow-hidden mb-16" v-if="article.image">
        <img :src="article.image" alt="" class="w-full h-full object-cover" referrerpolicy="no-referrer" />
      </div>

      <div 
        class="text-white/80 leading-relaxed tracking-wider font-light text-lg article-content"
        v-html="article.content || ''"
      />

      <div class="mt-32 text-center">
        <router-link to="/" class="inline-block px-12 py-4 border border-white/60 text-[10px] tracking-[0.5em] uppercase text-white/90 hover:text-white hover:border-white transition-all duration-300">
          Back Home
        </router-link>
      </div>
    </div>
    
    <div v-else class="text-center text-white/40 tracking-widest mt-[20vh]">
      Article not found.
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useTitle } from '@vueuse/core'
import { Article } from '../types'

const route = useRoute()
const article = ref<Article | null>(null)
const loading = ref(true)

useTitle(computed(() => article.value ? `${article.value.title} | Libera` : 'Libera'))

const fetchArticle = async () => {
  const id = route.params.id as string
  try {
    const response = await fetch('/api/articles')
    if (!response.ok) throw new Error('Failed to fetch')
    const data = await response.json()
    const found = data.contents.find((item: any) => item.id === id)
    
    if (found) {
      const getCategoryName = (cat: any) => {
        if (!cat) return 'home'
        if (typeof cat === 'string') return cat
        if (Array.isArray(cat)) return typeof cat[0] === 'string' ? cat[0] : (cat[0]?.name || 'home')
        return cat.name || 'home'
      }

      const getParentCategory = (cat: any) => {
        if (!cat) return 'default'
        if (cat.parent && cat.parent.name) return cat.parent.name
        if (cat.parent) return cat.parent
        return getCategoryName(cat)
      }

      const getChildCategory = (cat: any) => {
        if (!cat) return 'default'
        if (cat.parent && cat.name) return cat.name
        return 'default'
      }

      article.value = {
        id: found.id,
        title: found.title,
        date: new Date(found.publishedAt || found.createdAt).toLocaleDateString('ja-JP').replace(/\//g, '.'),
        image: found.image?.url,
        category: getCategoryName(found.category),
        parentCategory: getParentCategory(found.category),
        childCategory: getChildCategory(found.category),
        content: found.content || found.body || ''
      }
    }
  } catch (error) {
    console.error(error)
  } finally {
    loading.value = false
  }
}

onMounted(fetchArticle)
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
