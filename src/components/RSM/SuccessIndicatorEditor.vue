<script setup>
import { ref, defineProps, reactive } from "vue";

const props = defineProps(["mfo"]);
const visible = ref(false);
// const hasQuality = ref(false);
// const hasEfficiency = ref(false);
// const hasTimeliness = ref(false);
const metrics = ref([
  {
    name: "Quality",
    isChecked: false,
  },
  {
    name: "Efficiency",
    isChecked: false,
  },
  {
    name: "Timeliness",
    isChecked: false,
  },
]);

function showDialog() {
  visible.value = true;
}
</script>
<template>
  <Button
    class="w-6"
    label="Add Success Indicator"
    icon="pi pi-plus"
    severity="info"
    @click="showDialog"
  ></Button>

  <Dialog
    class="w-full md:w-6 m-5"
    v-model:visible="visible"
    modal
    header="Add Success Indicator for"
  >
    <div class="text-2xl mb-2">
      {{ props.mfo.cf_count }} {{ props.mfo.cf_title }}
    </div>
    <form @submit.prevent="" class="">
      <div class="p-2 w-full">
        <label for="si">Success Indicator: </label>
        <Textarea
          id="si"
          rows="5"
          placeholder="Enter success indicator here..."
          class="w-full m-2"
        />
      </div>
      <div class="flex items-center">
        <template v-for="(metric, m) in metrics">
          <div class="flex items-center m-2">
            <Checkbox
              :inputId="metric.name"
              :name="metric.name"
              v-model="metrics[0].isChecked"
            />
            <label :for="metric.name" class="ml-2">
              {{ metric.name }}
            </label>
          </div>
        </template>
      </div>
    </form>
    <div class="mt-3 flex justify-end gap-2">
      <Button
        type="button"
        label="Cancel"
        severity="secondary"
        @click="visible = false"
      ></Button>
    </div>
  </Dialog>
</template>
