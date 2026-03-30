<script setup>
import axiosApi from '@/lib/axios'
import { reactive } from 'vue';
import router from '@/router';

const form = reactive({
    title: '',
    description: ''
})
const handleSubmit = async () => {
    const newPost = {
        title: form.title,
        description: form.description
    }

    try {
        const response = await axiosApi.post('/Post', newPost);
        window.alert('Post created successfully!');
        return router.push('/posts');
    } catch (error) {
        console.error("Error on posting data:", error);
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