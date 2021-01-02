import React from "react";
import { isExpired, isExpiring } from "../utils";
import { useGetList } from "react-admin";
import SummaryList from "./SummaryList";

// https://marmelab.com/react-admin/Actions.html

const Loading = () => {
  return <p>Loading..</p>;
};

const Summary = () => {
  const { data, ids, loading, error } = useGetList(
    "vehicles",
    { page: 1, perPage: 1000 },
    { field: "expires", order: "ASC" }
  );
  let expired = [];
  let expiring = [];
  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <p>ERROR</p>;
  }
  if (data) {
    expired = ids
      .map((id) => data[id])
      .filter((vehicle) => isExpired(vehicle.expires));
    expiring = ids
      .map((id) => data[id])
      .filter((vehicle) => isExpiring(vehicle.expires));
  }
  return (
    <>
      <p>Number of vehicles: {ids.length}</p>
      {expired.length ? (
        <>
          <h2>Expired:</h2>
          <SummaryList items={expired} />
        </>
      ) : null}
      {expiring.length ? (
        <>
          <h2>Expires in less than a week:</h2>
          <SummaryList items={expiring} />
        </>
      ) : null}
      {!expired.length && !expiring.length && ids.length ? (
        <>
          <p>Every vehicle has a valid registration.</p>
          <h2>First to expire:</h2>
          <p>
            {data[ids[0]].type} {data[ids[0]].name}{" "}
            {new Date(data[ids[0]].expires).toLocaleDateString("en-IE")}
          </p>
        </>
      ) : null}
    </>
  );
};

export default Summary;
