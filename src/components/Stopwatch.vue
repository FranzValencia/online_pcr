<script setup>
import { ref, computed } from "vue";

const time = ref(0);
const timer = ref(null);

const start = () => {
  if (timer.value) return;
11          ``
};

const stop = () => {
  clearInterval(timer.value);
  timer.value = null;
};

const reset = () => {
  stop();
  time.value = 0;
};

const formattedTime = computed(() => {
  // const minutes = Math.floor(time.value / 60)
  //   .toString()
  //   .padStart(2, "0");
  // const seconds = (time.value % 60).toString().padStart(2, "0");
  // return `${minutes}:${seconds}`;
  const hours = Math.floor(time.value / 3600)
    .toString()
    .padStart(2, "0");
  const minutes = Math.floor((time.value % 3600) / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (time.value % 60).toString().padStart(2, "0");
  return `${hours}:${minutes}:${seconds}`;
});
</script>

<template>
  <div
    class="p-2 bg-green-400 justify-content-center border-dashed"
    style="/*width: 380px;*/ font-family: 'Arial Narrow'"
  >
    <h1 class="m-0 flex justify-content-center" contenteditable="true"></h1>
    <h1
      id="stopwatch"
      class="w-full flex justify-content-center m-0"
      style="font-size: 100px"
    >
      {{ formattedTime }}
    </h1>
    <div class="flex gap-1 justify-content-center">
      <Button size="small" outlined @click="start">Start</Button>
      <Button size="small" outlined @click="stop">Stop</Button>
      <Button size="small" outlined @click="reset">Reset</Button>
    </div>
  </div>
</template>
