<script setup>
import { ref, defineProps } from "vue";
import { useToast } from "primevue/usetoast";
import { useConfirm } from "primevue/useconfirm";
import MfoParentEditor from "./MfoParentEditor.vue";
import { useRsmStore } from "@/stores/rsm";
import { useRoute } from "vue-router";

const rsm = useRsmStore();

const props = defineProps(["mfo"]);
const position = ref("center");
const visible = ref(false);
const toast = useToast();
const confirm = useConfirm();
const route = useRoute();

const openPosition = (pos) => {
  position.value = pos;
  visible.value = true;
};

const saveMfoEdit = () => {
  toast.add({
    severity: "success",
    summary: "Saved",
    detail: "MFO edit/s saved!",
    life: 3000,
  });
};

const showTemplate = (event) => {
  confirm.require({
    target: event.currentTarget,
    group: "templating",
    message:
      "Are you sure you want to delete this MFO. <br/> <b>(" +
      props.mfo.cf_count +
      " " +
      props.mfo.cf_title +
      ")</b>",
    icon: "pi pi-exclamation-triangle",
    rejectProps: {
      icon: "pi pi-times",
      label: "Cancel",
      outlined: true,
    },
    acceptProps: {
      icon: "pi pi-check",
      label: "Delete",
      severity: "danger",
    },
    accept: () => {
      /**
       * call delete api
       */
      rsm.deleteMfo(props.mfo.cf_ID, route.params.id);
      visible.value = false;
      toast.add({
        severity: "success",
        summary: "Deleted",
        detail: "MFO deleted!",
        life: 3000,
      });
    },
  });
};
</script>

<template>
  <i
    class="pi pi-cog mr-2 text-green-700"
    @click="openPosition('left')"
    style="cursor: pointer"
  ></i>

  <Dialog
    v-model:visible="visible"
    header="Edit MFO"
    :position="position"
    :modal="true"
    :draggable="false"
  >
    <!-- {{ props.mfo }} -->
    <!-- FORM START -->
    <Divider align="center" type="solid">
      <b>Major Final Output</b>
    </Divider>
    <div class="flex">
      <div class="p-2 w-4">
        <label for="codeOrder">Code: </label>
        <InputText
          class="w-full mt-1"
          id="codeOrder"
          type="text"
          placeholder="eg: A., A.01..."
          v-model="props.mfo.cf_count"
        />
      </div>
      <div class="p-2 w-full">
        <label for="mfoTitle">Title: </label>
        <InputText
          class="w-full mt-1"
          id="mfoTitle"
          type="text"
          placeholder="eg: Facilitate the Collection / Submission of DPCR / SPCR IPCR (July 2021 - December 2021)"
          v-model="props.mfo.cf_title"
        />
      </div>
      <div class="p-1">
        <br />
        <Button
          class="mt-2"
          type="button"
          label="Save"
          icon="pi pi-save"
          @click="saveMfoEdit"
        ></Button>
      </div>
    </div>

    <!-- success indicator add button -->
    <Divider align="center" type="solid">
      <b>Success Indicator</b>
    </Divider>
    <div class="mt-2 flex justify-content-center">
      <Button
        class="w-6"
        label="Add Success Indicator"
        icon="pi pi-plus"
        severity="info"
      ></Button>
    </div>
    <!-- change mfo parent -->
    <Divider align="center" type="solid">
      <b>Change Parent</b>
    </Divider>
    <div class="mt-2 flex justify-content-center">
      <MfoParentEditor :cf_ID="mfo.cf_ID" :parent_id="mfo.parent_id" />
    </div>

    <!-- add sub final output -->
    <Divider align="center" type="solid">
      <b>Add Sub MFO</b>
    </Divider>
    <div class="flex">
      <div class="p-2 w-4">
        <label for="codeOrder">Code: </label>
        <InputText
          class="w-full mt-1"
          id="codeOrder"
          type="text"
          placeholder="eg: A., A.01..."
        />
      </div>
      <div class="p-2 w-full">
        <label for="mfoTitle">Title: </label>
        <InputText
          class="w-full mt-1"
          id="mfoTitle"
          type="text"
          placeholder="eg: Facilitate the Collection / Submission of DPCR / SPCR IPCR (July 2021 - December 2021)"
        />
      </div>
      <div class="p-1">
        <br />
        <Button
          class="mt-2"
          type="button"
          label="Add"
          icon="pi pi-plus"
        ></Button>
      </div>
    </div>

    <!-- delete mfo -->
    <Divider align="center" type="solid">
      <b>Delete MFO</b>
    </Divider>
    <div class="mt-2 flex justify-content-center">
      <Button
        class="w-6"
        label="Delete MFO"
        icon="pi pi-trash"
        severity="danger"
        @click="showTemplate($event)"
      ></Button>
    </div>
  </Dialog>
</template>
