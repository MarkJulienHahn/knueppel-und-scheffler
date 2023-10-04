"use client";

import Nav from "./Nav";
import Projects from "./Projects";
import Footer from "../Footer";

import styles from "../../styles/Body.module.css";

const Body = ({
  lang,
  setLang,
  setProjIndex,
  setShowProject,
  setShowAbout,
  setShowImprint,
  setScrollTarget,
  projects,
}) => {
  return (
    <div className={styles.wrapper}>
      <Nav
        lang={lang}
        setShowAbout={setShowAbout}
        setScrollTarget={setScrollTarget}
      />
      <Projects
        setProjIndex={setProjIndex}
        setShowProject={setShowProject}
        projects={projects}
      />
      <Footer lang={lang} setLang={setLang} setShowImprint={setShowImprint} />
    </div>
  );
};

export default Body;
