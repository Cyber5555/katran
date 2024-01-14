import React, { useState } from "react";
import DOMPurify from "dompurify";
import PolygonBottom from "../../Assets/icons/PolygonBottom.svg";
import PolygonTop from "../../Assets/icons/PolygonTop.svg";

const AccordionItems = ({ title, content }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="Accordion__item">
      <button
        className={`Accordion__title ${isOpen ? "opened" : ""}`}
        onClick={() => setIsOpen(!isOpen)}>
        {title ? title : <p></p>}
        {isOpen ? (
          <img src={PolygonTop} alt="PolygonTop" />
        ) : (
          <img src={PolygonBottom} alt="PolygonBottom" />
        )}
      </button>
      {isOpen && (
        <div
          className="Accordion__content"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(content, {
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
            }),
          }}
        />
      )}
    </div>
  );
};

export default AccordionItems;
