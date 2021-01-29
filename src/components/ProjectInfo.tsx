import React from "react";
import styled from "styled-components";
import { FlexBox, FlexBoxSection } from "../common/Elements";
import { IProject } from "../store/types";

interface IProjectInfoProps {
  project: IProject;
}
export const ProjectInfo = (props: IProjectInfoProps) => {
  const {
    title,
    client,
    duration,
    softwareTech,
    description,
    responsibilities,
  } = props.project;
  return (
    <SectionWrapper direction="column">
      <ProjectName>{title}</ProjectName>
      <FlexBoxSection direction="column" className="project-info">
        <FlexBox className="info-wrapper">
          <label className="info-label">Client</label>
          <div className="info">{client}</div>
        </FlexBox>
        <FlexBox className="info-wrapper">
          <label className="info-label">Duration</label>
          <div className="info">{duration}</div>
        </FlexBox>
        <FlexBox className="info-wrapper">
          <label className="info-label">Software/Technologies</label>
          <div className="info">{softwareTech}</div>
        </FlexBox>
        <FlexBox direction="column" className="info-wrapper">
          <label className="info-label">Description</label>
          <div
            className="info description"
            dangerouslySetInnerHTML={{ __html: description }}
          />
        </FlexBox>
        <FlexBox direction="column" className="info-wrapper">
          <label className="info-label">Responsibilities</label>
          <div
            className="info responsibilities"
            dangerouslySetInnerHTML={{ __html: responsibilities }}
          />
        </FlexBox>
      </FlexBoxSection>
    </SectionWrapper>
  );
};

const SectionWrapper = styled(FlexBoxSection)`
  margin-bottom: 20px;
  .project-info {
    margin-left: 10px;
  }
  .info-label {
    font-weight: bold;
    flex-basis: 20%;
    margin-right: 10px;
    text-transform: uppercase;
  }
  .info-wrapper {
    line-height: 2;
  }
  .description,
  .responsibilities {
    margin-left: 20px;
  }
`;
const ProjectName = styled.header`
  font-weight: bold;
  font-size: 18px;
  margin-bottom: 10px;
`;
