<template>
  <div class="base-snackbar text-center ma-2">
    <v-snackbar :color="snackbarColor" v-model="snackbar">
      {{ text }}

      <template v-slot:actions>
        <v-btn variant="text" @click="snackbar = false"> Close </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script setup lang="ts">
import { useModelWrapper } from "@/composables/model-wrapper";
import { computed } from "vue";

interface Props {
  modelValue: boolean;
  text: string;
  error?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  error: false,
});

const emit = defineEmits<{
  (event: "update:modelValue", isDisplay: boolean): void;
}>();

const snackbar = useModelWrapper<typeof props.modelValue>(
  props,
  emit,
  "modelValue"
);

const snackbarColor = computed(() => {
  return props.error ? "#dc143c" : "#3cb371";
});
</script>

<style lang="scss" scoped></style>
