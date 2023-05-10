import classNames from "classnames";
import styled from "styled-components";
import { SecHeader, FlexBoxSection } from "../../../common/Elements";
import React, { memo, useContext } from "react";
import { AppContext } from "../../../store/profile/context";
import { valueIsArray, valueIsOrgInfo } from "../../../common/Utils";
import { IProjectExperience } from "../../../store/profile/types";
import { EXPERIENCE_TYPES, LABELS } from "../../../common/constants";

interface INames {
  projectNames: string[];
  clientNames: string[];
}

export const ResumeExperiences = memo(() => {
  const {
    data: {
      sections: { organizations: experiences },
    },
  } = useContext(AppContext);

  const getExperienceInfo = (
    projects: IProjectExperience[],
    type: string,
    from: string,
    to?: string
  ) => {
    const names = projects.reduce(
      (curr: INames, next: IProjectExperience) => ({
        projectNames: [...curr.projectNames, next.title],
        clientNames: [...curr.clientNames, next.client],
      }),
      { projectNames: [], clientNames: [] }
    );
    const projectNames = names.projectNames.join(", ");
    const clientNames = [...new Set(names.clientNames)].join(", ");
    const duration =
      type === EXPERIENCE_TYPES.CURRENT
        ? `${from} - present`
        : `${from} - ${to}`;

    return {
      projectNames,
      clientNames,
      duration,
      totalClients: [...new Set(names.clientNames)].length,
    };
  };
  return valueIsArray(experiences.info) && valueIsOrgInfo(experiences.info) ? (
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
        {experiences.info.map((experience, index) => {
          const {
            name,
            from,
            to,
            type,
            designation,
            responsibilities,
            projects,
          } = experience;

          const { projectNames, clientNames, duration, totalClients } =
            getExperienceInfo(projects, type, from, to);
          return (
            <section key={index} className="organization">
              <h3
                className={classNames("org-name", type.toLowerCase(), {
                  "page-break": false,
                })}
              >
                <span>{designation}</span>
                <span>&nbsp;@ {name}</span>
                <span className="duration">, {duration}</span>
              </h3>
              <h4 className="projects-label">
                <label>{`${LABELS.PROJECTS}:`}</label>
                <span>{projectNames}</span>
              </h4>
              <h4 className="clients-label">
                <label>
                  {`${totalClients === 1 ? LABELS.CLIENT : LABELS.CLIENTS}:`}
                </label>
                <span>{clientNames}</span>
              </h4>
              <h4 className="responsibilities">
                <label>{`${LABELS.RESPONSIBILITIES}:`} </label>
                <div
                  className="responsibilities"
                  dangerouslySetInnerHTML={{
                    __html: responsibilities,
                  }}
                />
              </h4>
            </section>
          );
        })}
      </SectionWrapper>
    </section>
  ) : null;
});

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
    &.current {
      color: #3f9c35;
    }
    &.previous {
      color: #8a8982;
    }
  }
  .duration {
    font-size: 13px;
    text-transform: uppercase;
    font-weight: bold;
  }
  .projects-label,
  .clients-label {
    span {
      margin-left: 5px;
    }
  }
  .projects-label,
  .clients-label,
  .responsibilities {
    display: flex;
    margin-block-start: 10px;
    margin-block-end: 0;
    label {
      text-transform: uppercase;
      margin-right: 10px;
    }
    span {
      font-weight: 600;
    }
    div {
      font-weight: normal;
    }
  }
  .responsibilities {
    flex-direction: column;
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
