/* eslint-disable react/prop-types */
import "../../Css/ChangeCountButtonFloating.css";
import BasketIcon from "../../Assets/icons/BasketIconWhite.svg";

const ChangeCountButtonFloating = ({
  minusStyle,
  countStyle,
  plusStyle,
  plusSpan,
  minusSpan,
  count = 0,
  countMinus,
  countPlus,
  buyProduct,
}) => {
  return (
    <div className="ChangeCountButtonFloating">
      <div className="ChangeCountButtonFloating--parent">
        <button
          className="ChangeCountButtonFloating__minus"
          style={minusStyle}
          onClick={countMinus}>
          <span style={minusSpan}>-</span>
        </button>
        <p className="ChangeCountButtonFloating__count" style={countStyle}>
          {count}
        </p>
        <button
          className="ChangeCountButtonFloating__plus"
          style={plusStyle}
          onClick={countPlus}>
          <span style={plusSpan}>+</span>
        </button>
      </div>

      <img
        src={BasketIcon}
        alt="BasketIcon"
        style={{
          marginLeft: 10,
          cursor: "pointer",
        }}
        onClick={buyProduct}
      />
    </div>
  );
};

export default ChangeCountButtonFloating;
