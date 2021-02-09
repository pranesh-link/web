import classNames from "classnames";
import React, { useState } from "react";
import styled from "styled-components";
import { FlexBoxSection, SecHeader } from "../../common/Elements";
import { ISectionInfo } from "../../store/types";
import { ProjectInfo } from "../ProjectInfo";
import { valueIsArray, valueIsOrgProjectInfo } from "../Utils";

interface IExperiencesProps {
  experiences: ISectionInfo;
  refObj: React.MutableRefObject<any>;
  isExport?: boolean;
}
export const Experiences = (props: IExperiencesProps) => {
  const {
    experiences,
    experiences: { info: experience },
    refObj,
    isExport,
  } = props;

  const [isExpanded, setIsExpanded] = useState<{ [key: string]: boolean }>({});

  return valueIsArray(experience) && valueIsOrgProjectInfo(experience) ? (
    <section
      className={classNames("profile-section", "experience", {
        export: isExport,
      })}
      id="experience"
      ref={isExport ? null : refObj}
    >
      <SecHeader className={classNames({ export: isExport })}>
        {experiences.title}
      </SecHeader>
      <SectionWrapper
        direction="column"
        justifyContent="space-around"
        className={classNames({ export: isExport })}
      >
        {experience.map((experience, index) => (
          <section key={index}>
            <h3 className="org-name">{experience.organization}</h3>
            <section className="org-projects">
              {experience.projects.map((project, index) => (
                <ProjectInfo
                  key={index}
                  index={index}
                  project={project}
                  isExpanded={isExpanded}
                  setExpanded={(expandSection, expanded) =>
                    setIsExpanded({
                      ...isExpanded,
                      [`${expandSection}-${index}`]: expanded,
                    })
                  }
                />
              ))}
            </section>
          </section>
        ))}
      </SectionWrapper>
    </section>
  ) : null;
};

const SectionWrapper = styled(FlexBoxSection)`
  padding-left: 20px;
  padding-right: 15%;
  margin-left: 25%;
  &.export {
    margin-left: 0;
    padding-left: 0px;
  }
  .org-name {
    font-size: 22px;
  }
  .org-projects {
    padding-left: 10px;
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
