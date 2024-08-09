<script setup>
import Stopwatch from "@/components/Stopwatch.vue";
import { ref } from "vue";

const timers = ref(0);

function addTimer() {
  timers.value += 1;
}
</script>

<template>
  <div class="flex flex-wrap">
    <Stopwatch v-for="timer in timers" class="w-4"/>
  </div>
  <Button @click="addTimer" label="Add" class="m-2"></Button>

</template>
