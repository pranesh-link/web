import React from "react";
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
  return valueIsArray(experience) && valueIsProjectInfo(experience) ? (
    <SectionWrapper direction="column" justifyContent="space-around">
      {experience.map((project, index) => (
        <ProjectInfo key={index} project={project} />
      ))}
    </SectionWrapper>
  ) : null;
};

const SectionWrapper = styled(FlexBoxSection)`
  padding-left: 20px;
  padding-right: 15%;
  margin-left: 25%;
`;
