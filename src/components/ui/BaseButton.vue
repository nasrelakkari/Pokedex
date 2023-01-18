<template>
  <button :type="type" class="base-button" :class="baseButtonColor">
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
import { computed, PropType, defineProps } from "vue";

const props = defineProps({
  color: { type: String as PropType<"red" | "blue"> },
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
  background-color: #1172d9;
  color: #ffffff;
  padding: 10px 20px;
  border-radius: 10px;

  &:focus-visible {
    outline: none;
  }

  &--red {
    background-color: #feece7;
    color: #da380b;
  }

  &--blue {
    background-color: #e7f2fd;
    color: #1172d9;
  }
}
</style>
