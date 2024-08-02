<script setup>
import { ref } from "vue";
import axios from "axios";
import router from "@/router";
import { useAuthStore } from "@/stores/auth";

const auth = useAuthStore();
const username = ref(null);
const password = ref(null);

function loginUser() {
  auth.loginUser(this.username, this.password);
}

</script>

<template>
  <main>
    <div class="flex justify-content-center">
      <form @submit.prevent="loginUser()" class="">
        <h1>Login</h1>
        <IconField class="m-2">
          <InputIcon class="pi pi-user" />
          <InputText v-model="username" placeholder="Username" />
        </IconField>

        <IconField class="m-2">
          <InputIcon class="pi pi-key" />
          <InputText
            type="password"
            v-model="password"
            placeholder="Password"
          />
        </IconField>
        <Button
          class="m-2 mt-0"
          type="submit"
          label="Login"
          icon="pi pi-sign-in"
        ></Button>
      </form>
    </div>
  </main>
</template>
