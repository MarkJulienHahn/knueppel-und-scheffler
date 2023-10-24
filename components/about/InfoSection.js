import { useState, useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
import { useRouter, usePathname } from "next/navigation";

import Image from "next/image";

import ImageElement from "./ImageElement";
import PortableText from "react-portable-text";
import HeadlineElement from "./HeadlineElement";

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
  const images = [about.aboutImage, about.clientsImage, about.jobsImage];

  const [showJobs, setShowJobs] = useState(false);
  const [jobIndex, setJobIndex] = useState(0);
  const [imageIndex, setImageIndex] = useState(0);

  const router = useRouter();
  const pathname = usePathname();

  const { ref: aboutRef, inView: aboutVisible } = useInView({
    threshold: 0,
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

  useEffect(() => {
    aboutVisible && setTitle("About");
  }, [aboutVisible]);

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
      <div ref={aboutScrollRef}>
        <ImageElement index={0} setImageIndex={setImageIndex} />
      </div>
      <div ref={aboutRef}></div>
      <div
        className={`${styles.wrapper} ${
          showJobs ? styles.active : styles.inActive
        }`}
        style={{ zIndex: "200" }}
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
            src={images[imageIndex]}
            style={{ objectFit: "cover" }}
            alt={"Studio view of the Knüppel & Scheffler Studio"}
          />
        </div>
        <div>
          <div className={styles.infoText}>
            <PortableText
              content={lang == "en" ? about.textEn : about.textDe}
            />
          </div>

          <div className={styles.clientsWrapper} ref={clientScrollRef}>
            <HeadlineElement
              lang={lang}
              lable={["Clients", "Kunden"]}
              setTitle={setTitle}
            />
            <ImageElement index={1} setImageIndex={setImageIndex} />
            {clients.map((client, i) => (
              <h1 key={i}>{client.client}</h1>
            ))}
          </div>

          {jobs.length ? (
            <div className={styles.jobsWrapper} ref={jobsScrollRef}>
              <HeadlineElement
                lang={lang}
                lable={["Jobs", "Jobs"]}
                setTitle={setTitle}
              />
              <ImageElement index={2} setImageIndex={setImageIndex} />
              {jobs.map((job, i) => (
                <h1 onClick={() => handleClick(i)} key={i}>
                  {lang == "en" ? job.jobTitleEn : job.jobTitleDe}
                </h1>
              ))}
            </div>
          ) : (
            ""
          )}
          <div className={styles.contactWrapper} ref={contactScrollRef}>
            <HeadlineElement
              lang={lang}
              lable={["Contact", "Kontakt"]}
              setTitle={setTitle}
            />
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
      </div>
    </>
  );
};

export default InfoSection;
