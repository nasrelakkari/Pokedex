<template>
  <div class="about">
    <base-form
      :initialValues="initialValues"
      :textBtn="'Sign In'"
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

      <base-input
        class="mb-5"
        name="email"
        :label="'E-mail'"
        rules="required"
      />
    </base-form>
  </div>
</template>

<script setup lang="ts">
import BaseForm from "@/components/ui/BaseForm.vue";
import BaseInput from "@/components/ui/BaseInput.vue";
import { Register } from "@/interfaces/User";
import { reactive } from "vue";

const initialValues = reactive<Register>({
  username: "",
  password: "",
  email: "",
});

const submit = async () => {
  console.log(initialValues);
};
</script>
