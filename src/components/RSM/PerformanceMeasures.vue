<script setup>
import { ref, defineProps } from "vue";

const props = defineProps(["measure"]);
</script>

<template>
  <div class="m-0 my-1" v-for="(count, i) in 6">
    <template v-if="props.measure && props.measure[i]">
      <div class="w-full flex">
        <span style="text-wrap: nowrap">
          <b>{{ 5 - i }}</b> -
        </span>
        <div class="ml-2">{{ props.measure[count - 1] }}</div>
      </div>
    </template>
  </div>
</template>
