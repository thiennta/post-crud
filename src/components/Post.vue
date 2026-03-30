<script setup>
import { defineProps } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import axiosApi from '@/lib/axios'
const router = useRouter();

const props = defineProps({
    post: Object
});

const deletePost = async (postId) => {
    try {
        console.log(postId)
        const confirm = window.confirm('Are you sure you want to delete this posts?');
        if(confirm) {
            await axiosApi.delete(`/Post?id=eq.${postId}`);
            window.alert('Post deleted successfully!');
            router.push('/posts');
            router.go(0);
        }
    } catch (error) {
        console.error("Error deleting post: ", error);
    }
}
</script>
<template>
    <tr>
        <td>{{ post.title }}</td>
        <td>{{ post.description }}</td>
        <td>
            <RouterLink :to="`/posts/${post.id}`" class="btn btn-green">O</RouterLink>
            <RouterLink :to="`/posts/edit/${post.id}`"class="btn btn-blue">/</RouterLink>
            <button @click="deletePost(post.id)" class="btn btn-red">X</button>
        </td>
    </tr>
</template>