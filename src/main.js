import "./assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import axios from "axios";
// import VueAxios from "vue-axios";

const app = createApp(App);

// import axios from 'axios';

// Set a base URL for all requests
axios.defaults.baseURL = "http://192.168.50.51:89";

axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;

// axios.interceptors.request.use((config) => {
//   if (store.getters.token){ // or get it from localStorage
//     config.headers["Authorization"] = "Bearer " + store.getters.token
//   }
//   return config
// })

axios.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    console.log("interceptors error: ", error.response);
    // popout login dialog if error code == 401
    return Promise.reject(error);
  }
);

// headers: {
//     'Accept': 'application/json',
//     'Content-Type': 'application/json',
//     'Access-Control-Allow-Origin': 'true'
//   }

// axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
// axios.defaults.headers.common['X-CSRF-TOKEN'] = Laravel.csrfToken;

axios.defaults.baseURL = "http://192.168.50.51:89";

// app.use(axios);
app.use(createPinia());
app.use(router);

app.mount("#app");
