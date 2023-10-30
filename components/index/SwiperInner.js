import { useState, useEffect } from "react";

import { useSwiper } from "swiper/react";

import useWindowDimensions from "../../hooks/useWindowDimensions";
import styles from "../../styles/Header.module.css";
import Image from "next/image";

import { urlFor } from "../../hooks/useImageUrlBuilder";

const SwiperInner = ({ entry }) => {
  const [url, setUrl] = useState(null);
  const { windowWidth } = useWindowDimensions();
  const swiper = useSwiper();

  const crop = entry.image.crop;
  const width = entry.image.asset.metadata.dimensions.width;
  const height = entry.image.asset.metadata.dimensions.height;

  const getUrl = () => {
    if (crop) {
      // compute the cropped image's area
      const croppedWidth = Math.floor(width * (1 - (crop.right + crop.left)));

      const croppedHeight = Math.floor(height * (1 - (crop.top + crop.bottom)));

      // compute the cropped image's position
      const left = Math.floor(width * crop.left);
      const top = Math.floor(height * crop.top);

      // gather into a url
      return urlFor(entry.image.asset.url)
        .rect(left, top, croppedWidth, croppedHeight)
        .quality(50)
        .url();
    } else
      return urlFor(entry.image.asset.url)
        .width(windowWidth > 1000 ? windowWidth : 1000)
        .quality(50)
        .url();
  };

  useEffect(() => {
    setUrl(getUrl());
  }, []);

  return (
    url && (
      <>
        <div className={styles.swiperControls}>
          <div
            className={styles.swiperPrev}
            onClick={() => swiper.slidePrev()}
          ></div>
          <div
            className={styles.swiperNext}
            onClick={() => swiper.slideNext()}
          ></div>
        </div>
        <div className={styles.imgWrapper}>
          <Image
            fill
            src={url}
            style={{
              objectFit: "cover",
              objectPosition: entry.image.hotspot
                ? `${entry.image.hotspot.x * 100}% ${
                    entry.image.hotspot.y * 100
                  }%`
                : "center",
            }}
            placeholder={"blur"}
            blurDataURL={entry.image.asset.metadata.lqip}

            alt={
              entry.image.alt
                ? entry.image.alt
                : "An image on the Website of Knüppel & Scheffler"
            }
          />
        </div>
      </>
    )
  );
};

export default SwiperInner;
