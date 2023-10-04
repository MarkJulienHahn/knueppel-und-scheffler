"use client";

import { useState, useEffect } from "react";

import Header from "./index/Header";
import Imprint from "./imprint/Imprint";
import Project from "./project/Project";
import About from "./about/About";
import Body from "./index/Body";

const Main = ({ header, projects, about, clients, jobs, imprint }) => {
  const [lang, setLang] = useState("en");

  const [showAbout, setShowAbout] = useState(false);
  const [showImprint, setShowImprint] = useState(false);
  const [showProject, setShowProject] = useState(false);

  const [projIndex, setProjIndex] = useState(0);
  const [scrollTarget, setScrollTarget] = useState("");

  useEffect(() => {
    const data = localStorage.getItem("lang");
    if (data) {
      setLang(JSON.parse(data));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("lang", JSON.stringify(lang));
  });

  return (
    <>
      {/* <Imprint
        lang={lang}
        showImprint={showImprint}
        setShowImprint={setShowImprint}
        imprint={imprint[0]}
      /> */}
      <Project
        lang={lang}
        setLang={setLang}
        setShowProject={setShowProject}
        showProject={showProject}
        projIndex={projIndex}
        projects={projects}
      />
        <About
          lang={lang}
          setLang={setLang}
          scrollTarget={scrollTarget}
          about={about}
          clients={clients}
          jobs={jobs}
          setShowAbout={setShowAbout}
          showAbout={showAbout}
        />
      <div>
        <Header header={header} />

        <Body
          setScrollTarget={setScrollTarget}
          lang={lang}
          setLang={setLang}
          setProjIndex={setProjIndex}
          setShowProject={setShowProject}
          showProject={showProject}
          setShowAbout={setShowAbout}
          setShowImprint={setShowImprint}
          projects={projects}
        />
      </div>
    </>
  );
};

export default Main;
