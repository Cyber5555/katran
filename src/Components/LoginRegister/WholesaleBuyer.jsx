import { Input } from "../Inputs/Input";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerRequest } from "../../store/reducer/registerSlice";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const WholesaleBuyer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [t, i18next] = useTranslation("global");
  const {
    email_error,
    password_error,
    password_confirmation_error,
    agree_error,
  } = useSelector((state) => state.registerSlice);
  const [agree, setAgree] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    password_confirmation: "",
    type: "1",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmitRegister = (e) => {
    e.preventDefault();
    dispatch(registerRequest({ formData, agree })).then((result) => {
      if (result.payload.success) {
        localStorage.setItem("userToken", result.payload?.payload?.token);
        localStorage.setItem("role", "1");
        navigate(`/${i18next.language}/profile/personal-data`);
      }
    });
  };

  return (
    <form onSubmit={handleSubmitRegister}>
      <div className="Register--inputs--parent">
        <Input
          inputStyle={{
            background: "#F7F7F7",
            borderColor: email_error && "red",
          }}
          parentStyle={{
            width: "100%",
            marginBottom: 31,
          }}
          text={t("LoginPopup.email")}
          type="email"
          name={"email"}
          value={formData.email}
          onChange={handleInputChange}
          error={email_error}
        />
        <Input
          inputStyle={{
            background: "#F7F7F7",
            borderColor: password_error && "red",
          }}
          parentStyle={{
            width: "100%",
            marginBottom: 31,
          }}
          text={t("LoginPopup.password")}
          type="password"
          name={"password"}
          value={formData.password}
          onChange={handleInputChange}
          error={password_error}
        />
      </div>
      <div className="Register--inputs--parent">
        <Input
          inputStyle={{
            background: "#F7F7F7",
            borderColor: password_confirmation_error && "red",
          }}
          parentStyle={{
            width: "100%",
          }}
          text={t("Settings.RepeatPassword")}
          type="password"
          name={"password_confirmation"}
          value={formData.password_confirmation}
          onChange={handleInputChange}
          error={password_confirmation_error}
        />
      </div>
      <label
        htmlFor="agree1"
        onClick={(e) => e.stopPropagation()}
        className="Register--label"
        style={{ color: agree_error && !agree && "red" }}>
        <input
          type="checkbox"
          className="Register__checkInput"
          checked={formData.agree}
          onChange={() => setAgree(!agree)}
          id="agree1"
          style={{ borderColor: agree_error && !agree && "red" }}
        />
        {t("Register.IAgree")}
      </label>

      <button
        className="Register__borderButton"
        type={"submit"}
        onClick={(e) => e.stopPropagation()}>
        {t("LoginPopup.registration")}
      </button>
    </form>
  );
};

export default WholesaleBuyer;
