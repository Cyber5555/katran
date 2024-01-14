/* eslint-disable react/prop-types */
import "../../Css/ChangeCountButton.css";

const ChangeCountButton = ({
  minusStyle,
  countStyle,
  plusStyle,
  plusSpan,
  minusSpan,
  count = 0,
  countMinus,
  countPlus,
  parentStyle,
  disabled,
}) => {
  return (
    <div className="ChangeCountButton--parent" style={parentStyle}>
      <button
        className="ChangeCountButton__minus"
        style={minusStyle}
        onClick={countMinus}>
        <span style={minusSpan}>-</span>
      </button>
      <p className="ChangeCountButton__count" style={countStyle}>
        {count}
      </p>
      <button
        className="ChangeCountButton__plus"
        style={plusStyle}
        disabled={disabled}
        onClick={countPlus}>
        <span style={plusSpan}>+</span>
      </button>
    </div>
  );
};

export default ChangeCountButton;
