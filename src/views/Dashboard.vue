<script setup>
// import { onMounted } from 'vue';
import { useAuthStore } from "@/stores/auth";
import axios from "axios";

const auth = useAuthStore();

function getUser() {
  auth.getUser().then(() => {
    console.log(auth.user);
  });
}

function logoutUser() {
  auth.logoutUser();
}
</script>

<template>
  <main>
    <h1>Dashboard</h1>
    <div class="flex flex-wrap gap-1">
      <div
        class="border-round bg-primary font-bold flex align-items-center justify-content-center"
      >
        <Button @click="getUser()">Get User</Button>
      </div>
      <div
        class="border-round bg-primary font-bold flex align-items-center justify-content-center"
      >
        <Button @click="logoutUser()">Logout</Button>
      </div>
    </div>
  </main>
</template>
