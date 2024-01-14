import React, { useEffect, useState } from "react";
import "../../Css/Contacts.css";
import { Map, Placemark, RouteButton, YMaps } from "@pbe/react-yandex-maps";
import { useDispatch, useSelector } from "react-redux";
import { contactsRequest } from "../../store/reducer/contactsSlice.tsx";
import { useTranslation } from "react-i18next";
import KatranLogo from "../../Assets/icons/KatranBlack.svg";
import DOMPurify from "dompurify";
import Instagram from "../../Assets/icons/Instagram.svg";
import Facebook from "../../Assets/icons/Facebook.svg";
import Linkedin from "../../Assets/icons/Linkedin.svg";
import { Input, TextArea } from "../Inputs/Input.jsx";
import { contactSendRequest } from "../../store/reducer/contactSendSlice.tsx";

const Contacts = () => {
  const dispatch = useDispatch();
  const [t, i18next] = useTranslation("global");
  const {
    contact_data,
    longitude,
    latitude,
    get_address,
    get_phone,
    get_email,
  } = useSelector((state) => state.contactSlice);
  const { phone_error, email_error, message_error } = useSelector(
    (state) => state.contactSendSlice
  );
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmitMessage = (event) => {
    event.stopPropagation();
    event.preventDefault();
    dispatch(
      contactSendRequest({
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        message: formData.message,
      })
    );
  };

  useEffect(() => {
    dispatch(contactsRequest({}));
  }, [dispatch]);

  return (
    <div className="Contacts">
      <h2 className="Contacts--title">
        {contact_data?.page?.title[i18next.language]}
      </h2>
      <div className="Contacts--maps__and__infos">
        <div>
          <img
            src={KatranLogo}
            alt="KatranLogo"
            style={{ marginTop: 44, marginBottom: 31 }}
          />
          <p
            className="Contacts--description"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(
                contact_data?.page?.content[i18next.language],
                {
                  ALLOWED_TAGS: ["p", "span", "strong", "em", "br"],
                }
              ),
            }}
          />
          <div className="Contacts--contact__parent">
            <p>{get_address[i18next.language]}</p>
            <a
              href={`mailto:${get_email}`}
              onClick={(e) => e.stopPropagation()}>
              {get_email}
            </a>
            <a href={`tel:${get_phone}`} onClick={(e) => e.stopPropagation()}>
              {get_phone}
            </a>
          </div>
          <div className="Contact--contactsItem">
            <img
              src={Instagram}
              alt="Instagram"
              style={{ width: 14, height: 14, cursor: "pointer" }}
            />
            <img
              src={Facebook}
              alt="Facebook"
              style={{ width: 14, height: 14, cursor: "pointer" }}
            />
            <img
              src={Linkedin}
              alt="Linkedin"
              style={{ width: 14, height: 14, cursor: "pointer" }}
            />
          </div>
        </div>
        <div className="Contacts__map--parent">
          <YMaps>
            <Map
              defaultState={{
                center: [latitude, longitude],
                zoom: 20,
              }}
              l
              className={"Basket__map--map_view"}>
              <RouteButton options={{ float: "right" }} />
              <Placemark
                geometry={[latitude, longitude]}
                options={{ iconColor: "blue" }}
              />
            </Map>
          </YMaps>
        </div>
      </div>
      <form onSubmit={handleSubmitMessage}>
        <div className="Contacts--inputs__parent">
          <div>
            <Input
              text={t("Basket.NameSurname")}
              parentStyle={{ width: "100%" }}
              type="text"
              name={"name"}
              onChange={handleInputChange}
              value={formData.name}
            />
          </div>

          <div>
            <Input
              text={t("Basket.Phone")}
              parentStyle={{ width: "100%" }}
              type="number"
              name={"phone"}
              onChange={handleInputChange}
              value={formData.phone}
              error={phone_error}
            />
          </div>

          <div>
            <Input
              text={t("LoginPopup.email")}
              parentStyle={{ width: "100%" }}
              type="email"
              name={"email"}
              onChange={handleInputChange}
              value={formData.email}
              error={email_error}
            />
          </div>
        </div>

        <div className="Contacts--message">
          <TextArea
            text={t("Basket.Message")}
            parentStyle={{ width: "100%" }}
            inputStyle={{ height: 70 }}
            name={"message"}
            onChange={handleInputChange}
            value={formData.message}
            error={message_error}
          />
          <button
            type="submit"
            className="Contacts__borderButton"
            onClick={(e) => {
              e.stopPropagation();

              // navigate(`/${i18neext.language}/profile/basket`);
            }}>
            {/* {t("BasketPopup.Order")} */}
            Отправить
          </button>
        </div>
      </form>
    </div>
  );
};

export default Contacts;
