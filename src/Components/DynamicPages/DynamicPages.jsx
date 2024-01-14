import React, { useEffect } from "react";
import DOMPurify from "dompurify";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { dynamicPagesRequest } from "../../store/reducer/dynamicPagesSlice.tsx";
import "../../Css/DynamicPages.css";
import FileDownload from "../../Assets/icons/FileDownload.svg";
import Fancybox from "../Fancybox/Fancybox.jsx";

const DynamicPages = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [t, i18next] = useTranslation("global");
  const { dynamic_url } = useParams();
  const { dynamic_data } = useSelector((state) => state.dynamicPagesSlice);

  useEffect(() => {
    dispatch(dynamicPagesRequest(dynamic_url));
  }, [dispatch, dynamic_url]);

  return (
    <div className="DynamicPages">
      <h2 className="DynamicPages--title">
        {dynamic_data?.dynamic_page?.title[i18next.language]}
      </h2>
      {dynamic_data?.dynamic_page?.image && (
        <img
          src={dynamic_data?.dynamic_page?.image}
          alt={dynamic_data?.dynamic_page?.image}
          className="DynamicPages--image"
          loading="eager"
        />
      )}
      <div
        className="DynamicPages--description"
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(
            dynamic_data?.dynamic_page?.content[i18next.language],
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
      {/* <div className="DynamicPages--gallery"> */}
      <Fancybox
        options={{
          Carousel: {
            infinite: true,
          },
        }}>
        {dynamic_data?.gallery?.map((item) => (
          <img
            data-fancybox="gallery"
            src={item?.image}
            alt={item?.image}
            className="DynamicPages--gallery--image"
          />
        ))}
      </Fancybox>
      {/* </div> */}
      <div className="DynamicPages--download--parent">
        {dynamic_data?.file?.map((item) => (
          <Link
            key={item.id}
            to={item?.title}
            download={true}
            onClick={(e) => e.stopPropagation()}
            className="DynamicPages--download">
            <img src={FileDownload} alt="FileDownload" />
            {item?.name[i18next.language]}
          </Link>
        ))}
      </div>
      <div className="DynamicPages--sub__page">
        {dynamic_data?.sub_page?.map((item) => (
          <div
            className="DynamicPages--sub__page--items"
            key={item.id}
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/${i18next.language}/pages/${item.url}`);
            }}>
            <img
              src={item?.image}
              alt={item?.image}
              className="DynamicPages--sub__page--image"
            />
            <p className="DynamicPages--sub__page--title">text</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DynamicPages;
