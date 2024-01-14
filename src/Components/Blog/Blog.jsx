import React, { useEffect } from "react";
import "../../Css/Blog.css";
import { useDispatch, useSelector } from "react-redux";
import { blogRequest } from "../../store/reducer/blogSlice.tsx";
import { useTranslation } from "react-i18next";
import moment from "moment";
import DOMPurify from "dompurify";
import { useNavigate } from "react-router-dom";

const Blog = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { blog_data } = useSelector((state) => state.blogSlice);
  const [t, i18next] = useTranslation();

  useEffect(() => {
    dispatch(blogRequest({}));
  }, [dispatch]);

  return (
    <div className="Blog">
      <h2 className="Blog--title">
        {blog_data?.current_page?.title[i18next.language]}
      </h2>
      <div className="Blog--container">
        {blog_data?.blogs?.map((item, index) => (
          <div
            className="Blog--items"
            key={index}
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/${i18next.language}/blog/${item.url}`);
            }}>
            <img
              src={item?.image}
              alt={item?.image}
              className="Blog--image"
              loading="eager"
            />
            <div className="Blog--text__container">
              <p className="Blog--date">
                {moment.utc(item.created_at).format("DD.MM.YYYY")}
              </p>
              <h2 className="Blog--items__title">
                {item?.title[i18next.language]}
              </h2>
              <div
                className="Blog--description"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(
                    item?.description[i18next.language],
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
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
