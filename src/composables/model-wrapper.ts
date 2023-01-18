import { computed, ref } from "vue";

export function useModelWrapper<T = unknown>(
  props: { [key: string]: unknown },
  emit: Function,
  name = "modelValue"
) {
  const baseVal = ref();

  return computed<T>({
    get: () => (props[name] ? props[name] : baseVal.value),
    set: (value) => {
      baseVal.value = value;
      emit(`update:${name}`, value);
    },
  });
}
