import { useTranslation } from "react-i18next";
import "../../Css/Register.css";
import { CheckInput } from "../Inputs/Input";
import RetailBuyer from "./RetailBuyer";
import WholesaleBuyer from "./WholesaleBuyer";
import { useNavigate, useParams } from "react-router-dom";
import useWindowSize from "../useWindowSize.js";
const Register = () => {
  const navigate = useNavigate();
  const windowSize = useWindowSize();
  const { registerType } = useParams();
  const [t, i18next] = useTranslation("global");
  const handleRadioChange = async (e) => {
    navigate(`/${i18next.language}/register/${e.target.value}`);
  };

  return (
    <main className="Register__main__container">
      <div className="Register__container">
        <div className="Register__top__bar">
          <h2 className="Register--title">{t("LoginPopup.registration")}</h2>
          <div className="Register__top__ba__checks--parent">
            <CheckInput
              name={"buyer_type"}
              onChange={handleRadioChange}
              checked={registerType == "1"}
              value="1"
              textStyle={{
                fontSize: windowSize.width <= 600 && 12,
              }}
              inputStyle={{
                padding: windowSize.width <= 600 && 10,
                gap: windowSize.width <= 600 && 5,
                height: windowSize.width <= 600 && 35,
              }}>
              {t("Register.RetailBuyer")}
            </CheckInput>
            <CheckInput
              name={"buyer_type"}
              onChange={handleRadioChange}
              checked={registerType == "2"}
              textStyle={{
                fontSize: windowSize.width <= 600 && 12,
              }}
              inputStyle={{
                padding: windowSize.width <= 600 && 10,
                gap: windowSize.width <= 600 && 5,
                height: windowSize.width <= 600 && 35,
              }}
              value="2">
              {t("Register.WholesaleBuyer")}
            </CheckInput>
          </div>
        </div>
        <div className="Register__bottom__bar">
          <div />
          {registerType == "2" ? <RetailBuyer /> : <WholesaleBuyer />}
        </div>
      </div>
    </main>
  );
};

export default Register;
