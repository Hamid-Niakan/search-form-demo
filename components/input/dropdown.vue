<template>
  <div class="inline-block relative w-full">
    <div class="pointer-events-none absolute inset-y-12 left-0 flex items-center px-2 text-gray-700">
      <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
    </div>

    <label class="input_label">
      {{ label }}
      <select class="select" @input="onInput">
        <option :selected="!modelValue" value="">
          یک مورد را انتخاب کنید
        </option>
        <option v-for="{ title, value } in options" :key="value" :value="value" :selected="isSelected(value)">
          {{ title }}
        </option>
      </select>
    </label>
  </div>
</template>

<script>
export default {
  name: "InputDropdown",
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
            'InputDropdown: every object must have a "title" and a "value"'
          );
        return isValid;
      },
    },
    modelValue: String,
  },
  methods: {
    isSelected(value) {
      return this.modelValue === value;
    },
    onInput(e) {
      this.$emit("update:modelValue", e.target.value);
    },
  },
};
</script>