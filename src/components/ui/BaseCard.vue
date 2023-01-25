<template>
  <div
    class="base-card pa-7"
    :class="{
      'base-card--has-hover': hasHover,
      'base-card--full-height': fullHeight,
    }"
  >
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { defineProps, withDefaults } from "vue";

interface Props {
  hasHover?: boolean;
  fullHeight?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  hasHover: false,
  fullHeight: false,
});
</script>

<style lang="scss" scoped>
.base-card {
  box-shadow: 1px 1px 30px 2px #4e324b1a;
  border-radius: 20px;
  position: relative;
  background-color: #ffffff;

  &--has-hover:hover {
    box-shadow: 1px 5px 30px 5px #4e324b4d;
  }

  &--full-height {
    height: 100%;
  }
}
</style>
