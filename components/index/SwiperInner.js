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
          src={entry.image.url}
          style={{ objectFit: "cover" }}
          placeholder={"blur"}
          blurDataURL={entry.image.metadata.lqip}
        />
      </div>
    </>
  );
};

export default SwiperInner;
