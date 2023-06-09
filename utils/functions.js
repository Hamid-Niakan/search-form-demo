export const getInitValueByFilterType = (filterType) => {
  switch (filterType) {
    case "text":
      return "";
    case "checkbox-group":
      return [];
    case "checkbox":
      return false;
    case "dropdown":
      return "";
    case "number":
      return [];
    default:
      return null;
  }
};

export const replaceQuery = (router, filterState) => {
  const _filterState = Object.assign({}, filterState);
  Object.entries(_filterState).forEach(([k, v]) => {
    if (!v || (Array.isArray(v) && v.length === 0)) delete _filterState[k];
  });
  router.replace({ query: _filterState });
};

export const clearValueByType = (obj, key) => {
  const valueType = typeof obj[key];
  if (valueType === "string") obj[key] = "";
  else if (valueType === "boolean") obj[key] = false;
  else obj[key] = [];
};

export const updateFiltersBasedOnQuery = (router, filterState) => {
  const availableFilters = Object.keys(filterState);
  Object.entries(router.currentRoute.query).forEach(([k, v]) => {
    if (availableFilters.includes(k)) {
      if (k === "priceRange") {
        filterState[k][0] = Number(v[0]);
        filterState[k][1] = Number(v[1]);
      } else if (Array.isArray(v)) {
        filterState[k] = v;
      } else if (v === "true") {
        filterState[k] = true;
      } else if (typeof v === "string") {
        if (typeof filterState[k] === "string") filterState[k] = v;
        else filterState[k].push(v);
      }
    }
  });
};
