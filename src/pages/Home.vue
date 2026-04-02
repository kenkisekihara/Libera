<template>
  <div class="page-enter">
    <header class="relative min-h-screen flex flex-col justify-start overflow-hidden pt-32 md:pt-48">
      <div class="max-w-screen-2xl w-full mx-auto px-8 md:px-16 mb-8">
        <div class="flex items-center gap-5">
          <div class="w-px h-7 bg-white/30" />
          <span class="font-light text-[1.2rem] tracking-[0.35em] text-white/70">NEW ARTICLE</span>
        </div>
      </div>

      <div 
        ref="containerRef"
        class="w-screen overflow-hidden relative pb-24 cursor-grab active:cursor-grabbing"
        @mouseenter="isHovered = true"
        @mouseleave="isHovered = false"
        @touchstart="onTouchStart"
        @touchmove="onTouchMove"
        @touchend="onTouchEnd"
        @mousedown="onMouseDown"
      >
        <div 
          ref="sliderRef"
          class="flex px-8 md:px-16 touch-pan-y"
          :style="{ transform: `translate3d(${x}px, 0, 0)`, transition: isDragging ? 'none' : 'transform 0.1s linear' }"
        >
          <div 
            v-for="(article, idx) in displayArticles" 
            :key="`${article.id}-${idx}`" 
            @click="!isDragging && navigate(article)" 
            class="flex-none w-[300px] md:w-[450px] mr-12 group cursor-pointer select-none"
          >
            <div class="w-full aspect-square overflow-hidden bg-[#151921]">
              <img 
                :src="article.image" 
                :alt="article.title"
                class="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110 group-hover:opacity-80"
                referrerpolicy="no-referrer"
                draggable="false"
              />
            </div>
            <div class="mt-8 flex flex-col gap-3">
              <div class="flex items-center gap-4">
                <span class="text-[9px] tracking-[0.4em] text-white/40 uppercase">{{ article.category }}</span>
                <div class="w-8 h-px bg-white/20 group-hover:w-12 transition-all duration-500" />
              </div>
              <h3 class="text-white text-xl md:text-2xl font-light tracking-widest leading-relaxed group-hover:text-white/80 transition-colors">
                {{ article.title }}
              </h3>
              <p class="text-gray-500 text-[10px] tracking-[0.3em] mt-2">{{ article.date }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="absolute bottom-16 left-8 md:left-16 flex items-center gap-4">
        <div class="w-12 h-px bg-white/30" />
        <span class="text-[9px] tracking-[0.5em] text-white/40 uppercase">Scroll to explore</span>
      </div>
    </header>

    <section class="py-40 px-8 md:px-16 max-w-screen-xl mx-auto">
      <div class="flex items-center gap-5 mb-24">
        <div class="w-px h-7 bg-white/30" />
        <span class="font-light text-[1.2rem] tracking-[0.35em] text-white/70 uppercase">Categories</span>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div 
          v-for="cat in CATEGORIES" 
          :key="cat.name"
          @click="router.push(`/category/${cat.name}`)"
          :class="['concept-grid-item p-12 flex flex-col justify-center min-h-[280px] group', cat.color]"
        >
          <h3 :class="['text-2xl font-light tracking-widest text-white/80 mb-6 transition-colors duration-500', cat.textColor]">
            {{ cat.name }}
          </h3>
          <p class="text-[11px] tracking-[0.2em] text-gray-500 leading-loose group-hover:text-white/60 transition-colors duration-500">
            {{ cat.label }}
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useTitle } from '@vueuse/core'
import { Article, CATEGORIES } from '../types'

useTitle('Libera | Official Blog')

const router = useRouter()
const articles = ref<Article[]>([])
const displayArticles = ref<Article[]>([])

const containerRef = ref<HTMLElement | null>(null)
const sliderRef = ref<HTMLElement | null>(null)

const x = ref(0)
const isDragging = ref(false)
const isHovered = ref(false)
const loopDistance = ref(0)

let animationFrameId: number
let lastTime = 0
let startX = 0
let currentX = 0
let velocity = 0
let lastDragTime = 0

const fetchArticles = async () => {
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

      articles.value = data.contents.map((item: any) => ({
        id: item.id,
        title: item.title,
        date: new Date(item.publishedAt || item.createdAt).toLocaleDateString('ja-JP').replace(/\//g, '.'),
        image: item.image?.url || 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80&w=800',
        category: getCategoryName(item.category),
        parentCategory: getParentCategory(item.category),
        childCategory: getChildCategory(item.category)
      }))

      displayArticles.value = Array(40).fill(articles.value).flat()
      
      setTimeout(calculateLoopDistance, 100)
    }
  } catch (error) {
    console.error('Error fetching articles:', error)
  }
}

const calculateLoopDistance = () => {
  if (sliderRef.value && articles.value.length > 0) {
    const children = sliderRef.value.children
    if (children.length >= articles.value.length * 2) {
      const firstChild = children[0] as HTMLElement
      const nextSetFirstChild = children[articles.value.length] as HTMLElement
      
      if (firstChild && nextSetFirstChild) {
        const singleSetWidth = nextSetFirstChild.offsetLeft - firstChild.offsetLeft
        loopDistance.value = singleSetWidth
        if (x.value === 0) {
          x.value = -singleSetWidth * 20
        }
      }
    }
  }
}

const animate = (time: number) => {
  if (!lastTime) lastTime = time
  const delta = time - lastTime
  lastTime = time

  if (loopDistance.value > 0) {
    if (!isDragging.value && !isHovered.value) {
      const speed = loopDistance.value / (articles.value.length * 8000)
      x.value -= speed * delta
    }

    if (!isDragging.value) {
      // Apply momentum
      if (Math.abs(velocity) > 0.1) {
        x.value += velocity
        velocity *= 0.95 // friction
      } else {
        velocity = 0
      }

      // Silent snap
      if (Math.abs(velocity) < 1) {
        if (x.value < -loopDistance.value * 25 || x.value > -loopDistance.value * 15) {
          let mod = x.value % loopDistance.value
          if (mod > 0) mod -= loopDistance.value
          x.value = mod - loopDistance.value * 20
        }
      }
    }
  }

  animationFrameId = requestAnimationFrame(animate)
}

const onTouchStart = (e: TouchEvent) => {
  isDragging.value = true
  startX = e.touches[0].clientX
  currentX = x.value
  velocity = 0
  lastDragTime = performance.now()
}

const onTouchMove = (e: TouchEvent) => {
  if (!isDragging.value) return
  const deltaX = e.touches[0].clientX - startX
  const now = performance.now()
  const dt = now - lastDragTime
  
  if (dt > 0) {
    velocity = (currentX + deltaX - x.value) * 0.5
  }
  
  x.value = currentX + deltaX
  lastDragTime = now
}

const onTouchEnd = () => {
  isDragging.value = false
}

const onMouseDown = (e: MouseEvent) => {
  isDragging.value = true
  startX = e.clientX
  currentX = x.value
  velocity = 0
  lastDragTime = performance.now()

  const onMouseMove = (e: MouseEvent) => {
    if (!isDragging.value) return
    const deltaX = e.clientX - startX
    const now = performance.now()
    const dt = now - lastDragTime
    
    if (dt > 0) {
      velocity = (currentX + deltaX - x.value) * 0.5
    }
    
    x.value = currentX + deltaX
    lastDragTime = now
  }

  const onMouseUp = () => {
    isDragging.value = false
    window.removeEventListener('mousemove', onMouseMove)
    window.removeEventListener('mouseup', onMouseUp)
  }

  window.addEventListener('mousemove', onMouseMove)
  window.addEventListener('mouseup', onMouseUp)
}

const onWheel = (e: WheelEvent) => {
  if (loopDistance.value === 0) return
  if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
    e.preventDefault()
    x.value -= e.deltaX
  }
}

const navigate = (article: Article) => {
  if (Math.abs(velocity) < 5) {
    router.push(`/${article.parentCategory || 'category'}/${article.childCategory || 'all'}/${article.id}`)
  }
}

onMounted(() => {
  fetchArticles()
  animationFrameId = requestAnimationFrame(animate)
  if (containerRef.value) {
    containerRef.value.addEventListener('wheel', onWheel, { passive: false })
  }
})

onUnmounted(() => {
  cancelAnimationFrame(animationFrameId)
  if (containerRef.value) {
    containerRef.value.removeEventListener('wheel', onWheel)
  }
})
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
