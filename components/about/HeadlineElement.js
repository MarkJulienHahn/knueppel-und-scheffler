import { useState, useEffect, useRef } from "react";

import styles from "../../styles/About.module.css";
const HeadlineElement = ({ lang, lable, setTitle, scrolling }) => {
  const [pos, setPos] = useState(null);

  const ref = useRef();

  // useEffect(() => {
  //   setPos(ref.current?.getBoundingClientRect());
  // }, [scrolling]);

  // useEffect(() => {
  //   pos?.y <= 600 && pos.y >= 0 && setTitle(lang == "en" ? lable[0] : lable[1]);
  // }, [pos]);

  return (
    <p className={styles.captions} ref={ref}>
      {lang == "en" ? lable[0] : lable[1]}
    </p>
  );
};

export default HeadlineElement;
