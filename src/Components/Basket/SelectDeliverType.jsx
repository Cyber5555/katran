/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { CheckInput, Input } from "../Inputs/Input";
import { Map, Placemark, RouteButton, YMaps } from "@pbe/react-yandex-maps";
import CreatableSelect from "react-select";
import { useDispatch } from "react-redux";
import { orderInfoRequest } from "../../store/reducer/orderInfoSlice.js";
import Location from "../../Assets/icons/location.svg";
import Edit from "../../Assets/icons/edit.svg";
import { useTranslation } from "react-i18next";

const SelectDeliverType = ({
  selectedOption,
  setSelectedOption,
  longitude,
  latitude,
  address,
  takeAddress,
  phone,
  regions,
  delivery_date,
  handleChangeBasketData,
  setCityId,
  entrance,
  setShippingTime,
  deliveryOptions,
}) => {
  const dispatch = useDispatch();
  const [t, i18next] = useTranslation("global");
  useEffect(() => {
    dispatch(orderInfoRequest({}));
  }, [dispatch]);

  const regionOptions = regions?.map((region) => ({
    label: region.title[i18next.language],
    options: region.cities.map((option) => ({
      value: option.id,
      label: option.title[i18next.language],
    })),
  }));

  const options = delivery_date?.map((date) => {
    const parsedDate = JSON.parse(date.date);
    const label = Object.values(parsedDate).map((option) => option);
    const keys = Object.keys(parsedDate).map((option) =>
      option == 1 ? t("Basket.Today") : t("Basket.Tomorrow")
    );

    return {
      value: date.id,
      label: keys + " " + label.join(" "),
    };
  });

  return (
    <>
      <div className="Basket__deliver__type--parent">
        {deliveryOptions.map((option) => (
          <CheckInput
            key={option.value}
            inputStyle={{
              border:
                selectedOption === option.value
                  ? "1px solid #06364B"
                  : "1px solid #9E9E9E",
            }}
            textStyle={{
              color: selectedOption === option.value ? "#06364B" : "#9E9E9E",
            }}
            checkedStyle={{
              border:
                selectedOption === option.value
                  ? "1px solid #06364B"
                  : "1px solid #9E9E9E",
            }}
            name={"deliver_type"}
            value={option.value}
            checked={selectedOption === option.value}
            onChange={() => setSelectedOption(option.value)}>
            {option.label}
          </CheckInput>
        ))}
      </div>

      {selectedOption === "take" && (
        <div className="Basket__map__input--parent">
          <img src={Location} alt="Location" style={{ cursor: "pointer" }} />
          <div>
            <p>{takeAddress[[i18next.language]]}</p>
            <p>{phone}</p>
          </div>
          <img src={Edit} alt="Edit" style={{ cursor: "pointer" }} />
        </div>
      )}
      {selectedOption === "take" && latitude > 0 && longitude > 0 ? (
        <div className="Basket__map--parent">
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
      ) : (
        selectedOption === "deliver" && (
          <div>
            <h2 className="Basket__take__type__deliver--title">
              {t("Basket.SelectDeliveryType")}
            </h2>

            <CreatableSelect
              options={options}
              className="Basket__take__type__select"
              classNamePrefix="select"
              placeholder={t("Basket.DeliveryTime")}
              isSearchable={false}
              styles={{
                option: (baseStyles) => ({
                  ...baseStyles,
                  fontFamily: "Regular100",
                }),
              }}
              onChange={(event) => setShippingTime(event.value)}
            />

            <div className="Basket__take__type__deliver--input__lists">
              <Input
                text={t("Basket.Region")}
                select
                placeholder={t("Basket.SelectRegion")}
                options={regionOptions}
                onChange={(event) => setCityId(event.value)}
              />
              <Input
                type="text"
                text={t("Basket.Address")}
                name={"address"}
                value={address.toString()}
                onChange={handleChangeBasketData}
              />
              <Input
                type="number"
                text={t("Basket.Entrance")}
                name={"entrance"}
                value={entrance.toString()}
                onChange={handleChangeBasketData}
                required={false}
              />
            </div>

            <div className="Basket__take__type__deliver--input__lists">
              <Input
                type="number"
                text={t("Basket.Floor")}
                name={"floor"}
                required={false}
                onChange={handleChangeBasketData}
              />
              <Input
                type="text"
                text={t("Basket.IntercomNumber")}
                name={"intercom"}
                required={false}
                onChange={handleChangeBasketData}
              />
              <Input
                type="text"
                text={t("Basket.AdditionalNotes")}
                name={"description"}
                required={false}
                onChange={handleChangeBasketData}
              />
            </div>
          </div>
        )
      )}
    </>
  );
};

export default SelectDeliverType;
