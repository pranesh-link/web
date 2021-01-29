import React from "react";
import styled from "styled-components";
import { FlexBox, FlexBoxSection } from "../common/Elements";
import { AppContext } from "../context";
import { ExperienceInfo } from "./ExperienceInfo";
import { SkillsInfo } from "./SkillsInfo";
import ProfileImg from "../assets/linkedin.jpeg";
import { valueIsSkillInfo, valueIsArray } from "./Utils";

const ProfileSections = () => {
  const {
    data,
    refs: { homeRef, skillsRef, experienceRef, educationRef, contactRef },
  } = React.useContext(AppContext);
  const {
    aboutMe,
    details,
    skills,
    education,
    experience,
    contact,
  } = data.data;
  return (
    <Wrapper>
      <PageHeader>Profile</PageHeader>
      <FlexBox direction="column" alignItems="center">
        <ShortDesc>I'm a Front End Developer</ShortDesc>
        <Separator />
      </FlexBox>
      <SectionsWrapper>
        <FlexBoxSection
          className="profile-section about"
          justifyContent="center"
          ref={homeRef}
        >
          <FlexBoxSection direction="column" className="about-me">
            <SecHeader className="about-me-title">{aboutMe.title}</SecHeader>
            <Desc className="about">{aboutMe.info}</Desc>
          </FlexBoxSection>
          <FlexBoxSection className="image">
            <p className="image-wrap">
              <img className="profile-image" src={ProfileImg} />
            </p>
          </FlexBoxSection>
          <FlexBoxSection direction="column" className="details">
            <SecHeader className="about-me-title">{details.title}</SecHeader>
            <FlexBoxSection direction="column">
              {valueIsArray(details.info) && valueIsSkillInfo(details.info)
                ? details.info.map((detail, index) => (
                    <FlexBoxSection key={index} direction="column">
                      <DetailLabel>{detail.label}</DetailLabel>
                      <span className="detail-info">{detail.info}</span>
                    </FlexBoxSection>
                  ))
                : null}
            </FlexBoxSection>
          </FlexBoxSection>
        </FlexBoxSection>
        <section className="profile-section" ref={skillsRef}>
          <SecHeader>{skills.title}</SecHeader>
          <SkillsInfo />
        </section>
        <section className="profile-section experience" ref={experienceRef}>
          <SecHeader>{experience.title}</SecHeader>
          <ExperienceInfo experience={experience.info} />
        </section>
        <section className="profile-section" ref={educationRef}>
          <SecHeader>{education.title}</SecHeader>
          <Desc
            dangerouslySetInnerHTML={{ __html: education.info as string }}
          />
        </section>
        <section className="profile-section" ref={contactRef}>
          <SecHeader>{contact.title}</SecHeader>
        </section>
      </SectionsWrapper>
    </Wrapper>
  );
};

export default ProfileSections;

const Wrapper = styled.section``;

const SectionsWrapper = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  height: 100%;
  margin-top: 40px;
  padding-bottom: 50%;
  .profile-section {
    margin-bottom: 20px;
    padding-left: 20px;

    &.experience {
      padding-top: 20px;
      background-color: #f3f0de;
    }
    .about-me {
      flex-basis: 20%;
      padding-right: 10px;
    }
    .image {
      .image-wrap {
        padding: 10px;
        border-radius: 50%;
        background-color: #dddbca;
        margin-right: 25px;
      }
      .profile-image {
        width: 200px;
        height: 200px;
        border-radius: 50%;
      }
    }
    .details {
      flex-basis: 20%;
      .detail-info {
        line-height: 1.5;
      }
    }
  }
`;

const Separator = styled.hr`
  min-width: 50%;
  border-color: #727878;
  opacity: 0.2;
  height: 0;
  border-top: 1px solid #eee;
`;

const ShortDesc = styled.p`
  text-align: center;
  color: #727878;
  font-size: 21px;
  margin-bottom: 20px;
  font-weight: 300;
  line-height: 1.4;
`;
const PageHeader = styled.h2`
  font-size: 54px;
  font-weight: 300;
  color: #22a39f;
  text-align: center;
  margin: 25px 0 0 0;
`;

const SecHeader = styled.header`
  font-size: 54px;
  font-weight: 300;
  margin-bottom: 20px;
  color: #22a39f;
  text-align: center;
  &.about-me-title {
    text-align: left;
    font-size: 28px;
  }
`;

const Desc = styled.p`
  margin: 0;
  padding-left: 20px;
  padding-right: 15%;
  &.about {
    padding-left: 0;
  }
`;

const DetailLabel = styled.label`
  font-weight: bold;
  line-height: 1.2;
`;
