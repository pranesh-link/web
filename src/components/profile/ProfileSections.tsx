import React, { useMemo } from "react";
import styled from "styled-components";
import { FlexBox, SectionsWrapper } from "../../common/Elements";
import { AppContext } from "../../store/profile/context";
import { Skills } from "./Sections/Skills";
import { About } from "./Sections/About";
import { Education } from "./Sections/Education";
import { Contact } from "./Sections/Contact";
import classNames from "classnames";
import { ResumeExperiences } from "./Sections/ResumeExperiences";
import { SECTION_ORDER_DISPLAY } from "../../common/constants";

interface IProfileSectionsProps {
  exportProfile?: () => void;
}

interface ISectionComponents {
  order: number;
  name: string;
  component: JSX.Element;
  display?: boolean;
}
const ProfileSections = (props: IProfileSectionsProps) => {
  const {
    isExport = false,
    isMobile,
    isInstallBannerOpen,
    data: {
      header,
      sections: { aboutMe, links, details, education, experiences, skills },
    },
  } = React.useContext(AppContext);
  const { shortDesc, name } = header;
  const { ABOUTME, EDUCATION, SKILLS, EXPERIENCES, CONTACT } =
    SECTION_ORDER_DISPLAY;

  const AboutComp = useMemo(
    () => (
      <>
        {aboutMe && links && details && (
          <About
            exportProfile={() => {
              if (props.exportProfile) {
                props.exportProfile();
              }
            }}
          />
        )}
      </>
    ),
    [aboutMe, details, links, props]
  );

  const EducationComp = useMemo(
    () => <>{education && <Education />}</>,
    [education]
  );

  const SkillsComp = useMemo(() => <>{skills && <Skills />}</>, [skills]);

  const ExperiencesComp = useMemo(
    () => <>{experiences && <ResumeExperiences />}</>,
    [experiences]
  );

  const ContactComp = useMemo(
    () => <>{!isExport && links && <Contact />}</>,
    [isExport, links]
  );

  const sectionComponents: ISectionComponents[] = useMemo(
    () => [
      {
        order: ABOUTME.order,
        name: "about",
        component: AboutComp,
        display: ABOUTME.display,
      },
      {
        order: EDUCATION.order,
        name: "education",
        component: EducationComp,
        display: EDUCATION.display,
      },
      {
        order: SKILLS.order,
        name: "skills",
        component: SkillsComp,
        display: SKILLS.display,
      },
      {
        order: EXPERIENCES.order,
        name: "experiences",
        component: ExperiencesComp,
        display: EXPERIENCES.display,
      },
      {
        order: CONTACT.order,
        name: "contact",
        component: ContactComp,
        display: CONTACT.display,
      },
    ],
    [
      ABOUTME,
      AboutComp,
      CONTACT,
      ContactComp,
      EDUCATION,
      EXPERIENCES,
      EducationComp,
      ExperiencesComp,
      SKILLS,
      SkillsComp,
    ]
  );

  const reOrderedSectionComponents = useMemo(
    () => sectionComponents.sort((a, b) => a.order - b.order),
    [sectionComponents]
  );

  const HorizontalSep = useMemo(
    () => <hr className={classNames("header-sep", { export: isExport })} />,
    [isExport]
  );

  return (
    <Wrapper
      className={classNames({
        export: isExport,
        "add-margin-top": !isMobile && isInstallBannerOpen,
        "add-margin-bottom": isMobile && isInstallBannerOpen,
      })}
    >
      {!isExport && <ShortDesc>{shortDesc}</ShortDesc>}
      <PageHeader>
        {HorizontalSep}
        <span>{name}</span>
        {HorizontalSep}
      </PageHeader>
      <FlexBox direction="column" alignItems="center">
        <Separator className={classNames({ export: isExport })} />
      </FlexBox>
      <SectionsWrapper
        isMobile={isMobile}
        isExport={isExport}
        className={classNames({ export: isExport })}
      >
        {reOrderedSectionComponents.map((section, index) => {
          return section.display !== false ? (
            <div key={index}>{section.component}</div>
          ) : null;
        })}
      </SectionsWrapper>
    </Wrapper>
  );
};

export default ProfileSections;

const Wrapper = styled.section`
  &:not(.export) {
    background-color: #f0f0f0;
    &.add-margin-top {
      margin-top: 90px;
      animation: ease-in-m-t 2s ease-in 1;
      @keyframes ease-in-m-t {
        from {
          margin-top: 0;
        }
        to {
          margin-top: 90px;
        }
      }
    }
    &.add-margin-bottom {
      margin-bottom: 90px;
      animation: ease-in-m-b 2s ease-in 1;
      @keyframes ease-in-m-b {
        from {
          margin-bottom: 0;
        }
        to {
          margin-bottom: 90px;
        }
      }
    }
  }

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
  margin-top: 0;
  line-height: 3;
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
