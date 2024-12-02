<template>
  <div class="max-w-3xl mx-auto">
    <div v-if="loading" class="text-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
      <p class="mt-4 text-gray-600">Loading book details...</p>
    </div>

    <div v-else-if="error" class="bg-red-50 p-4 rounded-md">
      <p class="text-red-700">{{ error }}</p>
    </div>

    <div v-else-if="book" class="bg-white shadow overflow-hidden sm:rounded-lg">
      <div class="px-4 py-5 sm:px-6">
        <h3 class="text-lg leading-6 font-medium text-gray-900">
          {{ book.title }}
        </h3>
        <p class="mt-1 max-w-2xl text-sm text-gray-500">
          Book details and information
        </p>
      </div>
      
      <div v-if="book.coverImage" class="px-4 py-5 sm:px-6">
        <img
          v-bind:src="book.coverImage"
          alt="Book Cover"
          class="max-w-full h-auto rounded-md shadow-lg"
        />
      </div>
      
      <div class="border-t border-gray-200">
        <dl>
          <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="text-sm font-medium text-gray-500">Author</dt>
            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {{ book.author }}
            </dd>
          </div>

          <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="text-sm font-medium text-gray-500">Category</dt>
            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {{ book.tags.join(', ') }}
            </dd>
          </div>

          <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="text-sm font-medium text-gray-500">Published Date</dt>
            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {{ new Date(book.publishedDate).toLocaleDateString() }}
            </dd>
          </div>

          <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="text-sm font-medium text-gray-500">Publisher</dt>
            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {{ book.publisher }}
            </dd>
          </div>

          <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="text-sm font-medium text-gray-500">Description</dt>
            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {{ book.description }}
            </dd>
          </div>

          <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="text-sm font-medium text-gray-500">Average Rating</dt>
            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {{ book.rating.average }}
            </dd>
          </div>

          <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="text-sm font-medium text-gray-500">Rating Count</dt>
            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {{ book.rating.count }}
            </dd>
          </div>

          <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="text-sm font-medium text-gray-500">Initial Quantity</dt>
            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {{ book.initialQty }}
            </dd>
          </div>

          <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="text-sm font-medium text-gray-500">Quantity</dt>
            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {{ book.qty }}
            </dd>
          </div>
        </dl>
      </div>
      <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
        <router-link
          to="/"
          class="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        >
          Back to List
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import type { Book } from '../types/book'

const route = useRoute()
const book = ref<Book | null>(null)
const loading = ref(false)
const error = ref<string | null>(null)

const fetchBook = async () => {
  const id = route.params.id as string;
  
  // Log the id to check if it's being passed correctly
  console.log('Fetched ID from route:', id);

  if (!id) {
    error.value = 'Book ID is missing';
    return;
  }

  loading.value = true;
  error.value = null;

  try {
    const response = await fetch(`http://localhost:4000/book/${id}`);
    if (!response.ok) throw new Error('Failed to fetch book details');
    const data = await response.json();
    console.log('Received data:', data);  // Log the API response
    book.value = data.data;  // Ensure you're accessing the 'data' field in the response
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'An error occurred';
  } finally {
    loading.value = false;
  }
}

onMounted(fetchBook)
</script>
