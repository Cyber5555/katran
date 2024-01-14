import "../../Css/Footer.css";

import KatranBlack from "../../Assets/icons/KatranBlack.svg";
import IDramFooter from "../../Assets/icons/IDramFooter.svg";
import AcraFooter from "../../Assets/icons/AcraFooter.svg";
import InecoBankFooter from "../../Assets/icons/InecoBankFooter.svg";
import ButtonAppStoreSmall from "../../Assets/images/ButtonAppStoreSmall.png";
import ButtonPlayMarketSmall from "../../Assets/images/ButtonPlayMarketSmall.png";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const navigate = useNavigate();
  const [t, i18next] = useTranslation("global");
  const { header_footer_data } = useSelector(
    (state) => state.getHeaderDataSlice
  );

  const changeLocation = (e, page) => {
    e.stopPropagation();
    // `/${i18next.language}/product-list/${page?.url}`

    if (page.static === "home") {
      navigate(`/${i18next.language}`);
    } else if (page.static === "seafood") {
      navigate(`/${i18next.language}/product-list/${page?.url}`);
    } else if (page.static === "readyfood") {
      navigate(`/${i18next.language}/product-list/${page?.url}`);
    } else if (page.static === "brand") {
      navigate(`/${i18next.language}/brand`);
    } else if (page.static === "works") {
      navigate(`/${i18next.language}/works`);
    } else if (page.static === "blog") {
      navigate(`/${i18next.language}/blog`);
    } else if (page.static === "faq") {
      navigate(`/${i18next.language}/faq`);
    } else if (page.static === "contact") {
      navigate(`/${i18next.language}/contact`);
    } else if (page.static === "about") {
      navigate(`/${i18next.language}/about-us`);
    } else if (page.static === "promo") {
      navigate(`/${i18next.language}/promo`);
    } else {
      if (!page.static) {
        navigate(`/${i18next.language}/pages/${page?.url}`);
      }
    }
  };

  return (
    <footer>
      <div className="Footer__container">
        <div className="Footer__contents--Parent">
          <img
            src={KatranBlack}
            alt="KatranBlack"
            className="Footer__contents--logo"
            onClick={() => navigate(`/${i18next.language}`)}
          />

          {header_footer_data?.socials?.length > 0 && (
            <div className="Footer__social--parent">
              {header_footer_data?.socials?.map((social, index) => {
                social.data.icon && (
                  <a href={social?.data?.url} key={index}>
                    <img src={social?.data?.icon} alt="social icons" />
                  </a>
                );
              })}
            </div>
          )}

          <p className="Footer__links" id="Footer__links__first_box">
            {header_footer_data.address}
          </p>

          <p id="Footer--tel">
            <a
              href={`tel:${header_footer_data.contact}`}
              onClick={(e) => e.stopPropagation()}>
              {header_footer_data.contact}
            </a>
          </p>

          <p id="Footer--mail">
            <a
              href={`mailto:${header_footer_data.email}`}
              onClick={(e) => e.stopPropagation()}>
              {header_footer_data.email}
            </a>
          </p>
        </div>

        <div className="Footer__contents--Parent first">
          {header_footer_data?.footer_pages?.map((page, index) => (
            <p
              onClick={(e) => changeLocation(e, page)}
              className="Footer__links"
              key={index}>
              {page?.title[i18next.language]}
            </p>
          ))}
        </div>

        <div className="Footer__contents--Parent second">
          {header_footer_data?.footer_pages_information?.map((page, index) => (
            <p
              onClick={(e) => changeLocation(e, page)}
              className="Footer__links"
              key={index}>
              {page?.title[i18next.language]}
            </p>
          ))}
        </div>

        <div className="Footer__contents--Parent last">
          <p className="Footer__download__app--info">
            {t("DownloadApp.Download")}
          </p>

          <div className="Footer__download__app--parent">
            <img src={ButtonAppStoreSmall} alt="ButtonAppStore" />
            <img src={ButtonPlayMarketSmall} alt="ButtonPlayMarket" />
          </div>

          <p className="Footer__download__app--info">платежные системы</p>
          <div className="Footer__payment--parent">
            <img src={InecoBankFooter} alt="InecoBankFooter" />
            <img src={IDramFooter} alt="IDramFooter" />
            <img src={AcraFooter} alt="AcraFooter" />
          </div>
        </div>

        <div className="Footer__copyright--parent">
          <p className="Footer__copyright--app">© Katran LLC, 2023</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
