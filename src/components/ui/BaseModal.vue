<template>
  <v-dialog
    class="base-modal"
    v-model="dialog"
    :fullscreen="display.mobile.value"
  >
    <base-card class="base-modal__card pa-7">
      <div class="d-flex align-center justify-space-between">
        <h2 class="title title--medium">{{ title }}</h2>
        <img
          alt="close icon"
          :src="require('@/assets/img/icons/icon-close.svg')"
          @click="dialog = false"
          class="cursor-pointer"
        />
      </div>
      <slot></slot>
    </base-card>
  </v-dialog>
</template>

<script setup lang="ts">
import BaseCard from "@/components/ui/BaseCard.vue";
import { useModelWrapper } from "@/composables/model-wrapper";
import { useDisplay } from "vuetify";
import { defineEmits, defineProps } from "vue";

const props = defineProps<{
  modelValue: boolean;
  title: string;
}>();

const emit = defineEmits<{
  (event: "update:modelValue", isDisplay: boolean): void;
}>();

const display = useDisplay();

const dialog = useModelWrapper<typeof props.modelValue>(
  props,
  emit,
  "modelValue"
);
</script>

<style lang="scss">
.base-modal {
  &__card {
    min-height: 100%;
    overflow-y: auto;
  }

  &.v-dialog {
    .v-overlay__content {
      max-height: 100%;
      width: 100%;
      border-radius: 20px;
      overflow-y: auto;

      &::-webkit-scrollbar {
        display: none;
      }

      &.v-overlay-scroll-blocked {
        overflow-y: auto !important;
        padding-inline-end: 0;
      }

      @media (min-width: 1280px) {
        max-width: 850px;
      }
    }
  }
}
</style>
