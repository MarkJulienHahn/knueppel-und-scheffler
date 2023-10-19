import { useState, useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
import { useRouter } from "next/navigation";

import PortableText from "react-portable-text";
import Image from "next/image";

import styles from "../../styles/Project.module.css";

import Headline from "../about/Headline";
import Footer from "../Footer";

const Project = ({
  lang,
  setLang,
  projIndex,
  projects,
  showProject,
  setShowProject,
  setShowNav,
  setShowPrivacy,
  setShowImprint,
  showNav
}) => {
  const [credits, setCredits] = useState(false);
  const [height, setHeight] = useState();
  const [project, setProject] = useState(projects[projIndex]);

  const router = useRouter();

  const ref2 = useRef();
  const topRef = useRef();

  const { ref, inView } = useInView({
    threshold: 0.8,
  });

  const scrollUp = () => {
    topRef.current?.scrollIntoView();
  };

  useEffect(() => {
    setHeight(ref2.current?.clientHeight);
    !showProject ?? setCredits(false);
  });

  useEffect(() => {
    setProject(projects[projIndex]);
    !showProject && setTimeout(scrollUp, 500) && setCredits(false);
    showProject &&
      history.replaceState(
        { query: projIndex, slug: projects[projIndex].slug },
        `/${projects[projIndex].slug}`,
        `${projects[projIndex].slug}`
      );

    // showProject && router.push(`/${projects[projIndex].slug}`, undefined, { shallow: true});

    !showProject && history.replaceState(null, "/", "/");
  }, [showProject]);

  return (
    <div
      className={`${styles.wrapper} ${
        showProject ? styles.active : styles.inActive
      }`}
    >
      {showProject && (
        <>
          <div
            className={styles.infoOuter}
            style={!inView ? { opacity: "1" } : { opacity: "0" }}
          >
            <div
              className={styles.info}
              // style={{
              //   background: !credits
              //     ? "linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.4))"
              //     : "linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.9))",
              // }}
            >
              <h1 onClick={() => setCredits(!credits)}>{project.name}</h1>
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
                    <PortableText
                      content={lang == "en" ? project.textEn : project.textDe}
                    />
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
      )}
      <div className={styles.inner}>
        {showProject && (
          <Headline title={""} close={() => setShowProject(false)} />
        )}
        <div ref={topRef}></div>
        {project.images.map((image, i) => (
          <div className={styles.image} key={i}>
            <Image
              fill
              src={image.url}
              placeholder={"blur"}
              blurDataURL={image.metadata.lqip}
              style={{ objectFit: "cover" }}
              alt={image.alt ? image.alt : "An image by Knüppel & Scheffler"}
              priority={true}
            />
          </div>
        ))}
        <div
          className={styles.footerWrapper}
          style={inView ? { opacity: "1" } : { opacity: "0" }}
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
  );
};

export default Project;
