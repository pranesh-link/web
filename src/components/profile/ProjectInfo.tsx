import React from "react";
import styled from "styled-components";
import { FlexBox, FlexBoxSection } from "../../common/Elements";
import { IProjectExperience } from "../../store/profile/types";
import classNames from "classnames";
import {
  EXPANDABLE_INFOS,
  LABEL_TEXT,
  SHORT_INFOS,
} from "../../common/constants";
import { ProfileContext } from "../../store/profile/context";

interface IProjectInfoProps {
  project: IProjectExperience;
}
export const ProjectInfo = (props: IProjectInfoProps) => {
  const {
    project,
    project: { title },
  } = props;
  const { isExport, isMobile } = React.useContext(ProfileContext);

  return (
    <SectionWrapper direction="column" className="keep-together">
      <ProjectName>
        <span>{title}</span>
      </ProjectName>
      <FlexBoxSection
        direction="column"
        className={classNames("project-info", { export: isExport })}
      >
        {isMobile ? (
          <FlexBoxSection direction="column" className="project-short-info">
            {SHORT_INFOS.map((key, index) => (
              <FlexBox
                className={classNames("info-wrapper", { export: isExport })}
                key={index}
              >
                <label
                  className={classNames("info-label", { export: isExport })}
                >
                  {LABEL_TEXT[key]}
                </label>
                <div className="info">{project[key]}</div>
              </FlexBox>
            ))}
          </FlexBoxSection>
        ) : (
          <FlexBox
            className={classNames("info-wrapper", "project-short-info", {
              export: isExport,
            })}
          >
            <FlexBoxSection direction="column">
              {SHORT_INFOS.map((key, index) => (
                <label
                  key={index}
                  className={classNames("info-label", { export: isExport })}
                >
                  {LABEL_TEXT[key]}
                </label>
              ))}
            </FlexBoxSection>
            <FlexBoxSection direction="column" className="short-info">
              {SHORT_INFOS.map((key, index) => (
                <div key={index} className="info">
                  {project[key]}
                </div>
              ))}
            </FlexBoxSection>
          </FlexBox>
        )}
        {EXPANDABLE_INFOS.map((key, index) => {
          return (
            <FlexBox direction="column" className="info-wrapper" key={index}>
              <label className="info-label">
                <span>{LABEL_TEXT[key]}</span>
              </label>
              <div
                className={classNames("info", key, { export: isExport })}
                dangerouslySetInnerHTML={{ __html: project[key] }}
              />
            </FlexBox>
          );
        })}
      </FlexBoxSection>
    </SectionWrapper>
  );
};

const SectionWrapper = styled(FlexBoxSection)`
  margin-bottom: 20px;
  padding: 20px 20px 0;
  .project-info {
    margin-left: 10px;
    &.export {
      margin-left: 0;
    }
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
    &.export {
      flex-basis: 35%;
    }
    .show-hide {
      background-color: #3f9c35;
      border: none;
      color: #f0f0f0;
      cursor: pointer;
      outline: none;
      border-radius: 15px;
      padding: 1px 10px;
      margin-left: 10px;
      &.hide {
        background-color: #e02020;
      }
      &:hover {
        background-color: #0c77b9;
      }
    }
  }
  .info-wrapper {
    line-height: 2;
    @media screen and (max-width: 767px) {
      &:not(.export) {
        flex-direction: column;
      }
    }
  }
  .description,
  .responsibilities {
    margin-left: 20px;
    &.export {
      margin-left: 0;
    }
    @media screen and (max-width: 767px) {
      margin-left: 0px;
    }
  }
`;
const ProjectName = styled.header`
  font-weight: bold;
  font-size: 20px;
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
