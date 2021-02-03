import React from "react";
import styled from "styled-components";
import { FlexBox, FlexBoxSection } from "../common/Elements";
import { IProject } from "../store/types";
import classNames from "classnames";
import { EXPANDABLE_INFOS, LABEL_TEXT, SHORT_INFOS } from "./Constants";

interface IProjectInfoProps {
  index: number;
  project: IProject;
  isExpanded: { [key: string]: boolean };
  setExpanded: (expandSection: string, isExpanded: boolean) => void;
}
export const ProjectInfo = (props: IProjectInfoProps) => {
  const { title } = props.project;
  const { project } = props;

  return (
    <SectionWrapper direction="column">
      <ProjectName>
        <span>{title.info}</span>
      </ProjectName>
      <FlexBoxSection direction="column" className="project-info">
        <FlexBoxSection direction="column" className="project-short-info">
          {SHORT_INFOS.map((key, index) => (
            <FlexBox className="info-wrapper" key={index}>
              <label className="info-label">{LABEL_TEXT[key]}</label>
              <div className="info">{project[key].info}</div>
            </FlexBox>
            // <FlexBox className="info-wrapper">
            //   <label className="info-label">{duration.label}</label>
            //   <div className="info">{duration.info}</div>
            // </FlexBox>
            // <FlexBox className="info-wrapper">
            //   <label className="info-label">{softwareTech.label}</label>
            //   <div className="info">{softwareTech.info}</div>
            // </FlexBox>
          ))}
        </FlexBoxSection>

        {/* <FlexBox direction="column" className="info-wrapper">
          <label className="info-label">{description.label}</label>
          <div
            className="info description"
            dangerouslySetInnerHTML={{ __html: description.info }}
          />
        </FlexBox> */}
        {EXPANDABLE_INFOS.map((key, index) => {
          const isExpanded = props.isExpanded[`${key}-${props.index}`];
          return (
            <FlexBox direction="column" className="info-wrapper" key={index}>
              <label className="info-label">
                <span>{LABEL_TEXT[key]}</span>
                {project[key].requiresShowHide && (
                  <button
                    className={classNames("show-hide", {
                      hide: isExpanded,
                    })}
                    onClick={() => props.setExpanded(key, !isExpanded)}
                  >
                    {isExpanded ? "Hide" : "Show"}
                  </button>
                )}
              </label>
              {((project[key].requiresShowHide && isExpanded) ||
                !project[key].requiresShowHide) && (
                <div
                  className={`info ${key}`}
                  dangerouslySetInnerHTML={{ __html: project[key].info }}
                />
              )}
            </FlexBox>
          );
        })}
      </FlexBoxSection>
      {/* <ProjectName>
        <span>{title.info}</span>
      </ProjectName>
      <FlexBoxSection direction="column" className="project-info">
        <FlexBoxSection direction="column" className="project-short-info">
          <FlexBox className="info-wrapper">
            <label className="info-label">{client.label}</label>
            <div className="info">{client.info}</div>
          </FlexBox>
          <FlexBox className="info-wrapper">
            <label className="info-label">{duration.label}</label>
            <div className="info">{duration.info}</div>
          </FlexBox>
          <FlexBox className="info-wrapper">
            <label className="info-label">{softwareTech.label}</label>
            <div className="info">{softwareTech.info}</div>
          </FlexBox>
        </FlexBoxSection>

        <FlexBox direction="column" className="info-wrapper">
          <label className="info-label">{description.label}</label>
          <div
            className="info description"
            dangerouslySetInnerHTML={{ __html: description.info }}
          />
        </FlexBox>
        <FlexBox direction="column" className="info-wrapper">
          <label className="info-label">
            <span>{responsibilities.label}</span>
            <button
              className={classNames("show-hide", {
                hide: props.isExpanded,
              })}
              onClick={() =>
                props.setExpanded("responsibilities", !props.isExpanded)
              }
            >
              {props.isExpanded ? "Hide" : "Show"}
            </button>
          </label>
          {props.isExpanded && (
            <div
              className="info responsibilities"
              dangerouslySetInnerHTML={{ __html: responsibilities.info }}
            />
          )}
        </FlexBox>
      </FlexBoxSection> */}
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
    .show-hide {
      background-color: #3f9c35;
      border: none;
      color: #f0f0f0;
      cursor: pointer;
      outline: none;
      border-radius: 15px;
      padding: 1px 10px;
      margin-left: 10px;
      &:hover {
        background-color: #0c77b9;
      }
      &.hide {
        background-color: #e02020;
      }
    }
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
