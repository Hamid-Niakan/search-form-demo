<template>
  <div>
    <InputText
      v-if="filter.type === 'text'"
      :label="filter.label"
      :model-value="filterState[filter.name]"
      @update:modelValue="onChange(filter.name, $event, $router)" />
  
    <InputCheckbox
      v-else-if="filter.type === 'checkbox'"
      :label="filter.label"
      :model-value="filterState[filter.name]"
      @update:modelValue="onChange(filter.name, $event, $router)" />
    
    <InputCheckboxGroup
      v-else-if="filter.type === 'checkbox-group'"
      :label="filter.label"
      :options="filter.options"
      :model-value="filterState[filter.name]"
      @update:modelValue="onChange(filter.name, $event, $router)" />

    <InputRange
      v-else-if="filter.type === 'number'"
      :label="filter.label"
      :model-value="filterState[filter.name]"
      @update:modelValue="onChange(filter.name, $event, $router)" />

    <InputDropdown
    v-else :label="filter.label" :options="filter.options" @update:modelValue="onChange(filter.name, $event, $router)" />
  </div>
</template>

<script>
import { mapState, mapActions } from "pinia";
import { useFilterStore } from "~~/stores/filter";

export default {
  name: "AppFilters",
  props: {
    filter: {
      type: Object,
      default: () => ({}),
      required: true,
    },
  },
  computed: {
    ...mapState(useFilterStore, ["filterState"]),
  },
  methods: {
    ...mapActions(useFilterStore, ["onChange"]),
  },
};
</script>