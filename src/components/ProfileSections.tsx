import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FlexBox, FlexBoxSection } from "../common/Elements";
import { AppContext } from "../context";
import { ExperienceInfo } from "./ExperienceInfo";
import { SkillsInfo } from "./SkillsInfo";
import ProfileImg from "../assets/linkedin.jpeg";
import {
  valueIsSkillInfo,
  valueIsArray,
  valueIsDetailInfo,
  lowercase,
} from "./Utils";
import classNames from "classnames";
import * as clipboard from "clipboard-polyfill/text";

const ProfileSections = () => {
  const {
    data,
    refs: { homeRef, skillsRef, experienceRef, educationRef, contactRef },
  } = React.useContext(AppContext);
  const { aboutMe, details, skills, education, experience, links } = data.data;
  const [copied, setCopied] = useState<boolean>(false);
  const [copyInfoId, setCopyInfoId] = useState<string>("");

  useEffect(() => {
    if (copied) {
      setTimeout(() => {
        setCopied(false);
        setCopyInfoId("");
      }, 3000);
    }
  }, [copied]);

  return (
    <Wrapper>
      <ShortDesc>Hey, I'm </ShortDesc>
      <PageHeader>
        <hr className="header-sep" />
        <span>Pranesh</span>
        <hr className="header-sep" />
      </PageHeader>
      <FlexBox direction="column" alignItems="center">
        <Separator />
      </FlexBox>
      <SectionsWrapper>
        <FlexBoxSection
          className="profile-section about"
          justifyContent="center"
          ref={homeRef}
          id="home"
        >
          <FlexBoxSection direction="column" className="about-me">
            <SecHeader className="about-me-title">{aboutMe.title}</SecHeader>
            <Desc className="about">{aboutMe.info}</Desc>
          </FlexBoxSection>
          <FlexBoxSection alignItems="center" className="image-details-wrap">
            <FlexBoxSection className="image">
              <p className="image-wrap">
                <img alt="" className="profile-image" src={ProfileImg} />
              </p>
            </FlexBoxSection>
            <FlexBoxSection direction="column" className="details">
              <FlexBoxSection direction="column">
                {valueIsArray(details.info) && valueIsDetailInfo(details.info)
                  ? details.info.map((detail, index) => (
                      <FlexBoxSection
                        className="detail"
                        key={index}
                        direction="column"
                      >
                        <DetailLabel>{detail.label}</DetailLabel>
                        <FlexBox alignItems="center" className="detail-info">
                          <span id={lowercase(detail.label)}>
                            {detail.info}
                          </span>
                          {detail.canCopy && (
                            <CopyButton
                              data-id={lowercase(detail.label)}
                              data-clipboard-text={detail.info}
                              onClick={(
                                event: React.MouseEvent<HTMLButtonElement>
                              ) => {
                                clipboard.writeText(detail.info).then(() => {
                                  setCopyInfoId(detail.label);
                                  setCopied(true);
                                });
                              }}
                              className={classNames({
                                copied: copied && copyInfoId === detail.label,
                              })}
                            >
                              {copied && copyInfoId === detail.label
                                ? "Copied!"
                                : "Copy"}
                            </CopyButton>
                          )}
                        </FlexBox>
                      </FlexBoxSection>
                    ))
                  : null}
              </FlexBoxSection>
            </FlexBoxSection>
          </FlexBoxSection>
        </FlexBoxSection>

        <section className="profile-section" id="education" ref={educationRef}>
          <SecHeader>{education.title}</SecHeader>
          <Desc
            className="education"
            dangerouslySetInnerHTML={{ __html: education.info as string }}
          />
        </section>
        <section className="profile-section" id="skills" ref={skillsRef}>
          <SecHeader>{skills.title}</SecHeader>
          <SkillsInfo />
        </section>
        <section
          className="profile-section experience"
          id="experience"
          ref={experienceRef}
        >
          <SecHeader>{experience.title}</SecHeader>
          <ExperienceInfo experience={experience.info} />
        </section>
        <FlexBoxSection
          justifyContent="center"
          className="profile-section links"
          id="links"
          ref={contactRef}
        >
          {valueIsArray(links.info) && valueIsSkillInfo(links.info)
            ? links.info.map((link) => (
                <div
                  className="link"
                  key={link.label}
                  dangerouslySetInnerHTML={{ __html: link.info }}
                ></div>
              ))
            : null}
        </FlexBoxSection>
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

const SecHeader = styled.header`
  font-size: 54px;
  font-weight: 300;
  margin-bottom: 20px;
  color: #22a39f;
  text-align: center;
  &.about-me-title {
    text-align: left;
    font-size: 28px;
    @media screen and (max-width: 767px) {
      margin-bottom: 0;
    }
  }
  @media screen and (max-width: 767px) {
    text-align: left;
    font-size: 28px;
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

const Desc = styled.p`
  margin: 0;
  padding-right: 15%;
  @media screen and (max-width: 767px) {
    padding-right: 0;
  }
  &.about {
    padding-left: 0;
  }
  &.education {
    text-align: center;
    padding-right: 0;
    @media screen and (max-width: 767px) {
      text-align: left;
      padding: 0 5px;
    }
  }
  strong {
    color: #3e3e3e;
  }
`;

const DetailLabel = styled.label`
  font-weight: bold;
  line-height: 1.5;
`;

const CopyButton = styled.button`
  border: none;
  background-color: #434242;
  color: #f0f0f0;
  cursor: pointer;
  outline: none;
  border-radius: 15px;
  padding: 5px 10px;
  margin-left: 10px;
  &.copied {
    background-color: #3f9c35;
  }
`;
