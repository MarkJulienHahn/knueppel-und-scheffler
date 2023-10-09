import styles from "../../styles/Job.module.css";
import PortableText from "react-portable-text";
import Headline from "./Headline";

const Job = ({ lang, jobs, jobIndex, showJobs, setShowJobs }) => {
  const job = jobs[jobIndex];
  return (
    <>
      {showJobs && <Headline close={() => setShowJobs(false)} />}
      <div className={styles.wrapper}>
        <p>Open Positions</p>
        <h1 className={styles.header}>{lang == "en" ? job.jobTitleEn : job.jobTitleDe}</h1>
        <div className={styles.text}>
          <PortableText content={lang == "en" ? job.textEn : job.textDe} />
        </div>

        <h1 className={styles.link}>
          <a href="mailto:office@knueppel-scheffler.com">Apply Now</a>
        </h1>
      </div>
    </>
  );
};

export default Job;
