import React, { useEffect } from "react";
import "../../Css/BlogSingle.css";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { blogSingleRequest } from "../../store/reducer/blogSingleSlice.tsx";
import { useParams } from "react-router-dom";
import DOMPurify from "dompurify";
import moment from "moment";
import Fancybox from "../Fancybox/Fancybox.jsx";

const BlogSingle = () => {
  const dispatch = useDispatch();
  const { blog_single_data } = useSelector((state) => state.blogSingleSlice);
  const [t, i18next] = useTranslation();
  const { blog_url } = useParams();
  useEffect(() => {
    dispatch(blogSingleRequest(blog_url));
  }, [blog_url, dispatch]);

  return (
    <div className="BlogSingle">
      <h2 className="BlogSingle--title">
        {blog_single_data?.blog?.title[i18next.language]}
      </h2>
      <div className="BlogSingle--container">
        <div className="BlogSingle--image--parent">
          <p className="BlogSingle--date">
            {moment
              .utc(blog_single_data?.blog?.created_at)
              .format("DD.MM.YYYY")}
          </p>
          <img
            src={blog_single_data?.blog?.image}
            alt=""
            className="BlogSingle--image"
          />
        </div>
        <div
          className="BlogSingle--description"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(
              blog_single_data?.blog?.description[i18next.language],
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
      <div style={{ clear: "both" }} />
      <Fancybox className="BlogSingle--gallery--parent">
        {blog_single_data?.gallery?.map((image) => (
          <img
            data-fancybox="gallery"
            src={image?.image}
            alt={image?.image}
            className="BlogSingle--gallery--images"
          />
        ))}
      </Fancybox>
    </div>
  );
};

export default BlogSingle;
