import { ref } from "vue";
import { defineStore } from "pinia";
import axios from "axios";
import router from "@/router";


export const useAuthStore = defineStore("auth", () => {
  const user = ref(null);
  const isAuthenticated = ref(false);

  // Initialize authentication state based on local storage
  function initialize() {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      user.value = JSON.parse(storedUser);
      isAuthenticated.value = true;
    }
  }

  // Call initialize when the store is created
  initialize();

  async function getUser() {
    try {
      const response = await axios.get("/api/user");
      if (response.data.id) {
        isAuthenticated.value = true;
        user.value = response.data;
        localStorage.setItem("user", JSON.stringify(response.data));
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }

  async function loginUser(username, password) {
    try {
      await axios.get("/sanctum/csrf-cookie");
      const response = await axios.post("/auth/login", {
        username: username,
        password: password,
      });

      if (response.data) {
        isAuthenticated.value = true;
        user.value = response.data;
        localStorage.setItem("user", JSON.stringify(response.data));
        router.push({ path: "/dashboard", replace: true });
      }
    } catch (error) {
      console.error("Login error:", error);
      isAuthenticated.value = false;
    }
  }

  async function logoutUser() {
    try {
      await axios.post("/auth/logout");
      localStorage.removeItem("user");
      isAuthenticated.value = false;
      user.value = null;
      router.push({ path: "/", replace: true });
    } catch (error) {
      console.error("Logout error:", error);
    }
  }

  return { user, isAuthenticated, getUser, loginUser, logoutUser };
});
