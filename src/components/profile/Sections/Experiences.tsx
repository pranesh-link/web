import classNames from "classnames";
import React, { useContext } from "react";
import styled from "styled-components";
import { FlexBoxSection, SecHeader } from "../../../common/Elements";
import { valueIsArray, valueIsOrgProjectInfo } from "../../../common/Utils";
import { AppContext } from "../../../store/profile/context";

export const Experiences = () => {
  const {
    data: {
      sections: { experience: experiences },
    },
    refs: { experienceRef: refObj },
    isExport,
  } = useContext(AppContext);
  const { info: experience } = experiences;

  return valueIsArray(experience) && valueIsOrgProjectInfo(experience) ? (
    <section
      className={classNames("profile-section", "experience", {
        export: isExport,
      })}
      id={isExport ? "" : "experience"}
      ref={isExport ? null : refObj}
    >
      <SecHeader className={classNames("page-break", { export: isExport })}>
        {experiences.title}
      </SecHeader>
      <SectionWrapper
        direction="column"
        justifyContent="space-around"
        className={classNames({ export: isExport })}
      >
        {experience.map((experience, index) => (
          <section key={index} className="organization">
            <h3 className={classNames("org-name", { "page-break": index > 0 })}>
              {experience.organization}
            </h3>
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
