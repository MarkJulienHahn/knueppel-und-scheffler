import { useState, useRef, useEffect } from "react";
import useWindowDimensions from "../hooks/useWindowDimensions";

import Image from "next/image";
import Link from "next/link";

import styles from "../styles/Footer.module.css";

import logo from "../public/images/ks_logo.png";
import logoNeg from "../public/images/ks_logo_neg.png";

const Footer = ({ lang, setLang, white, setShowImprint }) => {
  const [offsets, setOffsets] = useState({});

  const { windowWidth } = useWindowDimensions();

  const ref = useRef();
  const ref2 = useRef();
  const ref3 = useRef();
  const ref4 = useRef();
  const ref5 = useRef();

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

  return (
    <div className={styles.wrapper}>
      <div className={styles.logo}>
        <Image
          fill
          src={white ? logoNeg : logo}
          style={{ objectFit: "contain" }}
        />
      </div>
      <div
        className={styles.row}
        style={{ color: white ? "var(--white)" : "var(--black)" }}
      >
        <p>Dorotheenstr. 14, 10117 Berlin</p>

        <p>T: (+49) 30 308 77 44 – 200</p>

        <div className={styles.item} ref={ref}>
          <a href={"mailto:office@knueppel-scheffler.com"}>
            office@knueppel-scheffler.com
          </a>
          <span style={{ left: offsets[0] }}>
            office@knueppel-scheffler.com
          </span>
        </div>

        <div className={styles.item} ref={ref2}>
          <a
            href={"https://www.instagram.com/knueppelscheffler_/"}
            target="blank"
            rel="_noreferrer"
          >
            Instagram
          </a>
          <span style={{ left: offsets[1] }}>Instagram</span>
        </div>

        <div className={styles.item} ref={ref3}>
          <a onClick={() => setShowImprint(true)}>
            {lang == "en" ? "Imprint" : "Impressum"}
          </a>
          <span style={{ left: offsets[2] }}>
            {lang == "en" ? "Imprint" : "Impressum"}
          </span>
        </div>

        {/* <div className={styles.item} ref={ref4}>
          <Link href={"/privacy"}>
            {lang == "en" ? "Privacy" : "Datenschutz"}
          </Link>
          <span style={{ left: offsets[3] }}>
            {lang == "en" ? "Privacy" : "Datenschutz"}
          </span>
        </div> */}

        <div className={styles.item} ref={ref5}>
          <a onClick={lang == "en" ? () => setLang("de") : () => setLang("en")}>
            {lang == "en" ? "Deutsch" : "English"}
          </a>
          <span style={{ left: offsets[4] }}>
            {lang == "en" ? "Deutsch" : "English"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
