<template>
  <div class="shadow border rounded py-1 px-3 mb-2">
    <span class="input_label">
      {{ label }}
    </span>
    <label v-for="{ title, value } in options" :key="value" class="checkbox_label">
      <input type="checkbox" class="checkbox my-2" @input="onInput($event, value)" :checked="isChecked(value)" />
      <span class="text-sm">
        {{ title }}
      </span>
    </label>
  </div>
</template>

<script>
export default {
  name: "InputCheckboxGroup",
  props: {
    label: {
      type: String,
      default: "",
      required: true,
    },
    options: {
      type: Array,
      default: () => [],
      validator(value) {
        const isValid = value.every((x) => "title" in x && "value" in x);
        if (!isValid)
          console.error(
            'InputCheckboxGroup: every object must have a "title" and a "value"'
          );
        return isValid;
      },
    },
    modelValue: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    isChecked(value) {
      return this.modelValue.includes(value);
    },
    onInput(e, value) {
      const { checked } = e.target;
      const selections = [...this.modelValue];
      if (checked) selections.push(value);
      else {
        const index = selections.indexOf(value);
        selections.splice(index, 1);
      }
      this.$emit("update:modelValue", selections);
    },
  },
};
</script>