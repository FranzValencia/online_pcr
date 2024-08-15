<template>
  <div class="mt-2 flex flex-wrap align-items-center justify-content-center">
    <Card class="md:w-4 sm:w-full m-0">
      <template #header>
        <div class="w-full" style="height: 200px; overflow: hidden">
          <img
            class="w-full"
            alt="user header"
            src="https://img.freepik.com/free-vector/isometric-iso-certification-concept_23-2148688049.jpg?t=st=1722839124~exp=1722842724~hmac=b90a53e769e83887ce53528cf256f628af13226b7db8182a0063a049393f1d79&w=996"
          />
        </div>
      </template>
      <template #title>
        <h3 class="m-0">{{ title }}</h3>
      </template>
      <!-- <template #subtitle>Card subtitle</template> -->
      <template #content>
        <p class="m-0">{{ subtitle }}</p>
      </template>
      <template #footer>
        <!-- <Button label="Cancel" severity="secondary" outlined class="w-full" />
          <Button label="Save" class="w-full" /> -->
        <template class="hidden md:block">
          <div
            class="flex align-items-center justify-content-center gap-2 mt-1"
          >
            <Select
              v-model="selectedPeriod"
              :options="periods"
              optionLabel="name"
              placeholder="Select period"
              style="width: 185px"
            />

            <Select
              v-model="selectedYear"
              :options="years"
              optionLabel="name"
              placeholder="Select year"
              style="width: 185px"
            />
            <!-- <Button
              label="Open"
              icon="pi pi-folder-open"
              class="px-3"
              @click="goTo()"
              :disabled="!selectedPeriod || !selectedYear"
            ></Button> -->

            <RouterLink :to="'/rsm/' + period_id"
              ><Button
                :disabled="!selectedPeriod || !selectedYear"
                type="button"
                >Open</Button
              ></RouterLink
            >
          </div>
        </template>

        <template class="block md:hidden">
          <div
            class="flex flex-wrap align-items-center justify-content-center gap-3 mt-1"
          >
            <Select
              v-model="selectedPeriod"
              :options="periods"
              optionLabel="name"
              placeholder="Select period"
              class="w-full"
            />

            <Select
              v-model="selectedYear"
              :options="years"
              optionLabel="name"
              placeholder="Select year"
              class="w-full"
            />
            <!-- <Button
              type="button"
              label="Open"
              icon="pi pi-folder-open"
              class="px-8"
              @click="goTo()"
              :disabled="!selectedPeriod || !selectedYear"
            ></Button> -->
            <RouterLink :to="'/rsm/' + period_id"
              ><Button
                type="button"
                :disabled="!selectedPeriod || !selectedYear"
                >Open</Button
              ></RouterLink
            >
          </div>
        </template>
      </template>
    </Card>
  </div>
</template>
<script setup>
import router from "@/router";
import axios from "axios";
import { ref, watch } from "vue";

const selectedYear = ref();
const selectedPeriod = ref();
const period_id = ref();

const props = defineProps(["title", "subtitle", "path"]);

const years = ref([
  { name: "2024", code: "2024" },
  { name: "2023", code: "2023" },
]);

const periods = ref([
  { name: "January - June", code: "January - June" },
  { name: "July - December", code: "July - December" },
]);

watch(selectedYear, (newValue, oldValue) => {
  if (newValue && selectedPeriod.value) {
    getPeriodId();
  }
});

watch(selectedPeriod, (newValue, oldValue) => {
  if (newValue && selectedYear.value) {
    getPeriodId();
  }
});

async function getPeriodId() {
  await axios
    .post("/api/getPeriodId", {
      selectedPeriod: selectedPeriod.value.code,
      selectedYear: selectedYear.value.code,
    })
    .then(({ data }) => {
      period_id.value = data;
    });
}
</script>
