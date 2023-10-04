import ProjectTile from "./ProjectTile";

import styles from "../../styles/Projects.module.css";

const Projects = ({ setProjIndex, setShowProject, projects }) => {
  return (
    <div className={styles.wrapper}>
      {projects.map((project, i) => (
        <ProjectTile
          setProjIndex={setProjIndex}
          setShowProject={setShowProject}
          key={project._id}
          i={i}
          project={project}
        />
      ))}
    </div>
  );
};

export default Projects;
