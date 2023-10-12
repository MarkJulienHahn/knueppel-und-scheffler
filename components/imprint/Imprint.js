import { useEffect } from "react";

import styles from "../../styles/Imprint.module.css";
import PortableText from "react-portable-text";

import Headline from "../about/Headline";

const Imprint = ({
  imprint,
  privacy,
  showPrivacy,
  setShowPrivacy,
  showImprint,
  setShowImprint,
  lang,
}) => {
  useEffect(() => {
    showImprint && history.replaceState(null, `/imprint`, `/imprint`);
    // !showImprint && history.replaceState(null, "/", "/");
  }, [showImprint]);

  useEffect(() => {
    showPrivacy && history.replaceState(null, `/privacy`, `/privacy`);
    // !showPrivacy && history.replaceState(null, "/", "/");
  }, [showPrivacy]);

  return (
    <div
      className={`${styles.wrapper} ${
        showImprint || showPrivacy ? styles.active : styles.inActive
      }`}
    >
      <div className={styles.inner}>
        {showImprint && (
          <>
            <Headline title={""} close={() => setShowImprint(false)} />
            <div className={styles.textWrapper}>
              <PortableText
                content={lang == "en" ? imprint.textEn : imprint.textDe}
              />
            </div>
          </>
        )}
        {showPrivacy && (
          <>
            <Headline title={""} close={() => setShowPrivacy(false)} />
            <div className={styles.textWrapper}>
              <PortableText
                content={lang == "en" ? privacy.textEn : privacy.textDe}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Imprint;
