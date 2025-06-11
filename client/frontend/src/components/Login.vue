<template>
  <form class="auth-form" @submit.prevent="login">
    <h2>Login</h2>

    <input v-model="email" type="email" placeholder="Email" required />
    <input v-model="password" type="password" placeholder="Password" required />

    <button type="submit">Login</button>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    <p v-if="successMessage" class="success">{{ successMessage }}</p>

    <p class="reset-link" @click="showReset = true">Forgot password?</p>

    <PasswordResetForm v-if="showReset" @close="showReset = false" />
  </form>
</template>

<script setup>
import { ref } from 'vue';
import { supabase } from '../supabase';
import PasswordResetForm from './ResetLoginDetails.vue';

const email = ref('');
const password = ref('');
const errorMessage = ref('');
const successMessage = ref('');
const showReset = ref(false);

const login = async () => {
  errorMessage.value = '';
  successMessage.value = '';

  const { error } = await supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value
  });

  if (error) {
    errorMessage.value = error.message;
  } else {
    successMessage.value = 'Login successful!';
    // Redirect or fetch user data...
  }
};
</script>

<style scoped>
.auth-form {
  max-width: 400px;
  margin: 2rem auto;
  padding: 1.5rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #fff;
}
input {
  width: 100%;
  margin: 0.5rem 0;
  padding: 0.6rem;
  border-radius: 4px;
  border: 1px solid #ccc;
}
button {
  margin-top: 1rem;
  padding: 0.75rem;
  background-color: #1f8ef1;
  color: white;
  border: none;
  border-radius: 4px;
}
.reset-link {
  color: #1f8ef1;
  margin-top: 1rem;
  cursor: pointer;
  font-size: 0.9rem;
}
.error {
  color: red;
}
.success {
  color: green;
}
</style>
