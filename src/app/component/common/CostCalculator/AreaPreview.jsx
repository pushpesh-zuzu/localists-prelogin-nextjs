import Paragraph from "../../UI/Typography/Paragraph";

const AreaPreview = ({ length, width }) => {
  if (!length || !width || Number(length) <= 0 || Number(width) <= 0) return null;

  return (
    <div className="flex items-center gap-2 px-3 py-2 bg-[#e8f8fd] border border-[#00afe3]/30 rounded-sm">
      <Paragraph className="text-sm text-[#253238]" bold="font-normal">
        Roof area:{" "}
        <strong className="text-[#00afe3]">
          {(Number(length) * Number(width)).toFixed(2)} m²
        </strong>
      </Paragraph>
    </div>
  );
};

export default AreaPreview;