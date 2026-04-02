<template>
  <div class="page-enter pt-48 pb-32 px-8 md:px-16 min-h-screen">
    <div class="relative text-center mb-24 select-none pointer-events-none">
      <div class="font-serif italic text-[clamp(6rem,15vw,12rem)] leading-[0.8] text-white/5">
        {{ decodedCategory.toUpperCase() }}
      </div>
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-serif text-[clamp(2rem,5vw,4rem)] text-white tracking-[0.2em] whitespace-nowrap">
        {{ decodedCategory.toUpperCase() }}
      </div>
    </div>

    <div v-if="loading" class="text-center text-white/20 tracking-widest uppercase text-[10px]">
      Loading...
    </div>
    <div v-else-if="articles.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 max-w-7xl mx-auto">
      <router-link 
        v-for="article in articles" 
        :key="article.id" 
        :to="`/${article.parentCategory || 'category'}/${article.childCategory || 'all'}/${article.id}`" 
        class="group"
      >
        <div class="aspect-square overflow-hidden bg-[#151921] mb-6">
          <img 
            :src="article.image" 
            :alt="article.title"
            class="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
            referrerpolicy="no-referrer"
          />
        </div>
        <div class="text-left">
          <h3 class="text-white text-lg font-light tracking-widest mb-2 group-hover:text-white/80 transition-colors">{{ article.title }}</h3>
          <p class="text-gray-500 text-[10px] tracking-[0.3em]">{{ article.date }}</p>
        </div>
      </router-link>
    </div>
    <div v-else class="text-center text-[11px] text-white/40 tracking-[0.3em] mt-[10vh] font-light">
      まだ記事が存在しません。
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useTitle } from '@vueuse/core'
import { Article } from '../types'

const route = useRoute()
const articles = ref<Article[]>([])
const loading = ref(true)

const decodedCategory = computed(() => {
  const cat = route.params.categoryName as string
  return decodeURIComponent(cat || '')
})

useTitle(computed(() => `${decodedCategory.value.toUpperCase()} | Libera`))

const fetchArticles = async () => {
  loading.value = true
  try {
    const response = await fetch('/api/articles')
    if (!response.ok) throw new Error('Failed to fetch')
    const data = await response.json()
    
    if (data.contents) {
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

      articles.value = data.contents
        .map((item: any) => ({
          id: item.id,
          title: item.title,
          date: new Date(item.publishedAt || item.createdAt).toLocaleDateString('ja-JP').replace(/\//g, '.'),
          image: item.image?.url || 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80&w=800',
          category: getCategoryName(item.category),
          parentCategory: getParentCategory(item.category),
          childCategory: getChildCategory(item.category)
        }))
        .filter((article: Article) => 
          decodedCategory.value === 'home' ? true : article.category.toLowerCase() === decodedCategory.value.toLowerCase()
        )
    }
  } catch (error) {
    console.error(error)
  } finally {
    loading.value = false
  }
}

onMounted(fetchArticles)
watch(() => route.params.categoryName, fetchArticles)
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
