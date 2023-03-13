<template>
  <div class="inline-flex px-3 py-1 rounded-full text-sm font-medium bg-rose-500 text-slate-50">
    <IconClose class="ml-2 cursor-pointer" @click.stop="onCloseClick" />
    {{ title }}
  </div>
</template>

<script>
export default {
  name: "AppBadge",
  props: {
    title: {
      type: String,
      default: '',
      required: true,
    },
  },
  methods: {
    onCloseClick() {
      this.$emit('delete');
    },
  },
};
</script>