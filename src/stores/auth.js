import { ref, computed } from "vue";
import { defineStore } from "pinia";
import axios from "axios";
import router from "@/router";

export const useAuthStore = defineStore("auth", () => {
  const user = ref(null); //computed(() => localStorage.getItem("user"));
  const isAuthenticated = ref(false); //computed(() => localStorage.getItem("user"));

  async function getUser() {
    await axios.get("/api/user").then((response) => {
      if (response.data.id) {
        this.isAuthenticated = true;
        this.user = response.data;
        localStorage.setItem("user", JSON.stringify(response.data));
      }
    });
  }

  async function loginUser(username, password) {
    await axios.get("/sanctum/csrf-cookie").then((response) => {
      axios
        .post("/auth/login", {
          username: username,
          password: password,
        })
        .catch(({ response }) => {
          // console.log("login error: ", response);
          this.isAuthenticated = false;
        })
        .then((response) => {
          if (response) {
            this.isAuthenticated = true;
            this.user = response.data;
            localStorage.setItem("user", JSON.stringify(response.data));
            router.push("/dashboard", { replace: true });
          }
        });
    });
  }

  async function logoutUser() {
    await axios.post("/auth/logout").then((response) => {
      localStorage.setItem("user", null);
      this.isAuthenticated = false;
      this.user = null;
      router.push("/", { replace: true });
    });
  }

  return { user, isAuthenticated, getUser, loginUser, logoutUser };
});
