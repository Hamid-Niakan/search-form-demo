<template>
  <div dir="rtl" class="flex justify-center py-12 bg-sky-100 min-h-screen">
    <ClientOnly>
      <div class="container mx-auto px-4 py-8 sm:w-9/10 md:w-3/5 lg:w-1/2 flex flex-col">
          <section v-if="badges.length" id="selectedFilters" class="card">
            <div class="flex mb-3">
              <IconFilterSolid class="icon ml-3" />
              <h2 class="card_title">
                فیلترهای اعمال شده
              </h2>
              <AppBadge title="حذف همه" class="mr-3" @delete="onClearAll($router)" />
            </div>

            <AppBadge v-for="badge in badges" :key="`badge-${badge.name}`" :title="badge.label + ' ' + badge.value" class="mx-2 my-2" @delete="onClear(badge.name, $router)" /> 
          </section>
          
          <section id="filters" class="card">
          <div class="flex mb-3">
            <IconFilterOutline class="icon ml-3" />
            <h2 class="card_title">
              فیلترها
            </h2>
          </div>

          <div class="px-6">
            <template v-for="filter in filters" :key="filter.name">
              <AppFilters :filter="filter" />
              <template v-for="subFilter in filter.childrenFilters" :key="subFilter.name">
                <AppFilters
                  v-if="filterState[filter.name]"
                  :filter="subFilter"
                  :checkbox-group-filter="subFilter.name === 'brand' ? (x) => x.value.includes(filterState.category) : false"
                  class="pr-10 mb-6" />
              </template>
            </template>
          </div>
        </section>
      </div>
    </ClientOnly>
  </div>
</template>

<script>
import { mapState, mapActions } from "pinia";
import { useFilterStore } from "@/stores/filter";

export default {
  name: "IndexPage",
  data() {
    return {
      items: [
        {
          text: "تویوتا",
          value: "toyota",
        },
        {
          text: "بنز",
          value: "benz",
        },
        {
          text: "تسلا",
          value: "tesla",
        },
      ],
      test: [9, 30],
    };
  },
  computed: {
    ...mapState(useFilterStore, [
      "filters",
      "filterState",
      "hasSelectedFilters",
      "badges",
    ]),
  },
  created() {
    this.setFilterState(this.$router);
  },
  methods: {
    ...mapActions(useFilterStore, ["setFilterState", "onClear", "onClearAll"]),
  },
};
</script>
