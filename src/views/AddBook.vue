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
          v-model="form.tags"
          required
          class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      <div>
        <label for="coverImage" class="block text-sm font-medium text-gray-700">
          Cover Image (Optional)
        </label>
        <input
          type="text"
          id="coverImage"
          v-model="form.coverImage"
          placeholder="Enter URL (Optional)"
          class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      <div>
        <label for="publishedDate" class="block text-sm font-medium text-gray-700">
          Published Date
        </label>
        <input
          type="date"
          id="publishedDate"
          v-model="form.publishedDate"
          required
          class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      <div>
        <label for="publisher" class="block text-sm font-medium text-gray-700">
          Publisher
        </label>
        <input
          type="text"
          id="publisher"
          v-model="form.publisher"
          required
          class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      <div>
        <label for="description" class="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          id="description"
          v-model="form.description"
          required
          class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      <div>
        <label for="ratingAverage" class="block text-sm font-medium text-gray-700">
          Average Rating
        </label>
        <input
          type="number"
          id="ratingAverage"
          v-model="form.rating.average"
          required
          min="0"
          max="5"
          step="0.1"
          class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      <div>
        <label for="ratingCount" class="block text-sm font-medium text-gray-700">
          Rating Count
        </label>
        <input
          type="number"
          id="ratingCount"
          v-model="form.rating.count"
          required
          min="0"
          class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      <div>
        <label for="initialQty" class="block text-sm font-medium text-gray-700">
          Initial Quantity
        </label>
        <input
          type="number"
          id="initialQty"
          v-model="form.initialQty"
          required
          min="1"
          class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      <div>
        <label for="qty" class="block text-sm font-medium text-gray-700">
          Quantity
        </label>
        <input
          type="number"
          id="qty"
          v-model="form.qty"
          required
          min="1"
          class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
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
  tags: [],
  coverImage: '',  // Make coverImage optional by setting default value as empty string
  publishedDate: '',
  publisher: '',
  description: '',
  rating: {
    average: 0,
    count: 0
  },
  initialQty: 1,
  qty: 1
})

const handleSubmit = async () => {
  loading.value = true
  error.value = null
  
  try {
    const response = await fetch('http://localhost:4000/book', {
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
