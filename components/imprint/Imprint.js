import styles from "../../styles/Imprint.module.css";
import PortableText from "react-portable-text";

import Headline from "../about/Headline";

const Imprint = ({ imprint, showImprint, setShowImprint, lang, setLang }) => {
  console.log(imprint);
  return (
    <div
      className={`${styles.wrapper} ${
        showImprint ? styles.active : styles.inActive
      }`}
    >
      <div className={styles.inner}>
        {showImprint && (
          <Headline title={""} close={() => setShowImprint(false)} />
        )}
        <div className={styles.textWrapper}>
          <PortableText
            content={lang == "en" ? imprint.textEn : imprint.textDe}
          />
        </div>
      </div>
    </div>
  );
};

export default Imprint;