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
  <main class="w-full flex justify-content-center mt-3">
    <Card style="width: 25rem; overflow: hidden" class="shadow-2">
      <template #header>
        <!-- <img alt="user header" src="" /> -->
      </template>
      <!-- <template #title><h1></h1></template>
      <template #subtitle></template> -->
      <template #content>
        <div class="flex justify-content-center">
          <form form="loginForm" @submit.prevent="loginUser()" class="">
            <h2>Login</h2>
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
      </template>
      <!-- <template #footer>
        <div class="flex gap-4 mt-1">
          <Button label="login" class="w-full" type="submit" form="loginForm" />
        </div>
      </template> -->
    </Card>
  </main>
</template>
