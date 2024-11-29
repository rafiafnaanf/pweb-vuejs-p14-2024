import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AddBook from '../views/AddBook.vue'
import BookDetail from '../views/BookDetail.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/add',
      name: 'add-book',
      component: AddBook
    },
    {
      path: '/book/:id',
      name: 'book-detail',
      component: BookDetail
    }
  ]
})

export default router