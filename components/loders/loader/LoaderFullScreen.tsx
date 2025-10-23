import React from "react";

import DashboardContentLoader from "../contentLoader/DashboardContentLoader";

const newValue = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

const customLoaderDiv = {
  margin: "auto",
  width: "50%",
  padding: "10px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "80%",
  minHeight: "500px",
};

const LOADER_COLOR = "#5232f8";

function LoaderFullScreen() {
  return (
    <>
      {/* <div style={customLoaderDiv}>
      <ClimbingBoxLoader
        color={LOADER_COLOR}
        cssOverride={newValue}
        size={12}
      />
    </div> */}
      <DashboardContentLoader />
    </>
  );
}

export default LoaderFullScreen;