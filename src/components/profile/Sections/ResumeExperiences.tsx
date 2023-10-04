import classNames from "classnames";
import styled from "styled-components";
import {
  SecHeader,
  FlexBoxSection,
  ActionBtn,
  FlexBox,
  ModalBanner,
  ModalContentWrap,
} from "../../../common/Elements";
import React, { memo, useContext, useEffect, useMemo, useState } from "react";
import { ProfileContext } from "../../../store/profile/context";
import { valueIsArray, valueIsExperienceInfo } from "../../../common/Utils";
import { IProjectExperience } from "../../../store/profile/types";
import {
  EXPERIENCE_TYPES,
  LABELS,
  LABEL_TEXT,
  SECTIONS,
} from "../../../common/constants";
import { ProjectInfo } from "../ProjectInfo";
import { ModalComponent } from "../../../common/Component";

interface INames {
  projectNames: string[];
  clientNames: string[];
}

export const ResumeExperiences = memo(() => {
  const {
    data: {
      sections: { experiences },
    },
    isExport,
    isMobile,
    refs: { experienceRef },
  } = useContext(ProfileContext);
  const [project, setProject] = useState<IProjectExperience | null>(null);

  const getExperienceInfo = (
    projects: IProjectExperience[],
    type: string,
    from: string,
    to?: string,
  ) => {
    const names = projects.reduce(
      (curr: INames, next: IProjectExperience) => ({
        projectNames: [...curr.projectNames, next.title],
        clientNames: [...curr.clientNames, next.client],
      }),
      { projectNames: [], clientNames: [] },
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

  useEffect(() => {
    if (project) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
  }, [project]);

  const textSeparator = useMemo(
    () => <>{isMobile ? <br /> : <span>,&nbsp;</span>}</>,
    [isMobile],
  );

  return (
    <>
      {!isExport && project && (
        <ModalComponent
          isOpen={!!project}
          shouldCloseOnOverlayClick
          className="modal-wrap"
          ariaHideApp={false}
        >
          <ModalContentWrap direction="column">
            <ModalBanner className="header" />
            <ProjectInfo project={project} />
            <ActionBtn className="close" onClick={() => setProject(null)}>
              {LABEL_TEXT.close}
            </ActionBtn>
            <ModalBanner className="footer" />
          </ModalContentWrap>
        </ModalComponent>
      )}
      {valueIsArray(experiences.info) &&
      valueIsExperienceInfo(experiences.info) ? (
        <section
          className={classNames("profile-section", "experience", {
            export: isExport,
          })}
          id={isExport ? "" : SECTIONS.EXPERIENCE}
          ref={isExport ? null : experienceRef}
        >
          <SecHeader
            className={classNames("page-break", { export: isExport })}
            onClick={() =>
              setProject(
                valueIsExperienceInfo(experiences.info)
                  ? experiences.info[0].projects[0]
                  : null,
              )
            }
          >
            {experiences.title}
          </SecHeader>
          <SectionWrapper
            direction="column"
            justifyContent="space-around"
            className={classNames({ export: isExport })}
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

              const { duration } = getExperienceInfo(projects, type, from, to);
              return (
                <section key={index} className="organization">
                  <h3
                    className={classNames("org-name", type.toLowerCase(), {
                      "page-break": false,
                    })}
                  >
                    <span>{designation}</span>
                    {textSeparator}
                    <span>{name}</span>
                    {textSeparator}
                    <span className="duration">{duration}</span>
                  </h3>
                  <h4 className="projects-label">
                    <label>{LABELS.PROJECTS}</label>
                  </h4>
                  <FlexBox className="project-titles-wrap" flexWrap="wrap">
                    {projects.map((project, index) => (
                      <ProjectTitle
                        key={index}
                        onClick={() => setProject(project)}
                      >
                        {project.shortTitle}
                      </ProjectTitle>
                    ))}
                  </FlexBox>
                  <h4 className="responsibilities">
                    <label>{LABELS.RESPONSIBILITIES}</label>
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
      ) : null}
    </>
  );
});

const SectionWrapper = styled(FlexBoxSection)<{ icon: string }>`
  padding-left: 20px;
  padding-right: 15%;
  margin-left: 25%;
  .project-titles-wrap {
    max-width: 70%;
    margin-top: 15px;
  }
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
          content: "✓";
          color: #3fc935;
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

    .project-titles-wrap {
      max-width: unset;
    }
  }
`;

const ProjectTitle = styled(ActionBtn)`
  padding: 10px 15px;
  border-radius: 20px;
  background: #3498db;
  color: #f0f0f0;
  margin-bottom: 15px;
  margin-right: 20px;
  &:hover {
    background: #3f9c35;
  }
`;
