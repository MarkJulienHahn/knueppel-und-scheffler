import { useState, useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
import { useRouter } from "next/navigation";

import Image from "next/image";
import PortableText from "react-portable-text";

import Job from "./Job";

import styles from "../../styles/About.module.css";

const InfoSection = ({
  lang,
  about,
  clients,
  jobs,
  setTitle,
  scrollTarget,
  showAbout,
}) => {
  const [showJobs, setShowJobs] = useState(false);
  const [jobIndex, setJobIndex] = useState(0);

  const router = useRouter();

  const { ref: aboutRef, inView: aboutVisible } = useInView({
    threshold: 0,
  });
  const { ref: clientsRef, inView: clientsVisible } = useInView({
    threshold: 0.8,
  });
  const { ref: jobsRef, inView: jobsVisible } = useInView({
    threshold: 0.8,
  });

  const clientScrollRef = useRef();
  const jobsScrollRef = useRef();
  const aboutScrollRef = useRef();

  const handleClick = (i) => {
    setJobIndex(i), setShowJobs(true);
  };

  const routerAboutAction = () => {
    router.push(`/?about`, undefined, { shallow: true });
  };

  const resetScroll = () => {
    aboutScrollRef.current?.scrollIntoView();
  };

  // useEffect(() => {
  //   aboutVisible && lang == "en" && setTitle("About");
  //   clientsVisible && lang == "en" && setTitle("Clients");
  //   jobsVisible && lang == "en" && setTitle("Jobs");

  //   aboutVisible && lang == "de" && setTitle("Über Uns");
  //   clientsVisible && lang == "de" && setTitle("Kunden");
  //   jobsVisible && lang == "de" && setTitle("Jobs");
  // });

  useEffect(() => {
    aboutVisible && setTitle("About");
    clientsVisible && setTitle("Clients");
    jobsVisible && setTitle("Jobs");
  });

  useEffect(() => {
    scrollTarget == "clients" &&
      clientScrollRef.current?.scrollIntoView({ behavior: "smooth" });
    scrollTarget == "jobs" &&
      jobsScrollRef.current?.scrollIntoView({ behavior: "smooth" });
    scrollTarget == "" &&
      aboutScrollRef.current?.scrollIntoView({ behavior: "smooth" });
    !showAbout && setTimeout(resetScroll, 500);
  }, [showAbout, scrollTarget]);

  // useEffect(() => {
  //   showAbout
  //     ? setTimeout(routerAboutAction, 1000)
  //     : router.push(`/`, "/about", { shallow: true });
  // }, [showAbout]);

  return (
    <>
      <div ref={aboutScrollRef}></div>
      <div
        className={`${styles.wrapper} ${
          showJobs ? styles.active : styles.inActive
        }`}
        style={{ zIndex: "200" }}
        ref={aboutRef}
      >
        <div className={styles.inner}>
          <Job
            lang={lang}
            setShowJobs={setShowJobs}
            jobIndex={jobIndex}
            showJobs={showJobs}
            jobs={jobs}
          />
        </div>
      </div>
      <div className={styles.infoWrapper}>
        <div className={styles.infoImage}>
          <Image
            fill
            src={about.image}
            style={{ objectFit: "contain" }}
            alt={"Studio view of the Knüppel & Scheffler Studio"}
          />
        </div>
        <div className={styles.infoText}>
          <PortableText content={lang == "en" ? about.textEn : about.textDe} />
        </div>

        <div className={styles.clientsWrapper} ref={clientsRef}>
          <p ref={clientScrollRef}>{lang == "en" ? "Clients:" : "Kunden:"}</p>
          {clients.map((client, i) => (
            <h1 key={i}>{client.client}</h1>
          ))}
        </div>

        {jobs.length ? (
          <div className={styles.jobsWrapper} ref={jobsRef}>
            <p ref={jobsScrollRef}>Jobs:</p>
            {jobs.map((job, i) => (
              <h1 onClick={() => handleClick(i)} key={i}>
                {lang == "en" ? job.jobTitleEn : job.jobTitleDe}
              </h1>
            ))}
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default InfoSection;
