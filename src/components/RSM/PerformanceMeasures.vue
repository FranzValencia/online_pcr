<script setup>
import { ref, defineProps } from "vue";

const props = defineProps(["measure"]);
</script>

<template>
  <div class="m-0 my-1" v-for="count in 6">
    <template v-if="props.measure && props.measure[6 - count]">
      <div class="w-full flex">
        <span style="text-wrap: nowrap">
          <b>{{ 6 - count }}</b> -
        </span>
        <div class="ml-2">{{ props.measure[6 - count] }}</div>
      </div>
    </template>
  </div>
</template>
