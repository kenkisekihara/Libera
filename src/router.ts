import { createRouter, createWebHistory } from 'vue-router'
import Home from './pages/Home.vue'
import Category from './pages/Category.vue'
import Article from './pages/Article.vue'
import Contact from './pages/Contact.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Home },
    { path: '/category/:categoryName', component: Category },
    { path: '/:parentCategory/:childCategory/:id', component: Article },
    { path: '/contact', component: Contact }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

export default router
