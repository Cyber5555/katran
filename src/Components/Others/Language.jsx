import { useTranslation } from "react-i18next";
import "../../Css/Language.css";
import Earn from "../../Assets/icons/Earn.svg";
import Armenian from "../../Assets/images/Armenian.png";
import Russian from "../../Assets/images/Russian.png";
import English from "../../Assets/images/English.png";
import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useWindowSize from "../useWindowSize";

const Language = () => {
  const windowSize = useWindowSize();
  const [t, i18next] = useTranslation("global");
  const [language, setLanguage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const [isDropdownOpened, setIsDropdownOpened] = useState(false);
  const { pathname } = location;

  const changeLanguage = (lang, item) => {
    localStorage.setItem("language", lang);
    i18next.changeLanguage(lang);

    const locationLang = pathname?.split(`/`)[1];
    const replaced = pathname.replace(`/${locationLang}`, "");

    if (
      pathname === "/" ||
      pathname === "/hy" ||
      pathname === "/ru" ||
      pathname === "/en"
    ) {
      navigate(`/${lang}`);
    } else {
      navigate(`/${lang}${replaced}`);
      console.log();
    }
    setLanguage(item.label);
  };

  useEffect(() => {
    const storedLang = localStorage.getItem("language");

    if (storedLang) {
      i18next.changeLanguage(storedLang);
    }
    if (storedLang === "/") {
      setLanguage("Հայերեն");
    } else if (storedLang === "hy") {
      setLanguage("Հայերեն");
    } else if (storedLang === "ru") {
      setLanguage("Русский");
    } else if (storedLang === "en") {
      setLanguage("English");
    }
  }, [i18next, i18next.language, pathname]);

  useEffect(() => {
    const handleBodyClick = (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (!e.target.classList.contains("Language__dropdown")) {
        setIsDropdownOpened(false);
      }
    };

    const handleScroll = () => {
      setIsDropdownOpened(false);
    };

    document.body.addEventListener("click", handleBodyClick);
    document.addEventListener("scroll", handleScroll);

    return () => {
      document.body.removeEventListener("click", handleBodyClick);
      document.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleLanguage = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDropdownOpened((prevState) => !prevState);
  }, []);

  const options = [
    { label: "Հայերեն", value: "hy", image: Armenian },
    { label: "Русский", value: "ru", image: Russian },
    { label: "English", value: "en", image: English },
  ];

  return (
    <button className="Language" onClick={toggleLanguage} aria-haspopup="true">
      <img src={Earn} alt="Earn" />
      {windowSize.width > 1024 && language}
      <ul
        className={`Language__dropdown ${isDropdownOpened ? "opened" : ""}`}
        aria-hidden={isDropdownOpened}>
        {options.map((item) => (
          <li
            id={item.value}
            key={item.value}
            onClick={(event) => {
              changeLanguage(event.target.id, item);
            }}>
            <img
              src={item.image}
              alt={`Language ${item.image}`}
              id={item.value}
            />
            {item.label}
          </li>
        ))}
      </ul>
    </button>
  );
};

export default Language;
