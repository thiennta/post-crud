<script setup>
import axiosApi from '@/lib/axios'
import { onMounted, reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const postId = route.params.id;

const form = reactive({
    title: '',
    description: ''
})

onMounted( async () => {
    try {
        const response = await axiosApi.get(`/Post?id=eq.${postId}`);
        if (response.data && response.data.length > 0) {
            const postData = response.data[0]; 
            form.title = postData.title;
            form.description = postData.description;
            form.id = postData.id
        }
    } catch (error) {
        console.log("Error fetching post", response);
    }
})

const handleSubmit = async () => {
    const updatePost = {
        title: form.title,
        description: form.description,
        id: form.id
    }

    try {
        const response = await axiosApi.put(`/Post?id=eq.${postId}`, updatePost);
        router.push(`/posts`);
    } catch (error) {
        console.error("Error updating post", error);
    }
}

</script>
<template>
    <RouterLink :to="`/posts`" class="btn btn-green">Return to Posts</RouterLink>
    <div>
        <form @submit.prevent="handleSubmit">
            <label for="title">Title</label>
            <input 
            v-model="form.title" 
            type="text" 
            id="title" 
            name="title" 
            placeholder="Title">
            <label for="description">Description</label>
            <textarea 
            v-model="form.description" 
            id="description" 
            name="description">
            </textarea>
            <button type="submit" class="btn btn-green">Submit</button>
        </form>
    </div>
</template>