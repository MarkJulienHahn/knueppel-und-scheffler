import { useSwiper } from "swiper/react";

import styles from "../../styles/Header.module.css";
import Image from "next/image";

const SwiperInner = ({ entry }) => {
  const swiper = useSwiper();

  return (
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
          src={entry.image.asset.url}
          style={{
            objectFit: "cover",
            objectPosition: entry.image.hotspot
              ? `${entry.image.hotspot.x * 100}% ${entry.image.hotspot.y * 100}%`
              : "center",
          }}
          placeholder={"blur"}
          blurDataURL={entry.image.asset.metadata.lqip}
          // loading={"eager"}
          alt={
            entry.image.alt
              ? entry.image.alt
              : "An image on the Website of Knüppel & Scheffler"
          }
        />
      </div>
    </>
  );
};

export default SwiperInner;
