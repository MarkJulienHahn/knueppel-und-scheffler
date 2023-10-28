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
  const handleClick = () => {
    setProjIndex(i), setShowProject(true);
  };

  const crop = project.image.crop;
  const width = project.image.asset.metadata.dimensions.width;
  const height = project.image.asset.metadata.dimensions.height;

  const getUrl = () => {
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
        .url();
    } else return urlFor(project.image.asset.url).width(1000).quality(50).url();
  };

  useEffect(() => {
    setUrl(getUrl());
  }, []);

  return (
    url && <div className={styles.tile} onClick={handleClick}>
      <div className={styles.image}>
        <Image
          fill
          src={url}
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
  );
};

export default ProjectTile;
