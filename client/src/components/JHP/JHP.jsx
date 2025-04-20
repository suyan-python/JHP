import React from "react";
import JHPHome from "./jhpHome";
import JHPHome2 from "./JHPHome2";
import JHPHome3 from "./JHPHome3";
import Charts from "./Charts";

function JHP() {
  return (
    <div>
      <JHPHome />
      {/* <JHPHome2 /> */}
      <JHPHome3 />
      <Charts />
    </div>
  );
}

export default JHP;
