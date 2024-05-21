import { useState, useEffect } from "react";
import { useSwiper } from "swiper/react";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import styles from "../../styles/Header.module.css";
import Image from "next/image";
import { urlFor } from "../../hooks/useImageUrlBuilder";

import useDevicePixelRatio from "../../hooks/useDevicePixelRatio";

const SwiperInner = ({ entry }) => {
  const [url, setUrl] = useState(null);
  const [srcSet, setSrcSet] = useState(null);
  const { windowWidth, windowHeight } = useWindowDimensions();
  const swiper = useSwiper();

  const crop = entry.image.crop;
  const width = entry.image.asset.metadata.dimensions.width;
  const height = entry.image.asset.metadata.dimensions.height;

  const getUrl = (size) => {
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
        .width(size)
        .quality(50)
        .url();
    } else return urlFor(entry.image.asset.url).width(size).quality(50).url();
  };

  useEffect(() => {
    const url = getUrl(
      Math.floor(
        windowWidth >
          windowHeight * entry.image.asset.metadata.dimensions.aspectRatio
          ? Math.floor(windowWidth * 1.5)
          : Math.floor(
              windowHeight *
                entry.image.asset.metadata.dimensions.aspectRatio *
                1.5
            )
      )
    );
    setUrl(url);
    const srcSet = `
      ${getUrl(320 * 2)} 320w,
      ${getUrl(480 * 2)} 480w,
      ${getUrl(800 * 2)} 800w,
      ${getUrl(1000 * 2)} 1000w,
      ${getUrl(1600 * 2)} 1600w
    `;
    setSrcSet(srcSet);
  }, [windowWidth]);

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
            srcSet={srcSet}
            sizes="(max-width: 320px) 280px, (max-width: 480px) 440px, (max-width: 800px) 760px, 1000px"
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
