import styles from "../../styles/About.module.css";
import { VscChromeClose } from "react-icons/vsc";

const Headline = ({ title, close }) => {
  return (
    <div className={styles.headline}>
      <h1>{title}</h1>
      <h1 style={{ pointerEvents: "auto", cursor: "pointer" }} onClick={close}>
        <VscChromeClose />
      </h1>
    </div>
  );
};

export default Headline;
