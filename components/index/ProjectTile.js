import { useState, useEffect } from "react";
import styles from "../../styles/Projects.module.css";
import Image from "next/image";
import { urlFor } from "../../hooks/useImageUrlBuilder";

const ProjectTile = ({
  setProjIndex,
  i,
  setShowProject,
  project,
  setShowNav,
}) => {
  const [url, setUrl] = useState(null);
  const [srcSet, setSrcSet] = useState(null);
  const handleClick = () => {
    setProjIndex(i);
    setShowProject(true);
  };

  const crop = project.image.crop;
  const width = project.image.asset.metadata.dimensions.width;
  const height = project.image.asset.metadata.dimensions.height;

  const getUrl = (size) => {
    if (crop) {
      // compute the cropped image's area
      const croppedWidth = Math.floor(width * (1 - (crop.right + crop.left)));
      const croppedHeight = Math.floor(height * (1 - (crop.top + crop.bottom)));
      // compute the cropped image's position
      const left = Math.floor(width * crop.left);
      const top = Math.floor(height * crop.top);
      // gather into a url
      return urlFor(project.image.asset.url)
        .rect(left, top, croppedWidth, croppedHeight)
        .width(size)
        .quality(50)
        .url();
    } else
      return urlFor(project.image.asset.url)
        .width(size)
        .quality(50)
        .url();
  };

  useEffect(() => {
    const url = getUrl(1000);
    setUrl(url);
    const srcSet = `
      ${getUrl(320)} 320w,
      ${getUrl(480)} 480w,
      ${getUrl(800)} 800w,
      ${getUrl(1000)} 1000w,
      ${getUrl(1600)} 1600w
    `;
    setSrcSet(srcSet);
  }, []);

  return (
    url && (
      <div className={styles.tile} onClick={handleClick}>
        <div className={styles.image}>
          <Image
            fill
            src={url}
            srcSet={srcSet}
            sizes="(max-width: 320px) 280px, (max-width: 480px) 440px, (max-width: 800px) 760px, 1000px"
            style={{ objectFit: "cover" }}
            placeholder={"blur"}
            blurDataURL={project.image.asset.metadata.lqip}
            alt={
              project.image.alt
                ? project.image.alt
                : "A preview image of a project by Knüppel & Scheffler"
            }
          />
        </div>
        {project.name}
      </div>
    )
  );
};

export default ProjectTile;
