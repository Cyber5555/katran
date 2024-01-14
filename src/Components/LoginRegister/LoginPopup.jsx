import "../../Css/LoginPopup.css";
import { Input } from "../Inputs/Input";
import CrossIcon from "../../Assets/icons/CloseIconBig.svg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginRequest } from "../../store/reducer/loginSlice";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import useWindowSize from "../useWindowSize";

const LoginPopup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const windowSize = useWindowSize();
  const [t, i18next] = useTranslation("global");
  const [isLoading, setIsLoading] = useState(false);
  const { email_error, password_error } = useSelector(
    (state) => state.loginSlice
  );
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const closeLoginPopup = (e) => {
    const { className } = e.target;

    const loginPopup = document.querySelector(".LoginPopup");
    if (
      className === "LoginPopup open" ||
      className === "LoginPopup--CrossIcon" ||
      className === "LoginPopup--register"
    ) {
      loginPopup.classList.remove("open");
      document.body.style.overflow = "auto";

      if (
        className === "LoginPopup--register" ||
        className === "LoginPopup--register_button"
      ) {
        navigate(`/${i18next.language}/register/1`);
      }
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmitRegister = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const result = await dispatch(loginRequest({ formData }));
      if (result.payload?.success) {
        localStorage.setItem("userToken", result.payload?.payload?.token);
        document.querySelector(".LoginPopup").classList.remove("open");
        document.body.style.overflow = "auto";

        if (
          location.pathname == `/${i18next.language}/register/1` ||
          location.pathname == `/${i18next.language}/register/2`
        ) {
          navigate(`/${i18next.language}`);
        } else {
          navigate(`${location.pathname}`);
        }
      }
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="LoginPopup" onClick={closeLoginPopup}>
      <form className="LoginPopup--Container" onSubmit={handleSubmitRegister}>
        <img
          src={CrossIcon}
          alt="CrossIcon"
          style={{ alignSelf: "flex-end", cursor: "pointer" }}
          className="LoginPopup--CrossIcon"
          onClick={closeLoginPopup}
        />
        <h2 className="LoginPopup--title">{t("LoginPopup.title")}</h2>
        <p className="LoginPopup--info">{t("LoginPopup.subTitle")}</p>
        <Input
          inputStyle={{
            borderRadius: 3,
            background: "#F7F7F7",
            borderColor: email_error && "red",
          }}
          parentStyle={{
            marginBottom: 18,
            width: "100%",
          }}
          text={t("LoginPopup.email")}
          name={"email"}
          error={email_error}
          type="email"
          value={formData.email}
          onChange={handleInputChange}
        />
        <Input
          inputStyle={{
            borderRadius: 3,
            background: "#F7F7F7",
            borderColor: password_error && "red",
          }}
          parentStyle={{
            width: "100%",
            marginBottom: 20,
          }}
          text={t("LoginPopup.password")}
          name={"password"}
          error={password_error}
          type="password"
          value={formData.password}
          onChange={handleInputChange}
        />
        <Link className="LoginPopup--forgot__password">
          {t("LoginPopup.forgotPassword")}
        </Link>
        <div className="LoginPopup--have_account_or_signIn">
          <p className="LoginPopup--have_account">
            {t("LoginPopup.haveAccount")}

            <p className="LoginPopup--register" onClick={closeLoginPopup}>
              {t("LoginPopup.registration")}
            </p>
          </p>
          <button
            className="LoginPopup__borderButton"
            type="submit"
            disabled={isLoading}
            onClick={(e) => e.stopPropagation()}>
            {t("LoginPopup.signIn")}
          </button>
        </div>
      </form>
    </section>
  );
};

export default LoginPopup;
