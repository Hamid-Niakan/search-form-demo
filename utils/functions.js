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
  const newRout =
    router.currentRoute.fullPath.split("?")[0] + getCustomQuery(filterState);
  router.replace(newRout);
};

export const clearValueByType = (obj, key) => {
  const valueType = typeof obj[key];
  if (valueType === "string") obj[key] = "";
  else if (valueType === "boolean") obj[key] = false;
  else obj[key] = [];
};

export const updateFiltersBasedOnQuery = (router, filterState) => {
  const availableFilters = Object.keys(filterState);
  const queryObject = getObjectFromQuery(router.currentRoute.fullPath);
  Object.entries(queryObject).forEach(([k, v]) => {
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

const getCustomQuery = (queryObj) => {
  const clone = Object.assign({}, queryObj);
  Object.entries(clone).forEach(([k, v]) => {
    const isArray = Array.isArray(v);
    if (!v || (isArray && !v.length)) delete clone[k];
    else if (isArray && v.length) clone[k] = v.join("--");
  });
  return (
    "?" +
    Object.keys(clone)
      .map((k) => k + "~" + clone[k])
      .join("+")
  );
};

const getObjectFromQuery = (str) => {
  const queryString = str.split("?")[1];
  if (!queryString) return {};
  const queryArray = str.split("?")[1].split("+");
  const queryObj = {};
  queryArray.forEach((x) => {
    const [k, v] = x.split("~");
    queryObj[k] = v.includes("--") ? v.split("--") : v;
  });
  return queryObj;
};
