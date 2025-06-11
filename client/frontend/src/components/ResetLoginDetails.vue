<template>
  <div class="ResetForm">
    <h3>Reset Password</h3>
    <input v-model="resetEmail" type="email" placeholder="Enter your email" required />
    <button @click="resetPassword">Send Reset Link</button>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    <p v-if="successMessage" class="success">{{ successMessage }}</p>
    <button class="close-btn" @click="$emit('close')">Close</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { supabase } from '../supabase';

const resetEmail = ref('');
const errorMessage = ref('');
const successMessage = ref('');

const resetPassword = async () => {
  errorMessage.value = '';
  successMessage.value = '';

  const { error } = await supabase.auth.resetPasswordForEmail(resetEmail.value);

  if (error) {
    errorMessage.value = error.message;
  } else {
    successMessage.value = 'Password reset link sent!';
  }
};
</script>

<style scoped>
.reset-form {
  padding: 1rem;
  background: #f9f9f9;
  border: 1px solid #ccc;
  border-radius: 6px;
  margin-top: 1rem;
}
input {
  margin: 0.5rem 0;
  padding: 0.5rem;
  width: 100%;
}
button {
  padding: 0.5rem 1rem;
  background-color: #1f8ef1;
  color: white;
  border: none;
  border-radius: 4px;
  margin-top: 0.5rem;
}
.close-btn {
  background-color: transparent;
  color: #666;
  border: none;
  cursor: pointer;
  margin-top: 1rem;
}
.error {
  color: red;
}
.success {
  color: green;
}
</style>
