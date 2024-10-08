import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import Dashboard from "@/views/Dashboard.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      // meta: { requiresAuth: true },
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/LoginView.vue"),
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: Dashboard,
      meta: { requiresAuth: true },
    },

    {
      path: "/rsm",
      name: "rsm",
      component: () => import("@/views/RSM/Index.vue"),
      meta: { requiresAuth: true, requiresRsm: true },
    },
    {
      path: "/rsm/:id",
      name: "rsm_editor",
      component: () => import("@/views/RSM/RatingScaleMatrix.vue"),
      meta: { requiresAuth: true, requiresRsm: true },
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AboutView.vue"),
    },
  ],
});

export default router;
