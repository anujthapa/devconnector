import React from "react";
import loading from "./loading.gif";

export default function Loading() {
  return (
    <div>
      <img
        style={{ width: "20rem", margin: "auto", display: "block" }}
        src={loading}
        alt="Loading"
      />
    </div>
  );
}
