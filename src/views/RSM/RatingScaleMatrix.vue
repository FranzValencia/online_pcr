<template>
  <div class="mt-3">
    <h1 class="m-0 w-full flex align-items-center justify-content-center">
      Rating Scale Matrix
    </h1>
    <h3 class="m-0 w-full flex align-items-center justify-content-center">
      {{ post ? post.data.department.department : "" }}
    </h3>
    <h3 class="m-0 w-full flex align-items-center justify-content-center">
      {{ post ? post.data.period + " " + post.data.year : "" }}
    </h3>
  </div>

  <table class="mt-5" v-if="!loading">
    <thead>
      <tr>
        <th>MFO</th>
        <th>SUCCESS INDICATOR</th>
        <th>PERFORMANCE MEASURE</th>
        <th>QUALITY</th>
        <th>EFFICIENCY</th>
        <th>TIMELINESS</th>
        <th>PERSONNEL INCHARGE</th>
        <th>OPTIONS</th>
      </tr>
    </thead>
    <template v-for="(row, i) in post ? post.data.rows : []">
      <!-- 
      | if row has no success indicator
      | 
       -->
      <template v-if="!row.has_si">
        <tr>
          <td colspan="8" class="mx-5">
            <div
              class="flex"
              :style="'margin-left: ' + row.indent * 20 + 'px;'"
            >
              <div class="m-0">
                {{ row.cf_count }}
              </div>
              <div class="mx-3">
                {{ row.cf_title }}
              </div>
            </div>
          </td>
        </tr>
      </template>
      <template v-else>
        <template v-for="(si, s) in row.success_indicators">
          <tr>
            <td v-if="s == 0" :rowspan="row.num_si">
              <div
                class="w-full flex"
                :style="'margin-left: ' + row.indent * 20 + 'px;'"
              >
                <div class="m-0">
                  {{ row.cf_count }}
                </div>
                <div class="mx-3">
                  {{ row.cf_title }}
                </div>
              </div>
            </td>
            <td>
              {{ si.mi_succIn }}
            </td>
            <td>
              <div class="m-0">{{ si.quality ? "Quality" : "" }}</div>
              <div class="m-0">{{ si.effeciency ? "Efficiency" : "" }}</div>
              <div class="m-0">{{ si.timeliness ? "Timeliness" : "" }}</div>
            </td>
            <td style="vertical-align: text-top !important">
              <PerformanceMeasures :measure="si.quality" />
            </td>
            <td style="vertical-align: text-top !important">
              <PerformanceMeasures :measure="si.effeciency" />
            </td>
            <td style="vertical-align: text-top !important">
              <PerformanceMeasures :measure="si.timeliness" />
            </td>
            <td>
              {{ si.personnel }}
            </td>
            <td style="vertical-align: middle">
              <div class="gap-1">
                <Button
                  @click="editSi(si)"
                  class="mt-2"
                  size="small"
                  icon="pi pi-pen-to-square"
                  severity="success"
                ></Button>
                <Button
                  @click="showTemplate($event, si, i, s)"
                  icon="pi pi-trash"
                  class="mt-2"
                  size="small"
                  severity="danger"
                ></Button>
              </div>
            </td>
          </tr>
        </template>
      </template>
    </template>
  </table>

  <!-- <template v-for="(item, i) in post ? post.data.rows : []">
    {{ item }}
  </template> -->

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

<script setup>
import axios from "axios";
import { ref, watch, computed } from "vue";
import { useRoute } from "vue-router";
import PerformanceMeasures from "@/components/RSM/PerformanceMeasures.vue";
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";

const confirm = useConfirm();
const toast = useToast();

const route = useRoute();

const loading = ref(false);
const post = ref(null);
const error = ref(null);

/**
 * https://router.vuejs.org/guide/advanced/data-fetching.html
 * fetching after navigation
 */

watch(() => route.params.id, fetchData, { immediate: true });

async function editSi(si) {
  console.log(si);
}

async function deleteSi(si) {
  console.log(si.mi_id);
}

async function fetchData(id) {
  error.value = post.value = null;
  loading.value = true;

  try {
    post.value = await axios.post("/api/getRsm", {
      period_id: route.params.id,
    });
    console.log(post.value.data.rows);
  } catch (err) {
    error.value = err.toString();
    console.log(error.value);
  } finally {
    loading.value = false;
  }
}

const showTemplate = (event, si, i, s) => {
  confirm.require({
    target: event.currentTarget,
    group: "templating",
    message:
      "Are you sure you want to delete this success indicator. <br/> <i>(" +
      si.mi_succIn +
      ")</i>",
    icon: "pi pi-exclamation-triangle",
    rejectProps: {
      icon: "pi pi-times",
      label: "Cancel",
      outlined: true,
    },
    acceptProps: {
      icon: "pi pi-check",
      label: "Confirm",
      severity: "danger",
    },
    accept: () => {
      /**
       * call delete api
       */
      axios.delete("/api/deleteSi/" + si.mi_id).then(({ data }) => {
        /**
         * make changes to already fetched post.value.data.rows instead of
         * calling fetchData() again which causes table to recompose
         */
        post.value.data.rows[i].success_indicators.splice(s, 1);
        post.value.data.rows[i].num_si -= 1;
        if (post.value.data.rows[i].num_si < 1) {
          post.value.data.rows[i].has_si = false;
        }

        toast.add({
          severity: "success",
          summary: "Deleted",
          detail: "Success Indicator deleted!",
          life: 3000,
        });
      });
    },
    // reject: () => {
    //   toast.add({
    //     severity: "error",
    //     summary: "Rejected",
    //     detail: "You have rejected",
    //     life: 3000,
    //   });
    // },
  });
};
</script>

<style>
table,
tr,
th,
td {
  border: 1px solid rgba(69, 0, 119, 0.278);
  border-collapse: collapse;
}

th {
  background-color: rgb(177 219 227 / 5%);
}

td {
  padding: 10px;
}
</style>
