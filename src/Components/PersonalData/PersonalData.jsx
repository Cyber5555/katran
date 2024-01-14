import { useEffect, useState } from "react";
import "../../Css/PersonalData.css";
import { Input } from "../Inputs/Input";
import useWindowSize from "../useWindowSize.js";
import { useDispatch, useSelector } from "react-redux";
import { addPersonalDataRequest } from "../../store/authReducer/addPersonalDataSlice.tsx";
import { getPersonalDataRequest } from "../../store/authReducer/getPersonalDataSlice.tsx";
import { useTranslation } from "react-i18next";

const PersonalData = () => {
  const windowSize = useWindowSize();
  const dispatch = useDispatch();
  const [t, i18next] = useTranslation("global");
  const { name_error, phone_error, address_error, email_error } = useSelector(
    (state) => state.addPersonalDataSlice
  );
  const { name, phone_, address, email } = useSelector(
    (state) => state.getPersonalDataSlice
  );

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    email: "",
  });

  useEffect(() => {
    dispatch(getPersonalDataRequest({}));
  }, [dispatch]);

  useEffect(() => {
    setFormData({
      name: name,
      phone: phone_,
      address: address,
      email: email,
    });
  }, [address, email, name, phone_]);

  const handleChangeData = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmitData = (event) => {
    event.preventDefault();
    dispatch(
      addPersonalDataRequest({
        name: formData.name,
        phone: formData.phone,
        address: formData.address,
        email: formData.email,
      })
    );
  };

  return (
    <form className="PersonalData" onSubmit={handleSubmitData}>
      <div className="PersonalData--parent">
        <Input
          text={t("Basket.NameSurname")}
          type="text"
          name={"name"}
          value={formData.name}
          onChange={handleChangeData}
          parentStyle={{ width: windowSize.width <= 425 && "100%" }}
          error={name_error}
        />
        <Input
          text={t("Basket.Phone")}
          type="number"
          name={"phone"}
          value={formData.phone}
          onChange={handleChangeData}
          parentStyle={{ width: windowSize.width <= 425 && "100%" }}
          error={phone_error}
        />
        <Input
          text={t("LoginPopup.email")}
          type="email"
          name={"email"}
          value={formData.email}
          onChange={handleChangeData}
          parentStyle={{ width: windowSize.width <= 425 && "100%" }}
          error={email_error}
        />
        <Input
          text={t("Basket.Address")}
          type="text"
          name={"address"}
          value={formData.address}
          onChange={handleChangeData}
          parentStyle={{ width: windowSize.width <= 425 && "100%" }}
          error={address_error}
        />
      </div>

      <button
        className="PersonalData__borderButton"
        style={{ float: "right", marginTop: 85 }}
        onClick={(e) => e.stopPropagation()}
        type="submit">
        {t("Settings.Save")}
      </button>
    </form>
  );
};

export default PersonalData;
