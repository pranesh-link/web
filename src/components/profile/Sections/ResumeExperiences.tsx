import classNames from "classnames";
import styled from "styled-components";
import { SecHeader, FlexBoxSection, FlexBox } from "../../../common/Elements";
import { ProjectInfo } from "../ProjectInfo";
import { renderToStaticMarkup } from "react-dom/server";
import React, { useContext, createElement } from "react";
import { AppContext } from "../../../store/profile/context";
import { valueIsArray, valueIsResumeOrgInfo } from "../../../common/Utils";
import { ReactComponent as RightArrow } from "../../../assets/right-arrow.svg";

const reactSvgComponentToMarkupString = (Component: React.FunctionComponent) =>
  `data:image/svg+xml,${encodeURIComponent(
    renderToStaticMarkup(createElement(Component))
  )}`;

export const ResumeExperiences = () => {
  const {
    data: {
      sections: { resumeExperiences: experiences },
    },
  } = useContext(AppContext);
  return valueIsArray(experiences.info) &&
    valueIsResumeOrgInfo(experiences.info) ? (
    <section
      className={classNames("profile-section", "experience", {
        export: true,
      })}
    >
      <SecHeader className={classNames("page-break", { export: true })}>
        {experiences.title}
      </SecHeader>
      <SectionWrapper
        direction="column"
        justifyContent="space-around"
        className="export"
        icon={experiences.icon || ""}
      >
        {experiences.info.map((experience, index) => (
          <section key={index} className="organization">
            <h3 className={classNames("org-name", { "page-break": false })}>
              {experience.organization}
              <span className="duration">, {experience.duration}</span>
            </h3>

            <h3 className="designation">{experience.designation}</h3>
            <div
              className="responsibilities"
              dangerouslySetInnerHTML={{ __html: experience.responsibilities }}
            />
          </section>
        ))}
      </SectionWrapper>
    </section>
  ) : null;
};

const SectionWrapper = styled(FlexBoxSection)<{ icon: string }>`
  padding-left: 20px;
  padding-right: 15%;
  margin-left: 25%;
  &.export {
    margin-left: 0;
    padding-left: 0px;
  }
  .org-name {
    font-size: 22px;
    margin-block: 5px;
  }
  .duration {
    font-size: 13px;
    text-transform: uppercase;
    font-weight: bold;
  }
  .designation {
    font-size: 18px;
    margin-block: 5px;
  }
  .projects-label {
    text-transform: uppercase;
    font-weight: 600;
    flex-basis: 10%;
  }
  .org-projects {
    padding-left: 10px;
  }
  .responsibilities {
    ul {
      padding-inline-start: 5px;
      list-style-type: none;
      margin-block: 5px;
      li {
        display: flex;
        padding-bottom: 7px;
        align-items: center;
        &::before {
          content: ">";
          font-size: 20px;
          font-weight: bold;
          margin-right: 10px;
        }
      }
    }
  }
  @media screen and (max-width: 767px) {
    padding: 0;
    margin-left: 0;
    ul {
      margin: 0;
      padding-left: 25px;
    }
    .org-name {
      font-size: 20px;
    }
  }
`;
