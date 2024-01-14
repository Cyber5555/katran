/* eslint-disable react/prop-types */
import "../../Css/Input.css";
import CreatableSelect from "react-select";

const Input = ({
  type = "text",
  text,
  value,
  onChange,
  required = true,
  select = false,
  options,
  inputStyle,
  parentStyle,
  name,
  error,
  placeholder = "",
}) => {
  return (
    <div className="Input--parent" style={parentStyle}>
      <p className="Input--title">
        {text}
        {required && <span>*</span>}
      </p>
      {select ? (
        <CreatableSelect
          options={options}
          className="SelectInput"
          classNamePrefix="select"
          placeholder={placeholder}
          onChange={onChange}
        />
      ) : (
        <input
          type={type}
          className="Input"
          value={value?.toString()}
          onChange={onChange}
          name={name}
          style={inputStyle}
          required={required}
          autoComplete="on"
        />
      )}
      <p className="Input__error-message">{error}</p>
    </div>
  );
};

const CheckInput = ({
  value,
  checked,
  onChange,
  name,
  children,
  inputStyle,
  textStyle,
  checkedStyle,
}) => {
  return (
    <label
      className="CheckInput--parent"
      style={inputStyle}
      onClick={(e) => e.stopPropagation()}>
      <input
        type="radio"
        className="Register__checkInput"
        value={value}
        checked={checked}
        onChange={onChange}
        name={name}
        style={checkedStyle}
      />
      <span className="CheckInput--span" style={textStyle}>
        {children}
      </span>
    </label>
  );
};

const TextArea = ({
  text,
  value,
  onChange,
  required = true,
  inputStyle,
  parentStyle,
  name,
  error,
}) => {
  return (
    <div className="Input--parent" style={parentStyle}>
      <p className="Input--title">
        {text}
        {required && <span>*</span>}
      </p>

      <textarea
        className="TextArea"
        value={value?.toString()}
        onChange={onChange}
        name={name}
        style={inputStyle}
        required={required}
      />

      <p className="Input__error-message">{error}</p>
    </div>
  );
};

const FileInput = ({
  text,
  onChange,
  required = false,
  parentStyle,
  error,
  type,
  placeholder,
}) => {
  return (
    <div className="CV__upload--parent" style={parentStyle}>
      <p className="Input--title">
        {text}
        {required && <span>*</span>}
      </p>
      <p className="CV__upload--placeholder">{placeholder}</p>
      <input className="CV__upload" onChange={onChange} type={type} />
      <p className="Input__error-message">{error}</p>
    </div>
  );
};

export { Input, CheckInput, TextArea, FileInput };
