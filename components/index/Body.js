"use client";

import { useState } from "react";

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
  showNav,
  showProject,
  setShowNav,
}) => {
  return (
    <div className={styles.wrapper}>
      <Nav
        lang={lang}
        setShowAbout={setShowAbout}
        setScrollTarget={setScrollTarget}
        showNav={showNav}
      />
      <Projects
        setProjIndex={setProjIndex}
        setShowProject={setShowProject}
        projects={projects}
      />
      <Footer
        lang={lang}
        setLang={setLang}
        setShowImprint={setShowImprint}
        showNav={showNav}
        setShowNav={setShowNav}
        showProject={showProject}
      />
    </div>
  );
};

export default Body;
