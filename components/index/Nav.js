import styles from "../../styles/Nav.module.css";

const Nav = ({ lang, setShowAbout, setScrollTarget }) => {
  const clickAction = (t) => {
    setScrollTarget(t), setShowAbout(true);
  };

  return (
    <div className={styles.wrapper}>
      <h1 style={{ fontFamily: "ItalianGaramondItalic", cursor: "default" }}>
        {lang == "en" ? "Projects" : "Projekte"}
      </h1>
      <h1 onClick={() => clickAction("")}>
        {lang == "en" ? "About" : "Über uns"}
      </h1>
      <h1 onClick={() => clickAction("clients")}>
        {lang == "en" ? "Clients" : "Kunden"}
      </h1>
      <h1 onClick={() => clickAction("jobs")}>Jobs</h1>
    </div>
  );
};

export default Nav;
