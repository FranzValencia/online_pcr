<script setup>
import { ref } from "vue";
import router from "@/router";
import { useAuthStore } from "@/stores/auth";
const auth = useAuthStore();

const items = ref([
  {
    label: "Dashboard",
    icon: "pi pi-home",
    to: "/dashboard",
  },
  {
    label: "Rating Scale Matrix",
    icon: "pi pi-star",
    to: "/rsm",
  },
  /*
  {
    label: "Projects",
    icon: "pi pi-search",
    items: [
      {
        label: "Core",
        icon: "pi pi-bolt",
        shortcut: "⌘+S",
      },
      {
        label: "Blocks",
        icon: "pi pi-server",
        shortcut: "⌘+B",
      },
      {
        label: "UI Kit",
        icon: "pi pi-pencil",
        shortcut: "⌘+U",
      },
      {
        separator: true,
      },
      {
        label: "Templates",
        icon: "pi pi-palette",
        items: [
          {
            label: "Apollo",
            icon: "pi pi-palette",
            badge: 2,
          },
          {
            label: "Ultima",
            icon: "pi pi-palette",
            badge: 3,
          },
        ],
      },
    ],
  },
  {
    label: "Contact",
    icon: "pi pi-envelope",
    badge: 3,
  },
  */
]);

function navigate(to) {
  router.push(to, { replace: true });
}
</script>

<template>
  <Menubar :model="items" v-if="auth.isAuthenticated">
    <template #start>
      <img src="/favicon.ico" alt="Online PCR" style="width: 50px" />
    </template>
    <template
      #item="{ item, props, hasSubmenu, root }"
      v-if="auth.isAuthenticated"
    >
      <a
        v-ripple
        class="flex items-center"
        v-bind="props.action"
        @click.prevent="navigate(item.to)"
      >
        <span :class="item.icon" />
        <span class="ml-2">{{ item.label }}</span>
        <Badge
          v-if="item.badge"
          :class="{ 'ml-auto': !root, 'ml-2': root }"
          :value="item.badge"
        />
        <span
          v-if="item.shortcut"
          class="ml-auto border border-surface rounded bg-emphasis text-muted-color text-xs p-1"
          >{{ item.shortcut }}</span
        >
        <i
          v-if="hasSubmenu"
          :class="[
            'pi pi-angle-down',
            { 'pi-angle-down ml-2': root, 'pi-angle-right ml-auto': !root },
          ]"
        ></i>
      </a>
    </template>

    <template #end>
      <div class="flex items-center gap-2">
        <div class="p-3 hidden md:block">
          {{
            auth.isAuthenticated ? auth.user.employee_information.full_name : ""
          }}
        </div>
        <!-- <i class="pi pi-sign-out"></i>
        Logout -->

        <Button
          severity="secondary"
          @click="auth.logoutUser()"
          icon="pi pi-sign-out"
          aria-label="logout"
        />

        <!-- <InputText placeholder="Search" type="text" class="w-32 sm:w-auto" />
        <Avatar
          image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png"
          shape="circle"
        /> -->
      </div>
    </template>
  </Menubar>
  <Menubar v-else>
    <template #start>
      <img src="/favicon.ico" alt="Online PCR" style="width: 50px" />
      <div class="mx-2">Online SPMS</div>
    </template>
  </Menubar>
</template>
