import React from "react";
import { FetureSearchBox } from "./FetureSearchBox";
import FetureCardList from "./FetureCardList";
import WrapperBGWidth from "../../common/WrapperBGWidth/WrapperBGWidth";

function Feature({
  serviceId,
  serviceName,
  serviceProfessionName,
  featureRef,
  cityName
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
        />
      </main>
    </WrapperBGWidth>
  );
}

export default Feature;
