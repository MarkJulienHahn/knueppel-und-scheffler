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
  showProject
}) => {
  const [offsets, setOffsets] = useState({});

  const { windowWidth } = useWindowDimensions();

  const ref = useRef();
  const ref2 = useRef();
  const ref3 = useRef();
  const ref4 = useRef();
  const ref5 = useRef();

  const { ref: bottomRef, inView: visible } = useInView({
    threshold: 0.7,
  });

  useEffect(() => {
    setOffsets([
      ref.current?.offsetLeft,
      ref2.current?.offsetLeft,
      ref3.current?.offsetLeft,
      ref4.current?.offsetLeft,
      ref5.current?.offsetLeft,
    ]);
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
    visible ? setShowNav(false) : setShowNav(true);
  }, [visible]);


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
        </div>

        <div className={styles.item} ref={ref2}>
          <a onClick={() => setShowImprint(true)}>
            {lang == "en" ? "Privacy" : "Datenschutz"}
          </a>
          {/* <span style={{ left: offsets[2] }}>
            {lang == "en" ? "Privacy" : "Datenschutz"}
          </span> */}
        </div>

        <div className={styles.item} ref={ref3}>
          <a onClick={lang == "en" ? () => setLang("de") : () => setLang("en")}>
            {lang == "en" ? "Deutsch" : "English"}
          </a>
          {/* <span style={{ left: offsets[3] }}>
            {lang == "en" ? "Deutsch" : "English"}
          </span> */}
        </div>
      </div>

      {/* <div
        className={styles.row}
        style={{ color: white ? "var(--white)" : "var(--black)" }}
      >
        <p>
          Dorotheenstraße 14
          <br /> 10117 Berlin
        </p>

        <span>
          <p>(+49) 30 308 77 44 – 200</p>
          <span>
            {" "}
            <a href={"mailto:office@knueppel-scheffler.com"}>
              office@knueppel-scheffler.com
            </a>
            {/* <span style={{ left: offsets[0] }}>
              office@knueppel-scheffler.com
            </span> 
          </span>
        </span>

        {/* <div className={styles.item} ref={ref}></div> 

        <div className={`${styles.item} ${styles.instagram}`} ref={ref2}>
          <div>
            <a
              href={"https://www.instagram.com/knueppelscheffler_/"}
              target="blank"
              rel="_noreferrer"
            >
              Instagram
            </a>
            <span style={{ left: offsets[1] }}>Instagram</span>
          </div>{" "}
          <div>
            <a
              href={"https://www.instagram.com/knueppelscheffler_/"}
              target="blank"
              rel="_noreferrer"
            >
              LinkedIn
            </a>
            <span style={{ left: offsets[1] }}>Instagram</span>
          </div>
        </div>

        <div className={styles.item} ref={ref3}>
          <div>
          <a onClick={() => setShowImprint(true)}>
            {lang == "en" ? "Imprint" : "Impressum"}
          </a>
          <span style={{ left: offsets[2] }}>
            {lang == "en" ? "Imprint" : "Impressum"}
          </span>
          </div>
          <div>
          <a onClick={() => setShowImprint(true)}>
            {lang == "en" ? "Privacy" : "Impressum"}
          </a>
          <span style={{ left: offsets[2] }}>
            {lang == "en" ? "Imprint" : "Impressum"}
          </span>
          </div>
        </div>

        {/* <div className={styles.item} ref={ref4}>
          <Link href={"/privacy"}>
            {lang == "en" ? "Privacy" : "Datenschutz"}
          </Link>
          <span style={{ left: offsets[3] }}>
            {lang == "en" ? "Privacy" : "Datenschutz"}
          </span>
        </div> 

        <div className={styles.item} ref={ref5}>
          <a onClick={lang == "en" ? () => setLang("de") : () => setLang("en")}>
            {lang == "en" ? "Deutsch" : "English"}
          </a>
          <span style={{ left: offsets[4] }}>
            {lang == "en" ? "Deutsch" : "English"}
          </span>
        </div>
      </div> */}
    </div>
  );
};

export default Footer;
