<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { Book } from '../types/book'

const books = ref<Book[]>([])
const loading = ref<boolean>(false)
const error = ref<string | null>(null)

const fetchBooks = async () => {
  loading.value = true
  error.value = null

  try {
    const response = await fetch('http://localhost:4000/book')
    if (!response.ok) throw new Error('Failed to fetch books')
    const data = await response.json()
  
    books.value =  [...data.data]
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'An error occurred'
  } finally {
    loading.value = false
  }
}

const handleDelete = async (id: string) => {
  if (!confirm('Are you sure you want to delete this book?')) return

  loading.value = true
  error.value = null

  try {
    const response = await fetch(`http://localhost:4000/book/${id}`, {
      method: 'DELETE'
    })
    if (!response.ok) throw new Error('Failed to delete book')
    await fetchBooks() // Re-fetch after delete to update the list
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'An error occurred'
  } finally {
    loading.value = false
  }
}

onMounted(fetchBooks)
</script>

<template>
  <div class="space-y-6">
    <h1 class="text-3xl font-bold text-gray-900">Book Collection</h1>

    <!-- Loading Spinner -->
    <div v-if="loading" class="text-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
      <p class="mt-4 text-gray-600">Loading books...</p>
    </div>

    <!-- Error Message -->
    <div v-else-if="error" class="bg-red-50 p-4 rounded-md">
      <p class="text-red-700">{{ error }}</p>
    </div>

    <!-- Book Cards -->
    <div v-else class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <div
        v-for="book in books"
        :key="book._id"
        class="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow"
      >
        <div class="px-4 py-5 sm:p-6">
          <h3 class="text-lg font-medium text-gray-900">{{ book.title }}</h3>
          <p class="mt-1 text-sm text-gray-500">By {{ book.author }}</p>
          <div class="mt-4">
            <span class="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
              {{ book.tags.join(', ') }}
            </span>
          </div>
          <div class="mt-4 flex space-x-3">
            <router-link
              :to="`/book/${book._id}`"
              class="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              View Details
            </router-link>
            <button
              @click="handleDelete(book._id)"
              class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


