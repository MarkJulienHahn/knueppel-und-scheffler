import { useState, useRef, useEffect } from "react";
import useWindowDimensions from "../hooks/useWindowDimensions";
import { useInView } from "react-intersection-observer";

import Image from "next/image";
import Link from "next/link";

import styles from "../styles/Footer.module.css";

import logo from "../public/images/ks_logo.png";
import logoNeg from "../public/images/ks_logo_neg.png";

const visible = {
  opacity: "1",
  pointerEvents: "auto",
};

const invisible = {
  opacity: "0",
  pointerEvents: "none",
};

const Footer = ({
  lang,
  setLang,
  white,
  setShowImprint,
  showNav,
  setShowNav,
  setShowPrivacy,
}) => {
  const [offsets, setOffsets] = useState({});
  const [loaded, setLoaded] = useState(false);

  const { windowWidth } = useWindowDimensions();

  const ref = useRef();
  const ref2 = useRef();
  const ref3 = useRef();
  const ref4 = useRef();
  const ref5 = useRef();

  const { ref: bottomRef, inView: isVisible } = useInView({
    threshold: 0.7,
  });

  const loadedFct = () => {
    setLoaded(true);
  };

  useEffect(() => {
    setOffsets([
      ref.current?.offsetLeft,
      ref2.current?.offsetLeft,
      ref3.current?.offsetLeft,
      ref4.current?.offsetLeft,
      ref5.current?.offsetLeft,
    ]);
    setTimeout(loadedFct, 1000);
  }, []);

  useEffect(() => {
    setOffsets([
      ref.current?.offsetLeft,
      ref2.current?.offsetLeft,
      ref3.current?.offsetLeft,
      ref4.current?.offsetLeft,
      ref5.current?.offsetLeft,
    ]);
  }, [windowWidth]);

  useEffect(() => {
    loaded && isVisible ? setShowNav(false) : setShowNav(true);
  }, [isVisible]);

  return (
    <div className={styles.wrapper} ref={bottomRef}>
      <div className={styles.logo} style={!showNav ? visible : invisible}>
        <Image
          fill
          src={white ? logoNeg : logo}
          style={{ objectFit: "contain" }}
          alt={"Knüppel und Scheffler Logo"}
        />
      </div>

      <div
        className={styles.row}
        style={{ color: white ? "var(--white)" : "var(--black)" }}
      >
        <div className={styles.item} ref={ref}>
          <a onClick={() => setShowImprint(true)}>
            {lang == "en" ? "Imprint" : "Impressum"}
          </a>
          <span>{lang == "en" ? "Imprint" : "Impressum"}</span>
        </div>

        <div className={styles.item} ref={ref2}>
          <a onClick={() => setShowPrivacy(true)}>
            {lang == "en" ? "Privacy" : "Datenschutz"}
          </a>
          <span>{lang == "en" ? "Privacy" : "Datenschutz"}</span>
        </div>

        <div className={styles.item} ref={ref3}>
          <a onClick={lang == "en" ? () => setLang("de") : () => setLang("en")}>
            {lang == "en" ? "Deutsch" : "English"}
          </a>
          <span>{lang == "en" ? "Deutsch" : "English"}</span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
