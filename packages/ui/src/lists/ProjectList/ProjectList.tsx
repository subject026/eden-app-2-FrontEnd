import { Maybe, Project, ProjectMemberType } from "@graphql/eden/generated";
import { ProjectCard } from "ui";

export interface ProjectListProps {
  projects?: Project[] | Maybe<ProjectMemberType>[];
  favButton?: boolean;
  updateFavoriteCallback?: () => void;
}

export const ProjectList = ({
  projects,
  favButton = false,
  updateFavoriteCallback,
}: ProjectListProps) => {
  const projectType = (project: any) => {
    if (project.__typename === "Project") {
      return project;
    } else if (project.__typename === "projectMemberType") {
      return project.info;
    } else {
      return project?.projectData;
    }
  };

  return (
    <div>
      {projects &&
        projects.map((project: any, index: number) => (
          <div key={index} className="my-4">
            <ProjectCard
              project={projectType(project)}
              avatar={project?.avatar || ""}
              percentage={
                project.__typename === "projectMatchType"
                  ? project.matchPercentage
                  : null
              }
              position={project?.position || ""}
              favButton={favButton}
              favorite={project.favorite}
              updateFavoriteCallback={updateFavoriteCallback}
            />
          </div>
        ))}
    </div>
  );
};
