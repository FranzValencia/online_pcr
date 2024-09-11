<script setup>
import { RouterLink, RouterView } from "vue-router";
import AppBar from "./components/AppBar.vue";
</script>

<template>
  <AppBar class="shadow-5" />
  <RouterView />
  <Toast />
  <ConfirmPopup group="templating">
    <template #message="slotProps">
      <div
        class="flex flex-col items-center w-full gap-4 border-b border-surface-200 dark:border-surface-700 p-4 mb-4 pb-0"
      >
        <i
          :class="slotProps.message.icon"
          class="mt-2 text-6xl text-red-500"
        ></i>
        <p v-html="slotProps.message.message"></p>
      </div>
    </template>
  </ConfirmPopup>
</template>
