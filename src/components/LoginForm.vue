<script setup>
import { ref } from "vue";
import axios from "axios";

const username = ref(null);
const password = ref(null);

function login() {
  // Send a POST request
  axios.get("/sanctum/csrf-cookie").then((response) => {
    axios
      .post("/auth/login", {
        username: this.username,
        password: this.password,
      })
      .catch(({ response }) => {
        console.log("catch: ", response);
      })
      .then((response) => {
        console.log("then: ", response);
      });
  });
}

function getUser() {
  console.log("localStorage: ", localStorage);
  axios.get("/api/user").then((response) => {
    console.log(response.data);
  });
}

function logoutUser() {
  axios.post("/auth/logout").then((response) => {
    console.log(response.data);
  });
}
</script>

<template>
  <main>
    <!-- <TheWelcome /> -->
    <h1>Login</h1>

    <form @submit.prevent="login()">
      <input type="text" name="username" v-model="username" /> <br />
      <input type="password" name="password" v-model="password" /> <br />
      <button type="submit">Login</button>
    </form>

    <!-- <button type="button" @click="getUser()">Get Usesr</button>
    <br />
    <button type="button" @click="logoutUser()">Logout</button> -->
  </main>
</template>
