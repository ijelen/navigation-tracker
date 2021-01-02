import React from "react";

const SummaryList = (props) => (
  <ul>
    {props.items.map((vehicle) => {
      return (
        <li key={vehicle.id}>
          {vehicle.type} {vehicle.name}
          {" - "}
          {new Date(vehicle.expires).toLocaleDateString("en-IE")}
        </li>
      );
    })}
  </ul>
);
export default SummaryList;
