import "./assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import PrimeVue from "primevue/config";
import Aura from "@primevue/themes/aura";

import App from "./App.vue";
import router from "./router";
import axios from "axios";
// import VueAxios from "vue-axios";

const app = createApp(App);
app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: {
      prefix: "p",
      darkModeSelector: "system",
      cssLayer: false,
    },
  },
});

// import axios from 'axios';

// Set a base URL for all requests
axios.defaults.baseURL = "http://192.168.50.51:89";

axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;

axios.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    // console.log("interceptors error: ", error.response.status);
    // popout login dialog if error code == 401
    if (error.response.status == 401) {
      router.push("/login", { replace: true });
    }

    return Promise.reject(error);
  }
);

axios.defaults.baseURL = "http://192.168.50.51:89";
app.use(createPinia());
app.use(router);
app.mount("#app");

import "/node_modules/primeflex/primeflex.css";
import "primeicons/primeicons.css";

// for auth

import { useAuthStore } from "./stores/auth";
const auth = useAuthStore();

router.beforeEach(async (to, from) => {
  if (to.name == "login") return;
  if (to.meta.requiresAuth) {
    await auth.getUser().then(() => {
      if (!auth.isAuthenticated) {
        return { name: "login" };
      }
    });
  }
});
