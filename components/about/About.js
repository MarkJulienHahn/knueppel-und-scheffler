import { useState } from "react";

import styles from "../../styles/About.module.css";

import Headline from "./Headline";
import InfoSection from "./InfoSection";
import Footer from "../Footer";

const About = ({
  lang,
  setLang,
  about,
  clients,
  jobs,
  setShowAbout,
  showAbout,
  scrollTarget
}) => {
  const [title, setTitle] = useState("About");

  return (
    <div
      className={`${styles.wrapper} ${
        showAbout ? styles.active : styles.inActive
      }`}
    >
      <div className={styles.inner}>
        {showAbout && (
          <div className={styles.headlineWrapper}>
          <Headline title={title} close={() => setShowAbout(false)} />
          </div>
        )}
        <InfoSection
          lang={lang}
          setTitle={setTitle}
          about={about}
          clients={clients}
          jobs={jobs}
          scrollTarget={scrollTarget}
          showAbout={showAbout}
        />
        <Footer lang={lang} setLang={setLang} />
      </div>
    </div>
  );
};

export default About;
