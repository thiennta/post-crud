<script setup>
import axiosApi from '@/lib/axios'
import { onMounted, reactive } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const postId = route.params.id;
const state = reactive({
    post: Object
})

onMounted(async () => {
    try {
        console.log(state.post.title)
        const response = await axiosApi.get(`Post?id=eq.${postId}`);
        if (response.data && response.data.length > 0) {
            state.post = response.data[0]; 
            console.log("Fetched data:", state.post.title);
        }
    } catch (error) {
        console.log("Error while fetching: ", error);
    }
})


</script>
<template>
    <div class="center-container">
        <div v-if="state.post.title">
            <h1>Title: {{ state.post.title }}</h1>
            <p>{{ state.post.description }}</p>
        </div>
        <div v-else>
            <p>Loading...</p>
        </div>
        <br>
        <RouterLink :to="`/posts`" class="btn btn-green">Return to Posts</RouterLink>
    </div>
</template>