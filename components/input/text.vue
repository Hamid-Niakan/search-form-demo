<template>
  <label class="input_label">
    {{ label }}
    <input type="text" class="input" @input="onInput" :placeholder="label" :value="modelValue" />
  </label>
</template>

<script>
export default {
  name: "InputText",
  props: {
    label: {
      type: String,
      default: "",
      required: true,
    },
    modelValue: String,
  },
  methods: {
    onInput(e) {
      this.$emit("update:modelValue", e.target.value);
    },
  },
};
</script>