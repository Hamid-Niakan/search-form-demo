<template>
  <label class="checkbox_label">
    <input class="checkbox" type="checkbox" :checked="modelValue" @input="onInput">
    <span class="text-sm">
      {{ label }}
    </span>
  </label>
</template>

<script>
export default {
  name: "InputCheckbox",
  props: {
    label: {
      type: String,
      default: "",
      required: true,
    },
    modelValue: Boolean,
  },
  methods: {
    onInput(e) {
      this.$emit("update:modelValue", e.target.checked);
    },
  },
};
</script>