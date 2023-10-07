<script setup lang="ts">
import { Input } from "@progress/kendo-vue-inputs";
interface InputProps {
  modelValue: string;
  placeholder?: string;
  disabled?: boolean;
  type?: string;
}
const props = withDefaults(defineProps<InputProps>(), {
  disabled: false,
  type: "text",
});
const emit = defineEmits(["update:modelValue", "focus", "blur"]);

const change = (e: any) => {
  emit("update:modelValue", e.value);
};
const focus = (e: any) => {
  emit("focus", e);
};
const blur = (e: any) => {
  emit("blur", e);
};
</script>

<template>
  <div class="k-form-field-wrap">
    <Input
      :value="modelValue"
      :disabled="disabled"
      :placeholder="placeholder"
      :type="type"
      @input="change"
      @blur="focus"
      @focus="blur"
    />
  </div>
</template>

<style scoped></style>
