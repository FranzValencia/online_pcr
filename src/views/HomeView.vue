<script setup>
import LoginForm from "@/components/LoginForm.vue";
import axios from "axios";
import { onMounted, ref } from "vue";
import { useAuthStore } from "@/stores/auth";

const user = ref(null);
const authStore = useAuthStore(); // Access store inside guard

onMounted(() => {
  if (authStore.isAuthenticated) {
    user.value = authStore.user;
  }
});
</script>

<template>
  <div v-if="user">
    
    <!-- <router-link to="dashboard">Dashboard</router-link> -->
  </div>
  <div v-else>
    <div class="w-full flex justify-content-center mt-5">
      <!-- Other components here for welcome page -->
      <LoginForm class="shadow-5" />
    </div>
  </div>
</template>
