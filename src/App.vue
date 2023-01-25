<template>
  <v-app>
    <v-main>
      <navbar />
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import Navbar from "@/components/Navbar.vue";
import { useAuthStore } from "@/store/auth";
import { onMounted } from "vue";

const authStore = useAuthStore();

onMounted(async () => {
  await authStore.getUser();
});
</script>
