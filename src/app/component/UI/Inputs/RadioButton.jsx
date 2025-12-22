const RadioButton = ({
  type = "radio",
  name,
  value,
  label,
  checked,
  onChange,
  id,
}) => {
  return (
    <label
      htmlFor={id}
      className="
        flex items-center gap-2
        border border-[#dedede]
        p-[10px]
        rounded-[3px]
        cursor-pointer
        text-[14px] font-medium text-black
        text-left
      "
    >
      <input
        id={id}
        type={type}
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className={`
          shrink-0
          ${type === "checkbox" ? "mt-[3px]" : "mt-0"}
        `}
      />

      <span className="inline-block break-words">
        {label}
      </span>
    </label>
  );
};

export default RadioButton;
