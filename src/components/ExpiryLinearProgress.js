import React from "react";
import Grid from "@material-ui/core/Grid";
import LinearProgress from "@material-ui/core/LinearProgress";
import Typography from "@material-ui/core/Typography";
import { DateField } from "react-admin";
import { daysLeft } from "../utils";

export default function ExpiryLinearProgress({ record }) {
  return (
    <div>
      <LinearProgress
        variant="determinate"
        value={daysLeft(record.expires) * (1 / 365) * 100}
        style={{ marginTop: ".5rem" }}
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
