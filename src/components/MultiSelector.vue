<script setup>
import { ref, defineProps } from "vue";
import axios from "axios";

const props = defineProps(["selectedPersonnel"]);
</script>

<template>
  <div>MultiSelect here</div>
  {{ props.selectedPersonnel }}
</template>
