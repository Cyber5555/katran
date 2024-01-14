import React, { useEffect } from "react";
import AccordionItems from "../AccordionItems/AccordionItems";
import { useDispatch, useSelector } from "react-redux";
import "../../Css/FAQ.css";
import { faqRequest } from "../../store/reducer/faqSlice.tsx";
import { useTranslation } from "react-i18next";

const FAQ = () => {
  const dispatch = useDispatch();
  const [t, i18next] = useTranslation("global");
  const { faq_data } = useSelector((state) => state.faqSlice);

  useEffect(() => {
    dispatch(faqRequest({}));
  }, [dispatch]);

  return (
    <div className="FAQ--Container">
      <h2 className="FAQ--title">
        {faq_data?.current_page?.title[i18next.language]}
      </h2>
      <h3 className="FAQ--subTitle">
        Список наиболее часто задаваемых вопросов
      </h3>
      {faq_data?.items?.map((faq, index) => (
        <AccordionItems
          key={index}
          content={faq?.answer[i18next.language]}
          title={faq?.title[i18next.language]}
        />
      ))}
    </div>
  );
};

export default FAQ;
