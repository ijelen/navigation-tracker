import * as React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { Title } from "react-admin";
import Summary from "./Summary";
export default () => (
  <Card>
    <Title title="Registration Tracker" />
    <CardContent>
      <Summary />
    </CardContent>
  </Card>
);
