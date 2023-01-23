<template>
  <nav class="navbar">
    <img
      class="navbar__logo"
      alt="logo"
      :src="require('../assets/img/logo.png')"
      @click="goToPage(RoutesEnum.HOME)"
    />
    <div v-if="!user" class="navbar__navs">
      <base-button @click="goToPage(RoutesEnum.LOGIN)">Login</base-button>
      <base-button @click="goToPage(RoutesEnum.REGISTER)" class="ml-10"
        >Sign in</base-button
      >
    </div>
    <div v-else class="navbar__navs">
      <span class="navbar__navs__username mr-8"
        >Hey, {{ user.username }} 👋</span
      >
      <base-button @click="logout">Logout</base-button>
    </div>
  </nav>
</template>

<script setup lang="ts">
import BaseButton from "@/components/ui/BaseButton.vue";
import { useNavigation } from "@/composables/navigation";
import { RoutesEnum } from "@/interfaces/Router";
import { useAuthStore } from "@/store/auth";
import { storeToRefs } from "pinia";

const authStore = useAuthStore();
const { goToPage } = useNavigation();
const { user } = storeToRefs(authStore);

const logout = () => {
  authStore.user = undefined;
  goToPage(RoutesEnum.LOGIN);
  window.localStorage.removeItem("access");
  window.localStorage.removeItem("refresh");
};
</script>

<style lang="scss" scoped>
.navbar {
  display: flex;
  align-items: center;
  max-width: 80%;
  margin: 20px auto;

  &__logo {
    width: 190px;
    cursor: pointer;
  }

  &__navs {
    margin-left: auto;

    &__username {
      font-size: 22px;
    }
  }
}
</style>
