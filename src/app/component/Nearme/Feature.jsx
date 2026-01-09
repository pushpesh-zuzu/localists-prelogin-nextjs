import React from "react";
import { FetureSearchBox } from "./FetureSearchBox";
import FetureCardList from "./FetureCardList";
import WrapperBGWidth from "../common/WrapperBGWidth/WrapperBGWidth";

function Feature() {
  return (
    <WrapperBGWidth background={'#F6F6F6'}>
    <main className="relative bg-[#F6F6F6]">
      <FetureCardList />
    </main>
      </WrapperBGWidth>
  );
}

export default Feature;
