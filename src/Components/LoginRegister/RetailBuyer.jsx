import { Input } from "../Inputs/Input";
import { useState } from "react";
import { registerRequest } from "../../store/reducer/registerSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const RetailBuyer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [t, i18next] = useTranslation("global");
  const {
    email_error,
    password_error,
    password_confirmation_error,
    company_name_error,
    bank_error,
    bank_account_error,
    legal_address_error,
    phone_error,
    code_error,
    agree_error,
  } = useSelector((state) => state.registerSlice);
  const [agree, setAgree] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    password_confirmation: "",
    company_name: "",
    bank: "",
    bank_account: "",
    legal_address: "",
    type: "2",
    phone: "",
    code: "",
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
        localStorage.setItem("role", "2");
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
          name={"email"}
          type="email"
          onChange={handleInputChange}
          value={formData.email}
          error={email_error}
        />
        <Input
          inputStyle={{
            background: "#F7F7F7",
            borderColor: phone_error && "red",
          }}
          parentStyle={{
            width: "100%",
            marginBottom: 31,
          }}
          text={t("Basket.Phone")}
          name={"phone"}
          type="number"
          value={formData.phone}
          onChange={handleInputChange}
          error={phone_error}
          required={false}
        />
      </div>
      <div className="Register--inputs--parent">
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
          name={"password"}
          type="password"
          value={formData.password}
          onChange={handleInputChange}
          error={password_error}
        />
        <Input
          inputStyle={{
            background: "#F7F7F7",
            borderColor: password_confirmation_error && "red",
          }}
          parentStyle={{
            width: "100%",
            marginBottom: 31,
          }}
          text={t("Settings.RepeatPassword")}
          name={"password_confirmation"}
          type="password"
          value={formData.password_confirmation}
          onChange={handleInputChange}
          error={password_confirmation_error}
        />
      </div>
      <div className="Register--inputs--parent">
        <Input
          inputStyle={{
            background: "#F7F7F7",
            borderColor: company_name_error && "red",
          }}
          parentStyle={{
            width: "100%",
            marginBottom: 31,
          }}
          text={t("Register.CompanyName")}
          name={"company_name"}
          value={formData.company_name}
          onChange={handleInputChange}
          error={company_name_error}
        />
        <Input
          inputStyle={{
            background: "#F7F7F7",
            borderColor: code_error && "red",
          }}
          parentStyle={{
            width: "100%",
            marginBottom: 31,
          }}
          text={t("Register.INN")}
          name={"code"}
          type="number"
          value={formData.code}
          onChange={handleInputChange}
          error={code_error}
          required={false}
        />
      </div>
      <div className="Register--inputs--parent">
        <Input
          inputStyle={{
            background: "#F7F7F7",
            borderColor: bank_error && "red",
          }}
          parentStyle={{
            width: "100%",
            marginBottom: 31,
          }}
          text={t("Register.Bank")}
          name={"bank"}
          value={formData.bank}
          onChange={handleInputChange}
          error={bank_error}
          required={false}
        />
        <Input
          inputStyle={{
            background: "#F7F7F7",
            borderColor: bank_account_error && "red",
          }}
          parentStyle={{
            width: "100%",
            marginBottom: 31,
          }}
          text={t("Register.BankAccount")}
          name={"bank_account"}
          value={formData.bank_account}
          onChange={handleInputChange}
          error={bank_account_error}
          required={false}
        />
      </div>
      <div className="Register--inputs--parent">
        <Input
          inputStyle={{
            background: "#F7F7F7",
            borderColor: legal_address_error && "red",
          }}
          parentStyle={{
            width: "100%",
            marginBottom: 31,
          }}
          text={t("Register.LegalAddress")}
          name={"legal_address"}
          value={formData.legal_address}
          onChange={handleInputChange}
          error={legal_address_error}
          required={false}
        />
      </div>
      <label
        htmlFor="agree2"
        className="Register--label"
        onClick={(e) => e.stopPropagation()}
        style={{ color: agree_error && !agree && "red" }}>
        <input
          type="checkbox"
          className="Register__checkInput"
          checked={formData.agree}
          onChange={() => setAgree(!agree)}
          id="agree2"
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

export default RetailBuyer;
