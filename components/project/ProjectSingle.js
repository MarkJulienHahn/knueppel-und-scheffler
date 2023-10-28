"use client";

import { useState, useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
import { useRouter } from "next/navigation";

import PortableText from "react-portable-text";
import ProjectImage from "./ProjectImage";

import styles from "../../styles/Project.module.css";

import Footer from "../Footer";
import Imprint from "../imprint/Imprint";

export default function ProjectSingle({ projects, imprint, privacy, slug }) {
  const [credits, setCredits] = useState(false);
  const [height, setHeight] = useState();
  const [showProject, setShowProject] = useState(true);
  const [showImprint, setShowImprint] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showNav, setShowNav] = useState(false);
  const [lang, setLang] = useState("en");


  const router = useRouter();

  const project = projects.filter((p) => p.slug == slug)[0];

  const routerAction = () => {
    setShowProject(false), setTimeout(router.push("/"), 1000);
  };

  const ref2 = useRef();
  const topRef = useRef();

  const { ref, inView } = useInView({
    threshold: 0.8,
  });

  useEffect(() => {
    setHeight(ref2.current?.clientHeight);
  }, []);

  return (
    <>
      <Imprint
        lang={lang}
        showImprint={showImprint}
        showPrivacy={showPrivacy}
        setShowImprint={setShowImprint}
        setShowPrivacy={setShowPrivacy}
        imprint={imprint[0]}
        privacy={privacy[0]}
      />
      <div
        className={`${styles.wrapper} ${
          showProject ? styles.active : styles.inActive
        }`}
      >
        <>
          <div
            className={styles.infoOuter}
            style={!inView ? { opacity: "1" } : { opacity: "0" }}
          >
            <div className={styles.info}>
              <h1 onClick={() => setCredits(!credits)}>{project?.name}</h1>
              <div
                className={styles.credits}
                style={
                  credits && !inView
                    ? { height: height, opacity: "1" }
                    : { height: "0px", opacity: "0" }
                }
              >
                <div ref={ref2} style={{ paddingBottom: "30px" }}>
                  <div
                    style={{
                      pointerEvents: credits ? "auto" : "none",
                      cursor: "pointer",
                    }}
                    onClick={() => setCredits(!credits)}
                  >
                    {project?.textEn && project?.textDe ? (
                      <PortableText
                        content={
                          lang == "en" ? project?.textEn : project?.textDe
                        }
                      />
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
              <p
                className={styles.infoButton}
                onClick={() => setCredits(!credits)}
              >
                {lang == "en" ? (!credits ? "More Info" : "Less Info") : ""}
                {lang == "de" ? (!credits ? "Mehr Infos" : "Weniger Info") : ""}
              </p>
            </div>
          </div>

          <div
            className={styles.background}
            style={{ opacity: !credits ? "0.4" : "1" }}
          ></div>
        </>

        <div className={styles.inner}>
          <div className={styles.closeContainer} onClick={routerAction}>
            <div className={styles.leftright}></div>
            <div className={styles.rightleft}></div>
          </div>

          <div ref={topRef}></div>

          {project?.images.map((image, i) => (
            <div className={styles.image} key={i}>
              <ProjectImage image={image} i={i} />
            </div>
          ))}

          <div
            className={styles.footerWrapper}
            //   style={inView ? { opacity: "1" } : { opacity: "0" }}
            ref={ref}
          >
            <Footer
              white={true}
              lang={lang}
              setLang={setLang}
              setShowNav={setShowNav}
              showNav={showNav}
              setShowImprint={setShowImprint}
              setShowPrivacy={setShowPrivacy}
            />
          </div>
        </div>
      </div>
    </>
  );
}
