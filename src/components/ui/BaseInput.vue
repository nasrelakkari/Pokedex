<template>
  <div class="base-input" :class="{ 'base-input--no-border': noBorder }">
    <div>
      <label
        v-if="label"
        class="d-inline-block mb-1"
        :class="{ 'base-input__label--bold': isLabelBold }"
      >
        {{ label }}
        <span v-if="isMandatory" class="pl-1">*</span>
      </label>
      <div v-if="note" class="base-input__note mb-1">{{ note }}</div>
      <slot>
        <field
          @blur="$emit('blur')"
          v-model="model"
          :name="name"
          :rules="rules"
          :validate-on-input="!!fieldError"
          as="input"
          :type="type"
        />
      </slot>
      <vee-error-message
        as="p"
        :name="name"
        v-slot="{ message }"
        class="field-error error mt-2"
      >
        {{ message }}
      </vee-error-message>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useModelWrapper } from "@/composables/model-wrapper";
import {
  ErrorMessage as VeeErrorMessage,
  Field,
  RuleExpression,
  useFieldError,
} from "vee-validate";
import { defineEmits, defineProps, withDefaults } from "vue";

interface Props {
  label?: string;
  note?: string;
  name: string;
  isMandatory?: boolean;
  modelValue?: string | number;
  rules: RuleExpression<unknown>;
  noBorder?: boolean;
  isLabelBold?: boolean;
  type?: string;
}

const props = withDefaults(defineProps<Props>(), {
  isMandatory: true,
  noBorder: false,
  rules: () => true,
  type: "text",
});

const emit = defineEmits<{
  (event: "update:modelValue", modelValue: string | number): void;
  (event: "blur"): void;
}>();

const fieldError = useFieldError(props.name);
const model = useModelWrapper<typeof props.modelValue>(
  props,
  emit,
  "modelValue"
);
</script>

<style lang="scss">
.base-input {
  &__label {
    &--bold {
      font-weight: 800;
    }
  }

  &__note {
    font-size: 14px;
  }

  input {
    border: 1px solid #b6afb5;
    border-radius: size(5);
    outline: none;
    padding: 9px 12px;
    width: 100%;
    line-height: 20px;

    .error {
      border: 1px solid #da380b;
    }
  }

  &--no-border {
    input {
      border: none;
    }
  }
}
</style>
