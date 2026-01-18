import H2 from "../../UI/Typography/H2";

function BlueBlackH2Heading({
  className = "",
  blueText = "",
  blackText = "",
}) {
  return (
    <H2
      className={`
        ${className}
        text-[#00afe3]
        font-black
      `}
    >
      {blueText}{" "}
      <span className="text-[#253238]">
        {blackText}
      </span>
    </H2>
  );
}

export default BlueBlackH2Heading;
