import React from "react";
import styles from "./slider.module.css";
import Carousel from "./carousel";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

export const Slider = () => {
  const { home_data } = useSelector((state) => state.getHomeDataSlice);
  const [t, i18next] = useTranslation("global");
  return home_data?.slider?.length ? (
    <div className={styles.SliderParent}>
      <Carousel length={home_data?.slider?.length}>
        {home_data.slider.map((item, index) => (
          <React.Fragment key={index}>
            <h2 className={styles.RenderedText}>
              {item.title[i18next.language]}
            </h2>

            {item?.image ? (
              <img
                src={item.image}
                alt={`Shape${index + 1}`}
                key={index}
                className={styles.SliderImages}
              />
            ) : (
              ""
            )}
          </React.Fragment>
        ))}
      </Carousel>
    </div>
  ) : (
    ""
  );
};
