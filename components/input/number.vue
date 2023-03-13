<template>
  <label class="input_label">
    {{ label }}
    <input type="number" class="input" @input="onInput" :placeholder="label" :value="modelValue" />
  </label>
</template>

<script>
export default {
  name: "InputNumber",
  props: {
    label: {
      type: String,
      default: "",
      required: true,
    },
    modelValue: Number,
  },
  methods: {
    onInput(e) {
      this.$emit("update:modelValue", Number(e.target.value));
    },
  },
};
</script>