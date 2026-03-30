<script setup>
import { onMounted, reactive } from 'vue';
import { RouterLink } from 'vue-router';
import axiosApi from '@/lib/axios'
import Post from '@/components/Post.vue';
import { ref, computed } from 'vue'

const posts = ref([])
// sort
const sortKey = ref('title')
const sortOrder = ref(1)
//paging
const currentPage = ref(1)
const itemsPerPage = ref(5)

const totalPages = computed(() => {
  return Math.ceil(sortedPosts.value.length / itemsPerPage.value)
})

const paginatedPosts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return sortedPosts.value.slice(start, end)
})

const sortBy = (key) => {
  if (sortKey.value === key) {
    sortOrder.value = -1 * sortOrder.value
    currentPage.value = 1
  } else {
    sortKey.value = key
    sortOrder.value = 1
    currentPage.value = 1
  }
}

const sortedPosts = computed(() => {
return [...posts.value].sort((a, b) => {
    let modifier = sortOrder.value
    let valA = a[sortKey.value] ? String(a[sortKey.value]).toLowerCase() : ''
    let valB = b[sortKey.value] ? String(b[sortKey.value]).toLowerCase() : ''
    
    if (valA < valB) return -1 * modifier
    if (valA > valB) return 1 * modifier
    return 0
  })
})

const state = reactive({
    posts: []
})

onMounted(async () => {
  try {
    const response = await axiosApi.get('/Post');
    posts.value = response.data;
    console.log(response);
  } catch (error) {
    console.error('Error fetching jobs:', error);
  }
});

</script>
<template>
  <div class="center-container">
    <h1>All Post</h1> 
    <RouterLink :to="'/posts/add'" class="btn btn-green">Add Post</RouterLink>
    <br />
    <br />
    <div style="height:450px;">
      <table id="posts">
          <tr>
              <th @click="sortBy('title')" style="cursor: pointer; width:10%;">
                Title 
                <span>{{ sortKey === 'title' ? (sortOrder === 1 ? '▲' : '▼') : '' }}</span>
              </th>
          
            <th @click="sortBy('description')" style="cursor: pointer">
                Detail Post 
                <span>{{ sortKey === 'description' ? (sortOrder === 1 ? '▲' : '▼') : '' }}</span>
            </th>
              <th style="width:20%;">Action</th>
          </tr>
          <Post v-for="post in paginatedPosts" :key="post.id" :post="post"/>
      </table>
    </div>

    <div class="pagination">
        <button
          :disabled="currentPage === 1" 
          @click="currentPage--"
          class="btn-paging"
        > Prev </button>

        <span class="page-info">Page {{ currentPage }} / {{ totalPages }}</span>

        <button
          :disabled="currentPage === totalPages" 
          @click="currentPage++"
          class="btn-paging"
        > Next </button>
    </div>
  </div>
</template>
