<template>
  <button :type="type" class="base-button" :class="baseButtonColor">
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
import { computed, PropType, defineProps } from "vue";

const props = defineProps({
  color: { type: String as PropType<"red" | "green"> },
  type: { type: String as PropType<"submit"> },
});

const baseButtonColor = computed(() => {
  return props.color ? `base-button--${props.color}` : "";
});
</script>

<style lang="scss" scoped>
.base-button {
  cursor: pointer;
  font-weight: 800;
  background-color: #ffffff;
  color: #222121;
  border: 1px solid #222121;
  padding: 10px 20px;
  border-radius: 10px;

  &:focus-visible {
    outline: none;
  }

  &--red {
    background-color: #ffffff;
    color: #da380b;
    border: 1px solid #da380b;
  }

  &--green {
    background-color: #ffffff;
    color: #3cb371;
    border: 1px solid #3cb371;
  }
}
</style>
