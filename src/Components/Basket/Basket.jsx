/* eslint-disable react-hooks/rules-of-hooks */
import "../../Css/Basket.css";
import CheckedProductList from "../Others/CheckedProductList";
import Arca from "../../Assets/icons/arca.svg";
import MasterCart from "../../Assets/icons/masterCart.svg";
import Visa from "../../Assets/icons/visa.svg";
import IDram from "../../Assets/icons/iDram.svg";
import Dram from "../../Assets/icons/Dram.svg";
import { useNavigate } from "react-router-dom";
import SelectDeliverType from "./SelectDeliverType";
import { useState } from "react";
import { basketInputData } from "../../store/other/basketDataSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNumberWithDots } from "../useNumberWithDot";
import { useTranslation } from "react-i18next";
import { CheckInput, Input } from "../Inputs/Input";

const Basket = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [totalPrice, setTotalPrice] = useState();
  const [t, i18next] = useTranslation("global");
  const {
    longitude,
    latitude,
    takeAddress,
    marketPhone,
    regions,
    pickupPoint_id,
    delivery_date,
  } = useSelector((state) => state.orderInfoSlice);

  const deliveryOptions = [
    { value: "take", label: t("Basket.Pickup") },
    { value: "deliver", label: t("Basket.Delivery") },
  ];

  const [selectedOption, setSelectedOption] = useState(
    deliveryOptions[0].value
  );
  const [payment_type, setPaymentType] = useState("");
  const { phone, user_name } = useSelector((state) => state.basketDataSlice);
  const { name, phone_, address, email } = useSelector(
    (state) => state.getPersonalDataSlice
  );
  const [city_id, setCityId] = useState(null);
  const [shippingTime, setShippingTime] = useState(null);
  const [formData, setFormData] = useState({
    user_name: user_name || name || "",
    phone: phone || phone_ || "",
    address: "",
    floor: "",
    entrance: "",
    description: "",
    intercom: "",
  });
  const openLoginPopup = (e) => {
    e.stopPropagation();
    e.preventDefault();
    document.querySelector(".LoginPopup").classList.add("open");
  };

  const handleOptionChange = (event) => {
    setPaymentType(event.target.value);
  };

  const handleChangeBasketData = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const changeDataInRedux = (e) => {
    e.stopPropagation();
    e.preventDefault();

    dispatch(
      basketInputData({
        user_name: formData.user_name,
        phone: formData.phone,
        deliver_type: selectedOption,
        pickup_point_id: pickupPoint_id,
        payment_method: payment_type,
        sum: totalPrice,
        real_sum: "",
        city_id: city_id,
        address:
          selectedOption == "take"
            ? takeAddress
            : selectedOption == "deliver"
            ? formData.address
            : "",
        description: formData.description,
        entrance: formData.entrance,
        floor: formData.floor,
        intercom: formData.intercom,
        date_id: shippingTime,
      })
    );

    if (payment_type != "") {
      navigate(`/${i18next.language}/profile/pay-to-products`);
    }
  };

  return (
    <div className="Basket__main--parent">
      <CheckedProductList
        title={t("Basket.FormingAnOrder")}
        setTotalPrice={setTotalPrice}
        totalPrice={totalPrice}
      />
      <form onSubmit={changeDataInRedux}>
        <div className="Basket__inputs--parent">
          <Input
            text={t("Basket.NameSurname")}
            type="text"
            name={"user_name"}
            value={formData.user_name}
            onChange={handleChangeBasketData}
            error={""}
          />
          <Input
            text={t("Basket.Phone")}
            type="number"
            name={"phone"}
            value={formData.phone}
            onChange={handleChangeBasketData}
            error={""}
          />
        </div>

        <SelectDeliverType
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
          deliveryOptions={deliveryOptions}
          longitude={longitude}
          latitude={latitude}
          address={formData.address}
          takeAddress={takeAddress}
          phone={marketPhone}
          regions={regions}
          delivery_date={delivery_date}
          entrance={formData.entrance}
          handleChangeBasketData={handleChangeBasketData}
          setCityId={setCityId}
          setShippingTime={setShippingTime}
        />

        <h2 className="Basket__how_to_pay">
          {t("Basket.SelectPaymentMethod")}
        </h2>
        <div className="Basket__Fast__bay">
          <div className="Basket__Fast__bay">
            <CheckInput
              value="payInCash"
              name={"payment_type"}
              checked={payment_type === "payInCash"}
              id={"1"}
              onChange={handleOptionChange}>
              {t("Basket.CashPayment")}
            </CheckInput>

            {!localStorage.getItem("userToken") && (
              <button
                className="Basket__borderButton"
                type="submit"
                onClick={(e) => e.stopPropagation()}>
                быстрый заказ
              </button>
            )}
          </div>
          {!localStorage.getItem("userToken") && (
            <p className="Basket--full__total__notAuth">
              {t("Basket.Total")} {useNumberWithDots(totalPrice)}{" "}
              <img src={Dram} alt="Dram" />
            </p>
          )}
        </div>

        {localStorage.getItem("userToken") && (
          <>
            <h2 className="Basket__how_to_pay">{t("Basket.OnlinePayment")}</h2>
            <div className="Basket__how_to_pay--parent">
              <div className="Basket__how_to_pay--checks">
                <CheckInput
                  name={"payment_type"}
                  value="payInCart"
                  checked={payment_type === "payInCart"}
                  id={"2"}
                  onChange={handleOptionChange}>
                  <img
                    src={Visa}
                    alt="Visa"
                    className="Basket__how_to_pay--img"
                  />{" "}
                  <img
                    src={MasterCart}
                    alt="MasterCart"
                    className="Basket__how_to_pay--img"
                  />{" "}
                  <img
                    src={Arca}
                    alt="Arca"
                    className="Basket__how_to_pay--img"
                  />
                </CheckInput>

                <CheckInput
                  value="payInIdram"
                  name={"payment_type"}
                  checked={payment_type === "payInIdram"}
                  id={"3"}
                  onChange={handleOptionChange}>
                  <img src={IDram} alt="IDram" />
                </CheckInput>
              </div>

              {localStorage.getItem("userToken") && (
                <p className="Basket--full__total">
                  {t("Basket.Total")} {useNumberWithDots(totalPrice)}{" "}
                  <img src={Dram} alt="Dram" />
                </p>
              )}
            </div>
          </>
        )}
        {!localStorage.getItem("userToken") ? (
          <>
            <p className="Basket__under__checks--text">
              {t("Basket.Information")}
            </p>

            <div className="Basket__borderButton--parent">
              <button className="Basket__borderButton" onClick={openLoginPopup}>
                Авторизоваться
              </button>
              <button
                className="Basket__borderButton"
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  navigate(`/${i18next.language}/register/1`);
                }}>
                {t("LoginPopup.registration")}
              </button>
            </div>
          </>
        ) : (
          <button
            className="Basket__borderButton"
            style={{ marginTop: 26 }}
            type="submit"
            onClick={(e) => {
              e.stopPropagation();
            }}>
            {t("BasketPopup.Order")}
          </button>
        )}
      </form>
    </div>
  );
};

export default Basket;
