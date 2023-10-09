import { useState, useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
import { useRouter, usePathname } from "next/navigation";

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
  const pathname = usePathname();

  const { ref: aboutRef, inView: aboutVisible } = useInView({
    threshold: 0,
  });
  const { ref: clientsRef, inView: clientsVisible } = useInView({
    threshold: 0.8,
  });
  const { ref: jobsRef, inView: jobsVisible } = useInView({
    threshold: 0.8,
  });
  const { ref: contactRef, inView: contactVisible } = useInView({
    threshold: 0.8,
  });

  const clientScrollRef = useRef();
  const jobsScrollRef = useRef();
  const aboutScrollRef = useRef();
  const contactScrollRef = useRef();

  const handleClick = (i) => {
    setJobIndex(i), setShowJobs(true);
  };

  const routerAboutAction = () => {
    // router.push(`${pathname}/?about`, undefined, { shallow: true });
    history.replaceState(null, "/about", "/about");
  };

  const routerBackAction = () => {
    history.replaceState(null, "/", "/");
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
    contactVisible && setTitle("Contact");
  });

  useEffect(() => {
    scrollTarget == "clients" &&
      clientScrollRef.current?.scrollIntoView({ behavior: "smooth" });
    scrollTarget == "jobs" &&
      jobsScrollRef.current?.scrollIntoView({ behavior: "smooth" });
    scrollTarget == "contact" &&
      contactScrollRef.current?.scrollIntoView({ behavior: "smooth" });
    scrollTarget == "" &&
      aboutScrollRef.current?.scrollIntoView({ behavior: "smooth" });
    !showAbout && setTimeout(resetScroll, 500);
  }, [showAbout, scrollTarget]);

  useEffect(() => {
    showAbout && routerAboutAction();
    !showAbout && routerBackAction();
  }, [showAbout]);

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
          <p className={styles.captions} ref={clientScrollRef}>
            {lang == "en" ? "Clients" : "Kunden"}
          </p>
          {clients.map((client, i) => (
            <h1 key={i}>{client.client}</h1>
          ))}
        </div>

        {jobs.length ? (
          <div className={styles.jobsWrapper} ref={jobsRef}>
            <p className={styles.captions} ref={jobsScrollRef}>
              Jobs
            </p>
            {jobs.map((job, i) => (
              <h1 onClick={() => handleClick(i)} key={i}>
                {lang == "en" ? job.jobTitleEn : job.jobTitleDe}
              </h1>
            ))}
          </div>
        ) : (
          ""
        )}

        <div className={styles.contactWrapper} ref={contactRef}>
          <p className={styles.captions} ref={contactScrollRef}>
            {lang == "en" ? "Contact" : "Kontakt"}
          </p>
          <h1>
            Dorotheenstraße 14
            <br />
            10117 Berlin
            <br />
            <br />
            (+49) 30 308 77 44 – 200
            <br />
            <a href="mailto:office@knueppel-scheffler.com">
              office@knueppel-scheffler.com
            </a>
            <br />
            <br />
            <a
              href={"https://www.instagram.com/knueppelscheffler_/"}
              target="blank"
              rel="_noreferrer"
            >
              Instagram
            </a>
            <br />
            <a
              href={"https://www.linkedin.com/in/eike-knueppel-a9263979/"}
              target="blank"
              rel="_noreferrer"
            >
              LinkedIn
            </a>
          </h1>
        </div>
      </div>
    </>
  );
};

export default InfoSection;
