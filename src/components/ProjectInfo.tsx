import React from "react";
import styled from "styled-components";
import { FlexBox, FlexBoxSection } from "../common/Elements";
import { IProject } from "../store/types";
import classNames from "classnames";

interface IProjectInfoProps {
  project: IProject;
  isExpanded: boolean;
  setExpanded: (isExpanded: boolean) => void;
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
      <ProjectName
        className={classNames({ expanded: props.isExpanded })}
        onClick={() => props.setExpanded(!props.isExpanded)}
      >
        <span>{title}</span>
      </ProjectName>
      <FlexBoxSection direction="column" className="project-info">
        <FlexBoxSection direction="column" className="project-short-info">
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
        </FlexBoxSection>

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
    @media screen and (max-width: 767px) {
      margin-left: 0px;
    }
  }
  .info-label {
    font-weight: bold;
    flex-basis: 25%;
    margin-right: 10px;
    text-transform: uppercase;
    color: #3e3e3e;
  }
  .info-wrapper {
    line-height: 2;
    @media screen and (max-width: 767px) {
      flex-direction: column;
    }
  }
  .description,
  .responsibilities {
    margin-left: 20px;
    @media screen and (max-width: 767px) {
      margin-left: 0px;
    }
  }
`;
const ProjectName = styled.header`
  font-weight: bold;
  font-size: 24px;
  margin-bottom: 10px;
  color: #3e3e3e;
  display: flex;
  align-items: center;
  cursor: pointer;
  img {
    margin-right: 5px;
    width: 15px;
    height: 15px;
  }
  &.expanded {
    color: #22a39f;
    img {
      filter: invert(55%) sepia(64%) saturate(466%) hue-rotate(129deg)
        brightness(84%) contrast(94%);
    }
  }
  @media screen and (max-width: 767px) {
    font-size: 18px;
  }
`;
