import React, { useState } from "react";
import SyncLoader from "react-spinners/SyncLoader";
import constants from "../../../utils/constants";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "green",
  marginTop: 5,
};

export default function LoaderButton(props: any) {
  let [color, setColor] = useState(constants.main_theme_color);
  return (
    <>
      <div className="grid place-items-center mt-5">
        <SyncLoader
          color={color}
          loading={props.loading}
          cssOverride={override}
          size={10}
        />
      </div>
    </>
  );
}