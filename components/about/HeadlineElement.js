import { useState, useEffect, useRef } from "react";

import styles from "../../styles/About.module.css";
const HeadlineElement = ({ lang, lable, setTitle }) => {
  const [pos, setPos] = useState(null);
  const ref = useRef();

  useEffect(() => {
    setPos(ref.current?.getBoundingClientRect());
  }, [pos]);

  useEffect(() => {
    pos?.y <= 200 && pos.y >= 0 && setTitle(lang == "en" ? lable[0] : lable[1]);
  }, [pos]);

  // console.log(pos.y)

  return (
    <p className={styles.captions} ref={ref}>
      {lang == "en" ? lable[0] : lable[1]}
    </p>
  );
};

export default HeadlineElement;
