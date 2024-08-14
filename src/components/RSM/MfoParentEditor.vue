<script setup>
import axios from "axios";
import { ref, defineProps } from "vue";
import { useRoute } from "vue-router";
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";
import { useRsmStore } from "@/stores/rsm";

const rsm = useRsmStore();

const confirm = useConfirm();
const toast = useToast();

const props = defineProps(["cf_ID", "parent_id"]);
const route = useRoute();

const visible = ref(false);
const period_id = ref(null);
const rows = ref([]);
const isLoading = ref(false);

function showDialog() {
  period_id.value = route.params.id;
  fetchData().then(() => {
    visible.value = true;
  });
}

async function fetchData() {
  isLoading.value = true;
  try {
    await axios
      .post("/api/getRsmMfos", {
        period_id: period_id.value,
        cf_ID: props.cf_ID,
        parent_id: props.parent_id,
      })
      .then(({ data }) => {
        rows.value = data.rows;
      });
  } catch (error) {
    console.log(error);
  } finally {
    isLoading.value = false;
  }
}

const showTemplate = (event, new_parent_id) => {
  confirm.require({
    target: event.currentTarget,
    group: "templating",
    message: "Are you sure you want to move this MFO.",
    icon: "pi pi-exclamation-triangle",
    rejectProps: {
      icon: "pi pi-times",
      label: "Cancel",
      outlined: true,
    },
    acceptProps: {
      icon: "pi pi-check",
      label: "Move",
      severity: "warn",
    },
    accept: () => {
      /**
       * call delete api
       */
      moveToNewParent(new_parent_id).then(({ data }) => {
        fetchData().then(() => {
          rsm.getRows(route.params.id);
        });
      });

      toast.add({
        severity: "success",
        summary: "Moved",
        detail: "MFO moved to new parent!",
        life: 3000,
      });
    },
  });
};

async function moveToNewParent(new_parent_id) {
  // console.log(props.cf_ID + " moved to " + new_parent_id);
  const res = await axios.post("/api/moveMfoToNewParent", {
    cf_ID: props.cf_ID,
    new_parent_id: new_parent_id,
  });

  return res;
}
</script>
<template>
  <Button
    class="w-6"
    label="Change MFO Parent"
    icon="pi pi-sort-alt"
    severity="contrast"
    @click="showDialog"
    :loading="isLoading"
  ></Button>

  <Dialog v-model:visible="visible" modal header="Change MFO Parent">
    <table>
      <template v-for="row in rows">
        <tr>
          <td>
            <p class="m-0" :style="'text-indent:' + row.indent * 50 + 'px;'">
              {{ row.cf_count }} {{ row.cf_title }}
            </p>
          </td>
          <td>
            <Button
              label="Move under this MFO"
              v-if="!row.isDisabled"
              @click="showTemplate($event, row.cf_ID)"
            ></Button>
          </td>
        </tr>
      </template>
    </table>

    <div class="flex justify-end gap-2">
      <Button
        type="button"
        label="Close"
        severity="secondary"
        @click="visible = false"
      ></Button>
    </div>
  </Dialog>
</template>
