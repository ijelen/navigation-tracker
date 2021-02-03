import { createMuiTheme } from "@material-ui/core/styles";

export default createMuiTheme({
  typography: { caption: { color: "grey" }, subtitle2: { fontSize: ".75rem" } },
  warnBeforeNumberOfDays: 7,
  defaultImage: "/logo512.png",
  progressHundredPercent: 365,
});
