import React from "react";
import Grid from "@material-ui/core/Grid";
import LinearProgress from "@material-ui/core/LinearProgress";
import Typography from "@material-ui/core/Typography";
import { DateField } from "react-admin";
import { daysLeft } from "../utils";
import { useTheme } from "@material-ui/core/styles";

export default function ExpiryLinearProgress({ record }) {
  const theme = useTheme();
  const progressHundredPercent = theme.progressHundredPercent && 365;
  return (
    <div>
      <LinearProgress
        variant="determinate"
        value={daysLeft(record.expires) * (1 / progressHundredPercent) * 100}
        color="primary"
      />
      <Grid container justify="space-between">
        <Grid item>
          <Typography
            variant="caption"
            color={daysLeft(record.expires) < 1 ? "error" : "initial"}
          >
            {daysLeft(record.expires)} day
            {daysLeft(record.expires) !== 1 ? "s" : null} left
          </Typography>
        </Grid>
        <Grid item>
          <DateField
            variant="caption"
            record={record}
            source="expires"
            options={{
              year: "numeric",
              month: "long",
              day: "numeric",
            }}
          />
        </Grid>
      </Grid>
    </div>
  );
}
