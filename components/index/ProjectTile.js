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
  const handleClick = () => {
    setProjIndex(i), setShowProject(true);
  };

  return (
    <div className={styles.tile} onClick={handleClick}>
      <div className={styles.image}>
        <Image
          fill
          src={urlFor(project.image.url).format("webp").width(1000).quality(50).url()}
          style={{ objectFit: "cover" }}
          placeholder={"blur"}
          blurDataURL={project.image.metadata.lqip}
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
