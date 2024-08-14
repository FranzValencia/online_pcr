<script setup>
import axios from "axios";
import { ref, watch, computed } from "vue";
import { useRoute } from "vue-router";
import PerformanceMeasures from "@/components/RSM/PerformanceMeasures.vue";
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";
import MfoEditor from "@/components/RSM/MfoEditor.vue";
import { useRsmStore } from "@/stores/rsm";

const rsm = useRsmStore();
const confirm = useConfirm();
const toast = useToast();

const route = useRoute();

const loading = ref(false);
const post = ref(null);
const title = ref(null);
const error = ref(null);

const newMfo = ref({
  period_id: route.params.id,
  cf_count: null,
  cf_title: null,
});

/**
 * https://router.vuejs.org/guide/advanced/data-fetching.html
 * fetching after navigation
 */

watch(() => route.params.id, onPeriodIdChange, { immediate: true });

const isEmpty = computed(() => {
  return rsm.rows.length < 1 ? true : false;
});

async function addNewMfo() {
  // console.log(newMfo.value);
  try {
    await rsm.addNewMfo(newMfo.value);
  } catch (error) {
  } finally {
    newMfo.value.cf_count = null;
    newMfo.value.cf_title = null;
  }
}

async function editSi(si) {
  console.log(si);
}

async function deleteSi(si) {
  console.log(si.mi_id);
}

async function onPeriodIdChange() {
  const period_id = route.params.id;
  error.value = post.value = null;
  loading.value = true;
  try {
    rsm.getTitle(period_id);
  } catch (err) {
    error.value = err.toString();
  } finally {
    rsm.getRows(period_id).then(() => {
      loading.value = false;
    });
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
      axios.delete("/api/si/" + si.mi_id).then(({ data }) => {
        /**
         * make changes to already fetched post.value.data.rows instead of
         * calling fetchData() again which causes table to recompose
         */
        // rsm.rows[i].success_indicators.splice(s, 1);
        // rsm.rows[i].num_si -= 1;
        // if (rsm.rows[i].num_si < 1) {
        //   rsm.rows[i].has_si = false;
        // }

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

<template>
  <div class="mt-3">
    <h1 class="m-0 w-full flex align-items-center justify-content-center">
      Rating Scale Matrix
    </h1>
    <h3 class="m-0 w-full flex align-items-center justify-content-center">
      <!-- {{ title ? title.data.department.department : "" }} -->
      {{ rsm.department }}
    </h3>
    <h3 class="m-0 w-full flex align-items-center justify-content-center">
      <!-- {{ title ? title.data.period + " " + title.data.year : "" }} -->
      {{ rsm.period }}
    </h3>
  </div>

  <template v-if="loading">
    <div class="gap-2 m-2" v-for="(count, i) in 20">
      <Skeleton class="w-2" height="2rem"></Skeleton>
      <div class="flex gap-2 m-2 ml-6" v-for="si in 3">
        <Skeleton v-for="skel in 4" class="w-3" height="2rem"></Skeleton>
      </div>
    </div>
  </template>

  <table v-else class="mt-5 w-full">
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

    <template v-if="!isEmpty" v-for="(row, i) in rsm ? rsm.rows : []">
      <!-- 
      | if row has no success indicator
      | 
       -->
      <template v-if="!row.has_si">
        <tr>
          <td colspan="8" class="mx-5">
            <div
              class="flex"
              :style="'padding-left: ' + row.indent * 20 + 'px;'"
            >
              <p class="m-0">
                <MfoEditor :mfo="row" />
                {{ row.cf_count }}
                {{ row.cf_title }}
              </p>
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
                :style="'padding-left: ' + row.indent * 20 + 'px;'"
              >
                <p class="m-0">
                  <MfoEditor :mfo="row" />
                  {{ row.cf_count }}
                  {{ row.cf_title }}
                </p>
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

    <template v-else>
      <tr>
        <td
          colspan="8"
          style="text-align: center; font-size: 24px; color: grey"
        >
          --No Rating Scale Matrix--
        </td>
      </tr>
    </template>
  </table>

  <form class="flex md:w-5 mt-3" @submit.prevent="addNewMfo">
    <div class="p-2 w-4">
      <label for="cf_count">Code: </label>
      <InputText
        class="w-full mt-1"
        id="cf_count"
        type="text"
        placeholder="eg: A., A.01..."
        v-model="newMfo.cf_count"
        autocomplete="off"
      />
    </div>
    <div class="p-2 w-full">
      <label for="cf_title">Title: </label>
      <InputText
        class="w-full mt-1"
        id="cf_title"
        type="text"
        placeholder="eg: Facilitate the Collection / Submission of DPCR / SPCR IPCR (July 2021 - December 2021)"
        v-model="newMfo.cf_title"
        autocomplete="off"
      />
    </div>
    <div class="p-1">
      <br />
      <Button class="mt-2" type="submit" label="Add" icon="pi pi-plus"></Button>
    </div>
  </form>

  <!-- <template v-for="(item, i) in post ? post.data.rows : []">
    {{ item }}
  </template> -->
</template>

<style>
table,
tr,
th,
td {
  border: 1px solid rgba(69, 0, 119, 0.278);
  border-collapse: collapse;
  font-size: 14px;
}

th {
  background-color: rgb(177 219 227 / 5%);
}

td {
  padding: 10px;
}
</style>
