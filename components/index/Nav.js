import { useState } from "react";

import styles from "../../styles/Nav.module.css";

const visible = {
  opacity: "1",
  pointerEvents: "auto",
};

const invisible = {
  opacity: "0",
  pointerEvents: "none",
};

const Nav = ({ lang, setShowAbout, setScrollTarget, showNav }) => {
  const clickAction = (t) => {
    setScrollTarget(t), setShowAbout(true);
  };

  return (
    <div className={styles.wrapper} style={showNav ? visible : invisible}>
      <h1 style={{ pointerEvents: "none", cursor: "default" }}>
        {lang == "en" ? "Projects" : "Projekte"}
      </h1>
      <h1 onClick={() => clickAction("")}>
        {lang == "en" ? "About" : "Über uns"}
      </h1>
      <h1 onClick={() => clickAction("clients")}>
        {lang == "en" ? "Clients" : "Kunden"}
      </h1>
      <h1 onClick={() => clickAction("jobs")}>Jobs</h1>
      <h1 onClick={() => clickAction("contact")}>
        {lang == "en" ? "Contact" : "Kontakt"}
      </h1>
    </div>
  );
};

export default Nav;
