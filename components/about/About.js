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
  contact,
  setShowAbout,
  showAbout,
  scrollTarget,
  setShowNav,
  showNav,
  setShowImprint,
  setShowPrivacy,
}) => {
  const [title, setTitle] = useState(lang == "en" ? "About" : "Über Uns");

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
          contact={contact}
        />
        <Footer
          lang={lang}
          setLang={setLang}
          setShowImprint={setShowImprint}
          setShowPrivacy={setShowPrivacy}
          showNav={showNav}
          setShowNav={setShowNav}
        />
      </div>
    </div>
  );
};

export default About;
