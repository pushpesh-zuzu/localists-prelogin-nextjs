import Button1 from "../../UI/Typography/Button1";

const ActionButtons = ({ onCalculate, onReset }) => (
  <div className="flex flex-col sm:flex-row gap-3 pt-2">
    <Button1 variant="primary" onClick={onCalculate}>
      Calculate Cost
    </Button1>
    <Button1 variant="outlined" onClick={onReset}>
      Reset
    </Button1>
  </div>
);

export default ActionButtons;