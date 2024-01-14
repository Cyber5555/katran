import { useDispatch, useSelector } from "react-redux";
import "../../Css/Header.css";
import Katran from "../../Assets/icons/Katran.svg";
import Language from "../Others/Language";
import HeaderSearch from "./HeaderSearch";
import { Slider } from "../slider/slider";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { ReactComponent as Burger } from "../../Assets/icons/Burger.svg";
import { setIsOpenBurgerMenu } from "../../store/other/openBurgerMenuSlice";
import useWindowSize from "../useWindowSize";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const windowSize = useWindowSize();
  const [t, i18next] = useTranslation("global");
  const { header_footer_data } = useSelector(
    (state) => state.getHeaderDataSlice
  );

  return (
    <header>
      <Slider />
      <div className="Navbar--parent">
        <div className="Navbar--firstBox">
          <img
            src={Katran}
            alt="Katran"
            className="Katran--logo"
            onClick={() => navigate(`/${i18next.language}`)}
          />
          <div className="Number__and__language">
            <a
              href={`tel:${header_footer_data?.contact}`}
              className="Number"
              onClick={(e) => e.stopPropagation()}>
              {header_footer_data?.contact}
            </a>

            <Language />
            {windowSize.width <= 1024 && (
              <Burger onClick={() => dispatch(setIsOpenBurgerMenu())} />
            )}
          </div>
        </div>
      </div>
      <HeaderSearch />
    </header>
  );
};

export default Header;
