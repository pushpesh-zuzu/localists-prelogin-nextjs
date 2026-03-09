import React from "react";
import { FetureSearchBox } from "./FetureSearchBox";
import FetureCardList from "./FetureCardList";
import WrapperBGWidth from "../../common/WrapperBGWidth/WrapperBGWidth";

function Feature({
  serviceId,
  serviceName,
  serviceProfessionName,
  featureRef,
  cityName,
  county
}) {
  return (
    <WrapperBGWidth background={"#F6F6F6"}>
      <main className="relative bg-[#F6F6F6]">
        <FetureCardList
          featureRef={featureRef}
          serviceProfessionName={serviceProfessionName}
          serviceId={serviceId}
          serviceName={serviceName}
          cityName={cityName}
          county={county}
        />
      </main>
    </WrapperBGWidth>
  );
}

export default Feature;
