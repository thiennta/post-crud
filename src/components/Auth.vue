<script setup>
import { ref } from 'vue'
import { supabase } from '@/lib/supabase'
import { RouterLink, useRouter } from 'vue-router';
const router = useRouter();

const email = ref('')
const password = ref('')
const loading = ref(false)

const handleSignUp = async () => {
  loading.value = true
  const { error } = await supabase.auth.signUp({
    email: email.value,
    password: password.value,
  })
  if (error) alert(error.message)
  else alert('Check your email for confirmation link!')
  loading.value = false
}

const handleLogin = async () => {
  loading.value = true
  const { error } = await supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value,
  })
  if (error) alert(error.message)
  else 
  router.push("/posts")
  loading.value = false
}
</script>

<template>
  <div class="center-container">
    <form @submit.prevent="handleLogin" class="auth-form">
      <h1>Đăng nhập</h1>
      <input v-model="email" type="email" placeholder="Email" required />
      <input v-model="password" type="password" placeholder="Mật khẩu" required />
      
      <div class="btn-group">
        <button :disabled="loading" type="submit" class="btn btn-green">Đăng nhập</button>
        <button :disabled="loading" @click.prevent="handleSignUp" class="btn btn-blue">Đăng ký</button>
      </div>
    </form>
  </div>
</template>