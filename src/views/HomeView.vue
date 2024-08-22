<script setup>
import LoginForm from "@/components/LoginForm.vue";
import axios from "axios";
import { onMounted, ref } from "vue";

const user = ref(null);

async function checkIfAuth() {
  return await axios.get("/api/user");
}

onMounted(() => {
  checkIfAuth().then(({ data }) => {
    user.value = data;
  });
});
</script>

<template>
  <div v-if="user">
    Welcome {{ user.employee_information.full_name }}
    <router-link to="dashboard">Dashboard</router-link>
  </div>
  <div v-else>
    <div class="w-full flex justify-content-center mt-5">
      <!-- <div class="mr-5"> -->
      <!-- <img
        src="@/assets/images/bg2020.jpg"
        class="w-5"
      /> -->
      <!-- <h1>Welcome guest!</h1>
        <p></p>
      </div> -->
      <LoginForm class="shadow-5" />
    </div>
  </div>
</template>
