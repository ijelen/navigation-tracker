import { warnBeforeNumberOfDays } from "../data/settings";
export const formatRecord = (record, formating) => {
  let returnValue = "";
  if (isExpired(record.expires)) {
    // Registracija je istekla
    returnValue = formating.expired;
  } else if (isExpiring(record.expires)) {
    // Registracija istice za manje od tjedan dana
    returnValue = formating.expiring;
  }
  return returnValue;
};

export const isExpired = (expires) => {
  if (typeof expires === "string" && typeof Date.parse(expires) === "number") {
    const diffDays =
      (Date.parse(expires) - new Date().getTime()) / (1000 * 60 * 60 * 24);
    if (diffDays < 0) {
      return true;
    }
  }
  return false;
};

export const isExpiring = (expires) => {
  if (typeof expires === "string" && typeof Date.parse(expires) === "number") {
    const diffDays =
      (Date.parse(expires) - new Date().getTime()) / (1000 * 60 * 60 * 24);
    if (diffDays < warnBeforeNumberOfDays && !(diffDays < 0)) {
      return true;
    }
  }
  return false;
};

export const daysLeft = (expires) => {
  if (typeof expires === "string" && typeof Date.parse(expires) === "number") {
    const diffDays =
      (Date.parse(expires) - new Date().getTime()) / (1000 * 60 * 60 * 24);
    return Math.ceil(diffDays);
  }
  return false;
};

export const capitalizeFirstLetter = function (string) {
  if (string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  } else {
    return "";
  }
};
