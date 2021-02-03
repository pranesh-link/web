import React from "react";
import styled from "styled-components";
import { FlexBox, SecHeader } from "../common/Elements";
import { AppContext } from "../context";
import { Experiences } from "./Sections/Experiences";
import { Skills } from "./Sections/Skills";
import { About } from "./Sections/About";
import { Education } from "./Sections/Education";
import { Contact } from "./Sections/Contact";

const ProfileSections = () => {
  const {
    data: { sections, header },
    refs: { homeRef, skillsRef, experienceRef, educationRef, contactRef },
  } = React.useContext(AppContext);
  const { aboutMe, details, skills, education, experience, links } = sections;
  const { shortDesc, name } = header;

  return (
    <Wrapper>
      <ShortDesc>{shortDesc}</ShortDesc>
      <PageHeader>
        <hr className="header-sep" />
        <span>{name}</span>
        <hr className="header-sep" />
      </PageHeader>
      <FlexBox direction="column" alignItems="center">
        <Separator />
      </FlexBox>
      <SectionsWrapper>
        <About aboutMe={aboutMe} details={details} refObj={homeRef} />
        <Education education={education} refObj={educationRef} />
        <Skills skills={skills} refObj={skillsRef} />
        <Experiences experiences={experience} refObj={experienceRef} />
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
    @media screen and (max-width: 767px) {
      display: none;
    }
  }
`;

const SectionsWrapper = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  height: 100%;
  margin-top: 40px;
  padding-bottom: 60px;
  .profile-section {
    margin-bottom: 20px;
    > header {
      @media screen and (max-width: 767px) {
        margin-bottom: 0px;
      }
    }
    &.links {
      padding: 30px 0;
      background-color: #434242;
      position: fixed;
      bottom: 0;
      width: 100%;
      margin-bottom: 0;
      @media screen and (max-width: 767px) {
        display: none;
      }
    }
    .link {
      a {
        padding: 10px 15px;
        text-decoration: none;
        border-radius: 20px;
        background-color: #0c77b9;
        &:hover {
          background-color: #3f9c35;
        }
      }
      a,
      span {
        color: #f0f0f0;
      }
      padding-right: 5px;
      .link-separator {
        &:last-child {
          display: none;
        }
      }
    }
    &.experience {
      padding-top: 20px;
      background-color: #f3f0de;
      ${SecHeader} {
        @media screen and (max-width: 767px) {
          margin-bottom: 10px;
        }
      }
      @media screen and (max-width: 767px) {
        background: none;
      }
    }
    &.about {
      padding-top: 20px;
      @media screen and (max-width: 767px) {
        flex-direction: column;
        justify-content: normal;
      }
    }
    .image-details-wrap {
      margin-right: 10px;
    }
    .about-me {
      flex-basis: 20%;
      padding-right: 10px;
    }
    .image {
      .image-wrap {
        margin-right: 50px;
        @media screen and (max-width: 767px) {
          margin-right: 20px;
        }
      }
      .profile-image {
        width: 200px;
        height: 200px;
        border-radius: 50%;
        border: 2px solid #dddbca;
        @media screen and (max-width: 767px) {
          width: 125px;
          height: 125px;
        }
      }
    }
    .details {
      flex-basis: 20%;
      .detail-info {
        line-height: 1.5;
        margin-right: 10px;
        span {
          flex-basis: 75%;
        }
      }
    }
  }
  @media screen and (max-width: 767px) {
    padding-left: 20px;
    margin-top: 0;
  }
`;

const Separator = styled.hr`
  min-width: 50%;
  border-color: #727878;
  opacity: 0.2;
  height: 0;
  border-top: 1px solid #eee;
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
  font-size: 54px;
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
