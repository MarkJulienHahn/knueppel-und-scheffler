import React, { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import Image from "next/image";

import styles from "../../styles/Header.module.css";
import logo from "../../public/images/ks_logo_neg.png";

import SwiperInner from "./SwiperInner";

import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

const Header = ({ header }) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [opacity, setOpacity] = useState(1);

  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };

  const { ref: ref, inView: visible } = useInView({
    threshold: 0,
  });

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    scrollPosition <= 500 && setOpacity((300 - scrollPosition) / 100);
  }, [scrollPosition]);

  useEffect(() => {
    !visible && setOpacity(0);
  });

  console.log(visible, opacity);

  return (
    <div className={styles.wrapper} ref={ref}>
      <div className={styles.logoWrapper}>
        <div className={styles.logo} style={{ opacity: opacity }}>
          <Image fill src={logo} style={{ objectFit: "contain" }} />
        </div>
      </div>

      <Swiper
        loop={true}
        autoplay={{
          delay: 2500,
        }}
        modules={[Autoplay]}
        speed={1000}
      >
        {header.map((entry, i) => (
          <SwiperSlide key={i}>
            <SwiperInner entry={entry} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Header;
