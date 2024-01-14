import { Input } from "../Inputs/Input";
import "../../Css/Settings.css";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { updatePasswordRequest } from "../../store/authReducer/updatePasswordSlice.tsx";
import { useTranslation } from "react-i18next";

const Settings = () => {
  const dispatch = useDispatch();
  const [t, i18next] = useTranslation("global");
  const [formData, setFormData] = useState({
    current_password: "",
    password: "",
    confirm_password: "",
  });
  const { current_password_error, password_error, confirm_password_error } =
    useSelector((state) => state.updatePasswordSlice);

  const handleChangeData = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmitData = (event) => {
    event.preventDefault();
    dispatch(
      updatePasswordRequest({
        current_password: formData.current_password,
        password: formData.password,
        confirm_password: formData.confirm_password,
      })
    );
  };

  return (
    <form className="Settings" onSubmit={handleSubmitData}>
      <div className="Settings--parent">
        <Input
          text={t("Settings.CurrentPassword")}
          type="password"
          name={"current_password"}
          value={formData.current_password}
          onChange={handleChangeData}
          error={current_password_error}
        />
        <Input
          text={t("Settings.NewPassword")}
          type="password"
          name={"password"}
          value={formData.password}
          onChange={handleChangeData}
          error={password_error}
        />
        <Input
          text={t("Settings.RepeatPassword")}
          type="password"
          name={"confirm_password"}
          value={formData.confirm_password}
          onChange={handleChangeData}
          error={confirm_password_error}
        />
      </div>
      <button
        className="Settings__borderButton"
        style={{ float: "right", marginTop: 85 }}
        onClick={(e) => e.stopPropagation()}
        type="submit">
        {t("Settings.Save")}
      </button>
    </form>
  );
};

export default Settings;
