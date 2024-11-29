<template>
  <div class="max-w-2xl mx-auto">
    <h1 class="text-3xl font-bold text-gray-900 mb-6">Add New Book</h1>
    
    <form @submit.prevent="handleSubmit" class="space-y-6">
      <div>
        <label for="title" class="block text-sm font-medium text-gray-700">
          Title
        </label>
        <input
          type="text"
          id="title"
          v-model="form.title"
          required
          class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      <div>
        <label for="author" class="block text-sm font-medium text-gray-700">
          Author
        </label>
        <input
          type="text"
          id="author"
          v-model="form.author"
          required
          class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      <div>
        <label for="category" class="block text-sm font-medium text-gray-700">
          Category
        </label>
        <input
          type="text"
          id="category"
          v-model="form.category"
          required
          class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      <div class="flex items-center">
        <input
          type="checkbox"
          id="available"
          v-model="form.available"
          class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
        />
        <label for="available" class="ml-2 block text-sm text-gray-900">
          Available for borrowing
        </label>
      </div>

      <div class="flex justify-end space-x-3">
        <router-link
          to="/"
          class="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        >
          Cancel
        </router-link>
        <button
          type="submit"
          :disabled="loading"
          class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
        >
          {{ loading ? 'Adding...' : 'Add Book' }}
        </button>
      </div>
    </form>

    <div v-if="error" class="mt-4 bg-red-50 p-4 rounded-md">
      <p class="text-red-700">{{ error }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import type { BookForm } from '../types/book'

const router = useRouter()
const loading = ref(false)
const error = ref<string | null>(null)

const form = ref<BookForm>({
  title: '',
  author: '',
  category: '',
  available: true
})

const handleSubmit = async () => {
  loading.value = true
  error.value = null
  
  try {
    const response = await fetch('http://localhost:3000/book', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(form.value)
    })
    
    if (!response.ok) throw new Error('Failed to add book')
    
    router.push('/')
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'An error occurred'
  } finally {
    loading.value = false
  }
}
</script>