<template>
  <label class="input_label">
    {{ `${label} از ${modelValue[0] || min} تا ${modelValue[1] || max}` }}
    <div class="mt-2 relative pb-5 w-full">
      <div class="w-full slider"></div>
      <input
        type="range"
        class="w-full range range-min"
        :min="min"
        :max="max"
        :value="modelValue[0] || min"
        @input="onInput($event, 'min')" />
      <input
        type="range"
        class="w-full range range-max"
        :min="min"
        :max="max"
        :value="modelValue[1] || max"
        @input="onInput($event, 'max')" />
    </div>
  </label>
</template>

<script>
export default {
  name: "InputRange",
  props: {
    label: {
      type: String,
      default: "",
      required: true,
    },
    min: {
      type: Number,
      default: 0,
    },
    max: {
      type: Number,
      default: 1000,
    },
    modelValue: {
      type: Array,
      default: () => [],
      validator(value) {
        const isValid =
          !value.length ||
          (value.length === 2 &&
            value.every((x) => typeof x === "number") &&
            value[0] <= value[1]);
        if (!isValid)
          console.error(
            "InputRange: model must be an array of two numbers with the smaller number in at 0 index"
          );
        return isValid;
      },
    },
  },
  data() {
    return {
      selectedMin: null,
      selectedMax: null,
    };
  },
  created() {
    this.initMinMax();
  },
  methods: {
    initMinMax() {
      this.selectedMin = this.modelValue[0] || this.min;
      this.selectedMax = this.modelValue[1] || this.max;
    },
    onInput(e, type) {
      const num = parseInt(e.target.value);
      if (type === "min") this.selectedMin = num;
      else this.selectedMax = num;
      if (this.selectedMin >= this.selectedMax) {
        this.selectedMin = this.selectedMax - 1;
        if (this.selectedMin === -1) {
          this.selectedMin = 0;
          this.selectedMax = 1;
        }
      }
      this.$emit("update:modelValue", [this.selectedMin, this.selectedMax]);
    },
  },
};
</script>

<style>
.slider {
  position: absolute;
  top: 0;
  left: 0;
  background: #bdbdbd;
  height: 9px;
  border-radius: 3rem;
}
.range {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 9px;
  pointer-events: none;
  -webkit-appearance: none;
  background: none;
}
.range:focus {
  outline: none;
}
.range::-webkit-slider-thumb {
  -webkit-appearance: none;
  height: 16px;
  width: 16px;
  border-radius: 50%;
  background: #ffffff;
  margin-top: -5px;
  box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
  pointer-events: auto;
  cursor: pointer;
}
.range::-webkit-slider-runnable-track {
  width: 100%;
  height: 9px;
  background: none;
  cursor: pointer;
}
.range::-ms-track {
  width: 0%;
  cursor: pointer;
  /* Hides the slider so custom styles can be added */
  background: transparent;
  border-color: transparent;
  color: transparent;
}
.range::-ms-thumb {
  height: 16px;
  width: 16px;
  border-radius: 50%;
  background: #ffffff;
  margin-top: -5px;
  box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
  pointer-events: auto;
  cursor: pointer;
}
.range::-ms-fill-lower {
  background: none;
}
.range::-ms-fill-upper {
  background: none;
}
.range::-moz-range-thumb {
  height: 16px;
  width: 16px;
  border-radius: 50%;
  background: #ffffff;
  margin-top: -5px;
  box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
  pointer-events: auto;
  cursor: pointer;
}
.range::-moz-range-track {
  width: 100%;
  height: 9px;
  background: none;
  cursor: pointer;
}
</style>