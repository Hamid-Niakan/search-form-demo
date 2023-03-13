import { defineStore } from "pinia";
import { filters } from "~~/utils/mockFilters";
import {
  getInitValueByFilterType,
  replaceQuery,
  clearValueByType,
  updateFiltersBasedOnQuery,
} from "~~/utils/functions";

export const useFilterStore = defineStore("filter", {
  state: () => ({
    filters: [],
    filterState: {},
    nameLabels: [],
  }),

  getters: {
    badges: (state) => {
      const arr = [];
      for (const [k, v] of Object.entries(state.filterState)) {
        const item = { ...state.nameLabels.find((x) => x.name === k) };
        if (Array.isArray(v) && v.length) {
          if (typeof v[0] !== "number") item.value = v.join(", ");
          else item.value = `از ${v[0]} تا ${v[1]}`;
          arr.push(item);
        } else if (v === true) {
          item.value = "";
          arr.push(item);
        } else if (typeof v === "string" && !!v) {
          item.value = v;
          arr.push(item);
        }
      }
      return arr;
    },
  },

  actions: {
    setFilterState(router) {
      this.nameLabels = filters.map((x) => ({ name: x.name, label: x.label }));
      const mapped = [];
      filters.forEach((x, index, arr) => {
        if (x) {
          this.filterState[x.name] = getInitValueByFilterType(x.type);
        }
        x.childrenFilters = [];
        if (x.children) {
          x.children.forEach((x2) => {
            const i = arr.findIndex((x3) => x3.name === x2);
            const childFilter = arr[i];
            if (childFilter) {
              this.filterState[childFilter.name] = getInitValueByFilterType(
                childFilter.type
              );
              x.childrenFilters.push(childFilter);
            }
            arr.splice(i, 1);
          });
        }
        mapped.push(x);
      });
      this.filters = mapped;
      updateFiltersBasedOnQuery(router, this.filterState);
    },
    onChange(name, value, router) {
      this.filterState[name] = value;
      const filter = this.filters.find((x) => x.name === name);
      if (filter) {
        filter.childrenFilters.forEach((x) => {
          this.filterState[x.name] = getInitValueByFilterType(x.type);
        });
      }
      replaceQuery(router, this.filterState);
    },
    onClear(name, router) {
      clearValueByType(this.filterState, name);
      replaceQuery(router, this.filterState);
    },
    onClearAll(router) {
      Object.keys(this.filterState).forEach((x) => {
        clearValueByType(this.filterState, x);
      });
      replaceQuery(router, this.filterState);
    },
  },
});
