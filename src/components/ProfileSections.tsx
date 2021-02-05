import React from "react";
import styled from "styled-components";
import { FlexBox, SectionsWrapper } from "../common/Elements";
import { AppContext } from "../context";
import { Experiences } from "./Sections/Experiences";
import { Skills } from "./Sections/Skills";
import { About } from "./Sections/About";
import { Education } from "./Sections/Education";
import { Contact } from "./Sections/Contact";
import classNames from "classnames";

interface IProfileSectionsProps {
  exportProfile?: () => void;
}
const ProfileSections = (props: IProfileSectionsProps) => {
  const {
    isExport,
    isDownloading,
    data: { sections, header },
    refs: { homeRef, skillsRef, experienceRef, educationRef, contactRef },
  } = React.useContext(AppContext);
  const { aboutMe, details, skills, education, experience, links } = sections;
  const { shortDesc, name } = header;

  return (
    <Wrapper>
      <ShortDesc>{shortDesc}</ShortDesc>
      <PageHeader>
        <hr className={classNames("header-sep", { export: isExport })} />
        <span>{name}</span>
        <hr className={classNames("header-sep", { export: isExport })} />
      </PageHeader>
      <FlexBox direction="column" alignItems="center">
        <Separator className={classNames({ export: isExport })} />
      </FlexBox>
      <SectionsWrapper className={classNames({ export: isExport })}>
        <About
          isDownloading={isDownloading}
          isExport={isExport}
          aboutMe={aboutMe}
          details={details}
          refObj={homeRef}
          exportProfile={() => {
            if (props.exportProfile) {
              props.exportProfile();
            }
          }}
        />
        <Education
          isExport={isExport}
          education={education}
          refObj={educationRef}
        />
        <Skills isExport={isExport} skills={skills} refObj={skillsRef} />
        <Experiences
          isExport={isExport}
          experiences={experience}
          refObj={experienceRef}
        />
        <Contact links={links} refObj={contactRef} />
      </SectionsWrapper>
    </Wrapper>
  );
};

export default ProfileSections;

const Wrapper = styled.section`
  .header-sep {
    min-width: 100px;
    opacity: 0.6;
    height: 0;
    border-top: 5px solid #22a39f;
    margin: 0 10px;
    &.export {
      display: none;
    }
    @media screen and (max-width: 767px) {
      display: none;
    }
  }
`;

const Separator = styled.hr`
  min-width: 50%;
  border-color: #727878;
  opacity: 0.2;
  height: 0;
  border-top: 1px solid #eee;
  &.export {
    display: none;
  }
  @media screen and (max-width: 767px) {
    display: none;
  }
`;

const ShortDesc = styled.h3`
  text-align: center;
  color: #727878;
  font-size: 21px;
  font-weight: bold;
  margin-bottom: 20px;
  line-height: 1.4;
  font-style: italic;
  @media screen and (max-width: 767px) {
    padding-top: 75px;
    margin: 0;
  }
`;
const PageHeader = styled.h2`
  font-size: 45px;
  font-weight: 500;
  color: #22a39f;
  text-align: center;
  margin: 0;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  justify-content: center;
  @media screen and (max-width: 767px) {
    font-size: 36px;
  }
`;
