/* eslint-disable react/no-unescaped-entities */
import "../../Css/DownloadApp.css";
import PhoneApp from "../../Assets/images/PhoneApp.png";
import KatranBlack from "../../Assets/icons/KatranBlack.svg";
import ButtonAppStore from "../../Assets/images/ButtonAppStore.png";
import ButtonPlayMarket from "../../Assets/images/ButtonPlayMarket.png";
import { useSelector } from "react-redux";

const DownloadApp = () => {
  const { home_data } = useSelector((state) => state.getHomeDataSlice);

  return (
    <div className="DownloadApp--parent">
      <div>
        <h2 className="Download--title">Скачать приложение</h2>
        <p className="Download--description">{home_data.banner_text}</p>
        <img
          src={ButtonAppStore}
          alt="ButtonAppStore"
          className="DownloadApp__ButtonAppStore"
        />
        <img
          src={ButtonPlayMarket}
          alt="ButtonPlayMarket"
          className="DownloadApp__ButtonPlayMarket"
        />
      </div>
      <div className="DownloadApp--right__side">
        <img src={PhoneApp} alt="PhoneApp" className="DownloadApp__PhoneApp" />
        <img
          src={KatranBlack}
          alt="KatranBlack"
          className="DownloadApp__KatranBlack"
        />
      </div>
    </div>
  );
};

export default DownloadApp;
