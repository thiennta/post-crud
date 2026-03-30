<script setup>
// script section
import { RouterView, RouterLink, useRouter } from 'vue-router';
const router = useRouter();

import { onMounted, ref } from 'vue'
import { supabase } from '@/lib/supabase'

const user = ref(null)

onMounted(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
        user.value = session?.user ?? null
    })

    supabase.auth.onAuthStateChange((_event, session) => {
        user.value = session?.user ?? null
    })
})

const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push("/auth")

}
</script>

<template>
  <!-- template section  -->
    <nav style="border: 2px solid red; background: #eee; padding: 10px;">
    <div class="auth" v-if="user">
      <span>Chào, {{ user.email }}</span>
      <button style="margin-left: 10px;" @click="handleLogout">Logout</button>
    </div>
    <div class="auth" v-else>
      <router-link to="/auth">Login</router-link>
    </div>
    </nav>
    <RouterView />
</template>

<style scoped>
/* style section */
</style>
