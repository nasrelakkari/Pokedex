<template>
  <div class="register">
    <h2 class="register__title">Login</h2>
    <base-form
      :initialValues="initialValues"
      :textBtn="'Login'"
      hasMandatoryField
      @submit="submit"
    >
      <base-input
        class="mb-5 mt-5"
        name="username"
        :label="'Username'"
        rules="required"
      />

      <base-input
        class="mb-5"
        name="password"
        :label="'Password'"
        :type="'password'"
        rules="required"
      />
    </base-form>
  </div>
</template>

<script setup lang="ts">
import BaseForm from "@/components/ui/BaseForm.vue";
import BaseInput from "@/components/ui/BaseInput.vue";
import { useValidator } from "@/composables/validator";
import { useNavigation } from "@/composables/navigation";
import { Login } from "@/interfaces/User";
import { RoutesEnum } from "@/interfaces/Router";
import { useAuthStore } from "@/store/auth";
import { reactive } from "vue";

const authStore = useAuthStore();
const { emailRule } = useValidator();
const { goToPage } = useNavigation();

const initialValues = reactive<Login>({
  username: "",
  password: "",
});

const submit = async (val: unknown) => {
  const formValue = val as Login;
  await authStore.login(formValue);
  const accessToken = window.localStorage.getItem("access");
  if (accessToken) {
    await authStore.getUser();
    goToPage(RoutesEnum.HOME);
  }
};
</script>

<style lang="scss" scoped>
.register {
  max-width: 700px;
  margin: 50px auto;
  border: 1px solid #b6afb5;
  padding: 20px;
  border-radius: 20px;

  &__title {
    color: #222121;
    letter-spacing: 2px;
    text-transform: uppercase;
  }
}
</style>
