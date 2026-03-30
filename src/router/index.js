import { createRouter, createWebHistory } from 'vue-router'; 
import Home from '@/pages/Home.vue';
import Posts from '@/components/Posts.vue';
import PostsView from '@/components/PostsView.vue';
import PostsEdit from '@/components/PostsEdit.vue';
import PostsAdd from '@/components/PostsAdd.vue';
import Auth from '@/components/Auth.vue';

import { supabase } from '@/lib/supabase'

const routes = [
    { path: '/', name: "home", component: Home },
    { path: '/posts', name: "posts", component: Posts },
    { path: '/posts/:id', name: "postsView", component: PostsView },
    { path: '/posts/add', name: "postsAdd", component: PostsAdd },
    { path: '/posts/edit/:id', name: "postsEdit", component: PostsEdit },
    { path: '/auth', name: "auth", component: Auth, meta: { isPublic: true } },
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
});

router.beforeEach(async (to, from, next) => {
    const { data: { session } } = await supabase.auth.getSession()

    const requiresAuth = !to.meta.isPublic
  
    if (requiresAuth && !session) {
      next('/auth')
    }
    else if (to.path === '/auth' && session) {
      next('/posts')
    }
    else {
      next()
    }
  })

export default router;