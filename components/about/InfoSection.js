import { useState, useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
import { useRouter, usePathname } from "next/navigation";

import Image from "next/image";

import ImageElement from "./ImageElement";
import PortableText from "react-portable-text";
import HeadlineElement from "./HeadlineElement";

import { urlFor } from "../../hooks/useImageUrlBuilder";

import Job from "./Job";

import styles from "../../styles/About.module.css";

const InfoSection = ({
  lang,
  about,
  clients,
  jobs,
  contact,
  setTitle,
  scrollTarget,
  showAbout,
  scrolling,
}) => {
  const images = [about.aboutImage, about.clientsImage, about.jobsImage];

  const [showJobs, setShowJobs] = useState(false);
  const [jobIndex, setJobIndex] = useState(0);
  const [imageIndex, setImageIndex] = useState(0);

  const { ref: aboutRef, inView: aboutVisible } = useInView({
    threshold: 0,
  });

  const { ref: clientRef, inView: clientVisible } = useInView({
    threshold: 0,
  });

  const { ref: jobsRef, inView: jobsVisible } = useInView({
    threshold: 0,
  });

  const { ref: contactRef, inView: contactVisible } = useInView({
    threshold: 1,
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
    aboutVisible && setTitle(lang == "en" ? "About" : "Über Uns");
  }, [aboutVisible]);

  useEffect(() => {
    aboutVisible &&
      (setTitle(lang == "en" ? "About" : "Über Uns"), setImageIndex(0));
    clientVisible &&
      (setTitle(lang == "en" ? "Clients" : "Kunden"), setImageIndex(1));

    jobsVisible && setTitle(lang == "en" ? "Jobs" : "Jobs");
    jobsVisible && setImageIndex(2);

    contactVisible &&
      !jobsVisible &&
      setTitle(lang == "en" ? "Contact" : "Kontakt");
    !aboutVisible &&
      !clientVisible &&
      !jobsVisible &&
      !contactVisible &&
      setImageIndex(3);
  }, [aboutVisible, clientVisible, jobsVisible, contactVisible]);

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
  }, [showAbout]);

  // useEffect(() => {
  //   showAbout && routerAboutAction();
  //   !showAbout && routerBackAction();
  // }, [showAbout]);

  useEffect(() => {
    setTitle(lang == "en" ? "About" : "Über Uns");
  }, [lang]);

  return (
    <div>
      <div ref={aboutScrollRef}>
        {/* <ImageElement
          aboutVisible={aboutVisible}
          clientVisible={clientVisible}
          jobsVisible={jobsVisible}
          contactVisible={contactVisible}
          index={0}
          setImageIndex={setImageIndex}
        /> */}
      </div>
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
        {showAbout && (
          <div className={styles.infoImage}>
            <div
              style={{
                position: "relative",
                width: "100%",
                height: "100%",
              }}
            >
              <div className={styles.imageCredit}>
                © {images[imageIndex]?.credit}
              </div>
              <Image
                fill
                src={urlFor(images[0].url.url).width(1000).url()}
                style={{
                  position: "absolute",
                  top: "0",
                  left: "0",
                  objectFit: "cover",
                  opacity: imageIndex == 0 ? "1" : "0",
                }}
                alt={images[0].alt ? images[0].alt : "Knueppel & Scheffler"}
              />
              <Image
                fill
                src={urlFor(images[1].url.url).width(1000).url()}
                style={{
                  position: "absolute",
                  top: "0",
                  left: "0",
                  objectFit: "cover",
                  opacity: imageIndex == 1 ? "1" : "0",
                }}
                alt={images[1].alt ? images[1].alt : "Knueppel & Scheffler"}
              />
              <Image
                fill
                src={urlFor(images[2].url.url).width(1000).url()}
                style={{
                  position: "absolute",
                  top: "0",
                  left: "0",
                  objectFit: "cover",
                  opacity: imageIndex == 2 ? "1" : "0",
                }}
                alt={images[2].alt ? images[2].alt : "Knueppel & Scheffler"}
              />
            </div>
          </div>
        )}
        <div>
          <div className={styles.infoText} ref={aboutRef}>
            <PortableText
              content={lang == "en" ? about.textEn : about.textDe}
            />
          </div>
          <div className={styles.clientsWrapper} ref={clientScrollRef}>
            <div ref={clientRef}>
              {/* <HeadlineElement
                scrolling={scrolling}
                lang={lang}
                lable={["Clients", "Kunden"]}
                setTitle={setTitle}
              />
              <ImageElement
                scrolling={scrolling}
                index={1}
                setImageIndex={setImageIndex}
              /> */}
              {clients.map((client, i) => (
                <h1 key={i}>{client.client}</h1>
              ))}
            </div>
          </div>

          <div ref={jobsRef}>
            {jobs.length ? (
              <div className={styles.jobsWrapper} ref={jobsScrollRef}>
                {/* <HeadlineElement
                  scrolling={scrolling}
                  lang={lang}
                  lable={["Jobs", "Jobs"]}
                  setTitle={setTitle}
                />
                <ImageElement
                  scrolling={scrolling}
                  index={2}
                  setImageIndex={setImageIndex}
                /> */}
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

          <div ref={contactRef}>
            <div className={styles.contactWrapper} ref={contactScrollRef}>
              {/* <HeadlineElement
                scrolling={scrolling}
                lang={lang}
                lable={["Contact", "Kontakt"]}
                setTitle={setTitle}
              /> */}

              <h1> {contact.street}</h1>
              <h1>
                {contact.zip} {contact.city}
              </h1>
              <br />
              <br />
              <h1>{contact.phone}</h1>
              <h1>
                <a href={`mailto:${contact.email}`}>{contact.email}</a>
              </h1>
              <br />
              <br />
              {contact.links.map((link, i) => (
                <div key={i}>
                  <h1>
                    <a href={link.link} target="blank" rel="_noreferrer">
                      {link.title}
                    </a>
                  </h1>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* <ImageElement
        scrolling={scrolling}
        index={null}
        setImageIndex={setImageIndex}
      /> */}
    </div>
  );
};

export default InfoSection;
