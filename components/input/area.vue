<template>
  <label class="input_label">
    {{ label }}
    <textarea class="input resize-none" :placeholder="label" cols="30" rows="5" :value="modelValue" @input="onInput"></textarea>
  </label>
</template>

<script>
export default {
  name: "InputArea",
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