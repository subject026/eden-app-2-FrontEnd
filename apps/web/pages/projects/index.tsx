import { useQuery } from "@apollo/client";
import { FIND_PROJECTS, FIND_PROJECTS_RECOMMENDED } from "@graphql/eden";
// import { Members } from "@graphql/eden/generated";
import type { NextPage } from "next";
import { useContext } from "react";
import {
  GridItemSix,
  GridItemThree,
  GridLayout,
  ProjectsContainer,
  RecommendedList,
  UserProfileMenu,
} from "ui";

import { UserContext } from "../../context";

const ProjectsPage: NextPage = () => {
  const { currentUser } = useContext(UserContext);

  // if (currentUser) console.log("currentUser", currentUser);
  const { data: dataProjectsAll } = useQuery(FIND_PROJECTS, {
    variables: {
      fields: {},
    },
    context: { serviceName: "soilservice" },
  });

  // if (dataProjectsAll) console.log("dataProjectsAll", dataProjectsAll);

  const { data: dataProjectsRecommended } = useQuery(
    FIND_PROJECTS_RECOMMENDED,
    {
      variables: {
        fields: {
          memberID: currentUser?._id,
        },
      },
      skip: !currentUser,
      context: { serviceName: "soilservice" },
    }
  );

  // if (dataProjectsRecommended)
  //   console.log("dataProjectsRecommended", dataProjectsRecommended);

  // TODO: need query to get user favourite projects

  return (
    <GridLayout>
      <GridItemThree>
        <UserProfileMenu currentUser={currentUser} title={`Good Morning,`} />
      </GridItemThree>
      <GridItemSix>
        <ProjectsContainer
          allProjects={dataProjectsAll?.findProjects}
          recommendedProjects={
            dataProjectsRecommended?.findProjects_RecommendedToUser
          }
        />
      </GridItemSix>
      <GridItemThree>
        <RecommendedList
          projects={dataProjectsRecommended?.findProjects_RecommendedToUser}
        />
      </GridItemThree>
    </GridLayout>
  );
};

export default ProjectsPage;
