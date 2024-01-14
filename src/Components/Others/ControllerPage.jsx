import { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import "../../Css/ControllerPage.css";
import LeftBar from "./LeftBar";
import Basket from "../Basket/Basket";
import PayToProducts from "../Basket/PayToProducts";
import CurrentPurchases from "../CurrentPurchases/CurrentPurchases";
import CurrentPurchasesInfo from "../CurrentPurchases/CurrentPurchasesInfo";
import Archive from "../Archive/Archive";
import ArchiveInfo from "../Archive/ArchiveInfo";
import PersonalData from "../PersonalData/PersonalData";
import Favorites from "../Favorites/Favorites";
import Settings from "../Settings/Settings";
import NewGoods from "../NewGoods/NewGoods";
import { useTranslation } from "react-i18next";

const ControllerPage = () => {
  const location = useLocation();
  const [title, setTitle] = useState("");
  const [token, setToken] = useState(null);
  const [t, i18next] = useTranslation("global");

  useEffect(() => {
    if (location.pathname === `/${i18next.language}/profile/basket`) {
      setTitle(t("Profile.Baskets"));
    } else if (
      location.pathname === `/${i18next.language}/profile/current-purchases`
    ) {
      setTitle(t("Profile.CurrentPurchases"));
    } else if (location.pathname === `/${i18next.language}/profile/archive`) {
      setTitle(t("Profile.Archive"));
    } else if (
      location.pathname === `/${i18next.language}/profile/archive-info`
    ) {
      setTitle(t("Profile.Archive"));
    } else if (
      location.pathname ===
      `/${i18next.language}/profile/current-purchases-info`
    ) {
      setTitle(t("Profile.CurrentPurchases"));
    } else if (
      location.pathname === `/${i18next.language}/profile/personal-data`
    ) {
      setTitle(t("Profile.PersonalInformation"));
    } else if (location.pathname === `/${i18next.language}/profile/settings`) {
      setTitle(t("Profile.Settings"));
    } else if (location.pathname === `/${i18next.language}/profile/favorites`) {
      setTitle(t("Profile.Favorites"));
    } else if (location.pathname === `/${i18next.language}/profile/new-goods`) {
      setTitle(t("Profile.NewProducts"));
    }
    setToken(localStorage.getItem("userToken"));
  }, [location, t, i18next]);

  return (
    <div className="ControllerPage--parent">
      {token && <LeftBar />}
      <div className="Router__container" style={{ width: !token && "100%" }}>
        <h2 className="ControllerPage--title">{title}</h2>
        <Routes>
          <Route path="basket" Component={Basket} />
          <Route path="pay-to-products" Component={PayToProducts} />
          {token && (
            <Route path="current-purchases" Component={CurrentPurchases} />
          )}
          {token && (
            <Route
              path="current-purchases-info"
              Component={CurrentPurchasesInfo}
            />
          )}
          {token && <Route path="archive" Component={Archive} />}
          {token && <Route path="archive-info" Component={ArchiveInfo} />}
          {token && <Route path="personal-data" Component={PersonalData} />}
          <Route path="favorites" Component={Favorites} />
          {token && <Route path="settings" Component={Settings} />}
          {token && <Route path="new-goods" Component={NewGoods} />}
        </Routes>
      </div>
    </div>
  );
};

export default ControllerPage;
