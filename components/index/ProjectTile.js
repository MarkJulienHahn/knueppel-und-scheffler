import styles from "../../styles/Projects.module.css";

import Image from "next/image";

const ProjectTile = ({ setProjIndex, i, setShowProject, project }) => {
  const handleClick = () => {
    setProjIndex(i), setShowProject(true);
  };

  console.log(project)

  return (
    <div className={styles.tile} onClick={handleClick}>
      <div className={styles.image}>
        <Image
          fill
          src={project.image.url}
          style={{ objectFit: "cover" }}
          placeholder={"blur"}
          blurDataURL={project.image.metadata.lqip}
        />
      </div>
      {project.name}
    </div>
  );
};

export default ProjectTile;
