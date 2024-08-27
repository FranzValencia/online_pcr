<script setup>
import axios from "axios";
import { ref, defineProps, reactive, onMounted } from "vue";

const props = defineProps(["mfo", "si", "label", "icon"]);
const visible = ref(false);
const selectedEmployees = ref();
const employees = ref([]);

const inputs = ref({
  mi_id: null,
  cf_ID: null,
  mi_succIn: null,
});

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

function toggleTest() {
  console.log((metrics.value[0].isChecked = !metrics.value[0].isChecked));
}

function showDialog() {
  inputs.value.mi_id = props.si.mi_id;
  inputs.value.cf_ID = props.si.cf_ID;
  inputs.value.mi_succIn = props.si.mi_succIn;
  visible.value = true;
}

async function getAllEmployees() {
  const res = await axios.get("/api/getAllEmployees");
  return res.data;
}

onMounted(() => {
  getAllEmployees().then((data) => {
    employees.value = data;
  });
});
</script>
<template>
  <Button
    :label="props.label"
    :icon="props.icon"
    severity="info"
    @click="showDialog"
  ></Button>

  <Dialog
    class="w-full md:w-6 m-5"
    v-model:visible="visible"
    modal
    :header="`Add Success Indicator for - ${props.mfo.cf_count} ${props.mfo.cf_title}`"
  >
    {{ props.si }}
    <!-- <div class="text-2xl mb-2">
      {{ props.mfo.cf_count }} {{ props.mfo.cf_title }}
    </div> -->
    <form @submit.prevent="" class="">
      <div class="p-2 w-full">
        <label class="font-semibold" for="si">Success Indicator: </label>
        <Textarea
          id="si"
          rows="5"
          placeholder="Enter success indicator here..."
          class="w-full mx-2 mt-2"
        />
      </div>

      <!-- <Divider align="center" type="dotted"> Measures </Divider> -->
      <div class="pl-2 w-full">
        <label class="font-semibold" for="si">Measures: </label>
      </div>
      <div class="flex justify-content-left pl-2">
        <template v-for="(metric, m) in metrics">
          <div class="flex items-center m-2">
            <Checkbox
              binary
              :inputId="metric.name"
              :name="metric.name"
              v-model="metrics[m].isChecked"
            />
            <label :for="metric.name" class="ml-2">
              {{ metric.name }}
            </label>
          </div>
        </template>
      </div>
      <div class="justify-content-center m-3">
        <template v-for="(metric, m) in metrics">
          <div class="w-full m-3 font-semibold" v-if="metric.isChecked">
            <div class="my-2">{{ metric.name }}</div>
            <template v-for="score in 5">
              <InputGroup>
                <InputGroupAddon>
                  <b>{{ 5 - score + 1 }}</b>
                </InputGroupAddon>
                <InputText />
              </InputGroup>
            </template>
          </div>
        </template>
      </div>

      <!-- in-charges -->
      <div class="p-2 w-full">
        <label class="font-semibold" for="si">Incharge: </label>
        <MultiSelect
          v-model="selectedEmployees"
          display="chip"
          :options="employees"
          optionLabel="name"
          filter
          placeholder="Select employee/s in-charge"
          :maxSelectedLabels="3"
          class="w-full md:w-80"
        />
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
