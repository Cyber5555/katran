import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getWorksSingleRequest } from "../../store/reducer/getWorksSingleSlice.tsx";
import { Input, TextArea, FileInput } from "../Inputs/Input";

import DOMPurify from "dompurify";
import "../../Css/Works.css";

const WorksSingle = () => {
  const { work_url } = useParams();
  const dispatch = useDispatch();
  const [t, i18next] = useTranslation("global");
  const { works_single } = useSelector((state) => state.getWorksSingleSlice);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileError, setFileError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const handleFileChange = (event) => {
    const { size, type, name } = event.target?.files[0];
    const file = event.target?.files[0];
    let filteredType = "";

    if (type) {
      filteredType = type?.split("/")[1];
    }

    if (
      filteredType == "pdf" ||
      filteredType == "doc" ||
      filteredType == "docx"
    ) {
      setSelectedFile(file);
    } else {
      setSelectedFile(null);
    }
  };

  useEffect(() => {
    dispatch(getWorksSingleRequest(work_url));
  }, [dispatch, work_url]);

  const handleChangeWorksData = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const inputs = {
    marginBottom: 20,
    width: "100%",
  };

  return (
    <div className="Works--Container">
      <h3 className="Works__single--title">
        {works_single?.works?.title[i18next.language]}
      </h3>
      <div className="Works__items--time__more--parent">
        <div className="Works__items--time--parent">
          <div className="Works__items--work--time--parent">
            <p className="Works__items--work--time--title">Рабочее время</p>
            <p className="Works__items--work--time">09:00 - 18:00</p>
          </div>
          <div className="Works__items--work--time--parent">
            <p className="Works__items--work--time--title">Зарплата</p>
            <p className="Works__items--work--time">09:00 - 18:00</p>
          </div>
        </div>
      </div>
      <div className="Works__single--form--description">
        <form
          className="Works__single--form"
          onClick={(e) => e.stopPropagation()}>
          <Input
            type="text"
            text={t("Basket.NameSurname")}
            name={"name"}
            value={formData.name}
            onChange={handleChangeWorksData}
            parentStyle={inputs}
          />
          <Input
            type="number"
            text={t("Basket.Phone")}
            name={"phone"}
            value={formData.phone}
            onChange={handleChangeWorksData}
            parentStyle={inputs}
          />
          <Input
            type="email"
            text={t("LoginPopup.email")}
            name={"email"}
            value={formData.email}
            onChange={handleChangeWorksData}
            parentStyle={inputs}
          />
          <TextArea
            text={t("LoginPopup.message")}
            name={"message"}
            value={formData.message}
            onChange={handleChangeWorksData}
            parentStyle={inputs}
            inputStyle={{}}
          />

          <FileInput
            text={t("LoginPopup.email")}
            error={""}
            multiple={false}
            onChange={handleFileChange}
            parentStyle={inputs}
            type={"file"}
            placeholder={
              selectedFile
                ? selectedFile?.name
                : "Загрузите файл  (PDF, DOC, DOCX) max 5MB"
            }
          />
          <div className="Works__borderButton--parent">
            <button className="Works__borderButton" style={{ marginTop: 26 }}>
              Отправить
            </button>
          </div>
        </form>
        <div
          className="Works__single--description"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(
              works_single?.works?.description[i18next.language],
              {
                ALLOWED_TAGS: [
                  "p",
                  "span",
                  "strong",
                  "em",
                  "b",
                  "u",
                  "i",
                  "ol",
                  "ul",
                  "li",
                  "br",
                  "h1",
                  "h2",
                  "h3",
                ],
                ALLOWED_ATTR: ["style"],
                FORBID_TAGS: ["style"],
                FORBID_ATTR: ["style"],
              }
            ),
          }}
        />
        <div style={{ clear: "both" }} />
      </div>
    </div>
  );
};

export default WorksSingle;
