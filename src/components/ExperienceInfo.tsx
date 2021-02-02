import React, { useState } from "react";
import styled from "styled-components";
import { FlexBoxSection } from "../common/Elements";
import { InfoType } from "../store/types";
import { ProjectInfo } from "./ProjectInfo";
import { valueIsArray, valueIsProjectInfo } from "./Utils";

interface IExperienceInfoProps {
  experience: InfoType;
}
export const ExperienceInfo = (props: IExperienceInfoProps) => {
  const { experience } = props;

  const [isExpanded, setIsExpanded] = useState<{ [key: string]: boolean }>({});

  return valueIsArray(experience) && valueIsProjectInfo(experience) ? (
    <SectionWrapper direction="column" justifyContent="space-around">
      {experience.map((project, index) => (
        <ProjectInfo
          key={index}
          project={project}
          isExpanded={isExpanded[project.title]}
          setExpanded={(isExpanded) =>
            setIsExpanded({ [project.title]: isExpanded })
          }
        />
      ))}
    </SectionWrapper>
  ) : null;
};

const SectionWrapper = styled(FlexBoxSection)`
  padding-left: 20px;
  padding-right: 15%;
  margin-left: 25%;
  @media screen and (max-width: 767px) {
    padding: 0;
    margin-left: 0;
    ul {
      margin: 0;
      padding-left: 25px;
    }
  }
`;
