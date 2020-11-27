export const formatRecord = (record, formating) => {
  if (
    typeof record.expires === "string" &&
    typeof Date.parse(record.expires) === "number"
  ) {
    const diffDays =
      (Date.parse(record.expires) - new Date().getTime()) /
      (1000 * 60 * 60 * 24);
    let returnValue = "";
    if (diffDays < 0) {
      // Registracija je istekla
      returnValue = formating.expired;
    } else if (diffDays < 7) {
      // Registracija istice za manje od tjedan dana
      returnValue = formating.expiring;
    }
    return returnValue;
  }
};

export const capitalizeFirstLetter = function (string) {
  if (string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  } else {
    return "";
  }
};
