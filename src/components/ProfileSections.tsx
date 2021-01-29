import React from "react";
import styled from "styled-components";
import { AppContext } from "../context";
import { ExperienceInfo } from "./ExperienceInfo";
import { SkillsInfo } from "./SkillsInfo";

const { useRef } = React;

const ProfileSections = () => {
  const {
    data,
    refs: { homeRef, skillsRef, experienceRef, educationRef, contactRef },
  } = React.useContext(AppContext);
  const { objective, skills, education, experience } = data.data;
  return (
    <SectionsWrapper>
      <section className="profile-section" ref={homeRef}>
        <SecHeader>{objective.title}</SecHeader>
        <ObjDesc>{objective.info}</ObjDesc>
      </section>
      <section className="profile-section" ref={skillsRef}>
        <SecHeader>{skills.title}</SecHeader>
        <SkillsInfo />
      </section>
      <section className="profile-section" ref={experienceRef}>
        <SecHeader>Experience</SecHeader>
        <ExperienceInfo experience={experience.info} />
      </section>
      <section className="profile-section" ref={educationRef}>
        <SecHeader>Education</SecHeader>
        <ObjDesc
          dangerouslySetInnerHTML={{ __html: education.info as string }}
        />
      </section>
      <section className="profile-section" ref={contactRef}>
        <SecHeader>Contact</SecHeader>
      </section>
    </SectionsWrapper>
  );
};

export default ProfileSections;

const SectionsWrapper = styled.section`
  display: flex;
  padding: 0 20px;
  flex-direction: column;
  justify-content: space-evenly;
  height: 100%;
  margin-top: 75px;
  .profile-section {
    margin-bottom: 20px;
  }
`;

const SecHeader = styled.header`
  font-weight: bold;
  font-size: 20px;
  margin-bottom: 20px;
`;

const ObjDesc = styled.p`
  margin: 0;
  padding: 0 20px;
`;
