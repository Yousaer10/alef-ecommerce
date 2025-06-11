<template>
  <form class="register-form" @submit.prevent="createAccount">
    <h2>Create Account</h2>

    <div class="form-grid">
      <input v-model="title" placeholder="Title" />
      <input v-model="firstName" placeholder="First Name" required />
      <input v-model="lastName" placeholder="Last Name" required />
      <input v-model="dob" type="date" placeholder="Date of Birth" />
      <input v-model="firstLineAddress" placeholder="Address Line 1" required />
      <input v-model="secondLineAddress" placeholder="Address Line 2" />
      <input v-model="postcode" placeholder="Postcode" required />
      <input v-model="city" placeholder="City" required />
      <input v-model="country" placeholder="Country" required />
      <input v-model="email" type="email" placeholder="Email" required />
      <input v-model="password" type="password" placeholder="Password" required />
      <input v-model="confirmPassword" type="password" placeholder="Confirm Password" required />
    </div>

    <button type="submit">Create Account</button>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    <p v-if="successMessage" class="success">{{ successMessage }}</p>
  </form>
</template>

<script setup>
import { ref } from 'vue';
import { supabase } from '../supabase'; // your configured Supabase client

const title = ref('');
const firstName = ref('');
const lastName = ref('');
const dob = ref('');
const firstLineAddress = ref('');
const secondLineAddress = ref('');
const postcode = ref('');
const city = ref('');
const country = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');

const errorMessage = ref('');
const successMessage = ref('');

const createAccount = async () => {
  errorMessage.value = '';
  successMessage.value = '';

  if (password.value !== confirmPassword.value) {
    errorMessage.value = "Passwords don't match.";
    return;
  }

  // Step 1: Register with Supabase Auth
  const { data, error } = await supabase.auth.signUp({
    email: email.value,
    password: password.value
  });

  if (error) {
    errorMessage.value = error.message;
    return;
  }

  const userId = data.user?.id;
  if (!userId) {
    errorMessage.value = 'User ID not returned.';
    return;
  }

  // Step 2: Insert into 'profiles' table
  const { error: profileError } = await supabase.from('profiles').insert([{
    id: userId,
    title: title.value,
    first_name: firstName.value,
    last_name: lastName.value,
    dob: dob.value,
    first_line_address: firstLineAddress.value,
    second_line_address: secondLineAddress.value,
    postcode: postcode.value,
    city: city.value,
    country: country.value
  }]);

  if (profileError) {
    errorMessage.value = 'Account created, but storing profile failed.';
    return;
  }

  successMessage.value = 'Account created successfully! Check your email to confirm.';
};
</script>

<style scoped>
.register-form {
  max-width: 600px;
  margin: 0 auto;
  padding: 1.5rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #fafafa;
}
.form-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.8rem;
}
input {
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
.error {
  color: red;
  margin-top: 0.5rem;
}
.success {
  color: green;
  margin-top: 0.5rem;
}
</style>
