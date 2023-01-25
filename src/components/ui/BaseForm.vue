<template>
  <base-loader v-if="loading"></base-loader>
  <vee-form
    v-else
    @submit="submit"
    :initialValues="initialValues"
    @invalid-submit="onInvalidSubmitScroll"
  >
    <p v-if="hasMandatoryField" class="mt-5">* required fields</p>
    <slot></slot>
    <base-button v-if="!noBtn" class="mt-7" type="submit">{{
      textBtnWithDefault
    }}</base-button>
  </vee-form>
</template>

<script setup lang="ts">
import BaseButton from "@/components/ui/BaseButton.vue";
import BaseLoader from "@/components/ui/BaseLoader.vue";
import { useInvalidSubmitScroll } from "@/composables/use-invalid-submit-scroll";
import { computed } from "@vue/reactivity";
import { Form as VeeForm } from "vee-validate";
import { defineEmits, defineProps, withDefaults } from "vue";

interface Props {
  hasMandatoryField?: boolean;
  textBtn: string;
  initialValues?: Object;
  noBtn?: boolean;
  loading?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  hasMandatoryField: false,
  textBtn: "",
  noBtn: false,
  loading: false,
});

const textBtnWithDefault = computed(() => {
  return props.textBtn ? props.textBtn : "Valide";
});

const emit = defineEmits<{
  (event: "submit", val: unknown): void;
}>();

const { onInvalidSubmitScroll } = useInvalidSubmitScroll();

const submit = (val: unknown) => {
  emit("submit", val);
};
</script>
