import React from "react";
import styled from "styled-components";
import { InfoType } from "../store/types";
import { ProjectInfo } from "./ProjectInfo";
import { valueIsArray, valueIsProjectInfo } from "./Utils";

interface IExperienceInfoProps {
  experience: InfoType;
}
export const ExperienceInfo = (props: IExperienceInfoProps) => {
  const { experience } = props;
  return valueIsArray(experience) && valueIsProjectInfo(experience) ? (
    <SectionWrapper>
      {experience.map((project, index) => (
        <ProjectInfo key={index} project={project} />
      ))}
    </SectionWrapper>
  ) : null;
};

const SectionWrapper = styled.section`
  padding-left: 20px;
  padding-right: 15%;
`;
