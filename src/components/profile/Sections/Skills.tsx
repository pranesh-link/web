import styled from "styled-components";
import React, { useContext } from "react";
import { ISkill, ISectionInfo } from "../../../store/profile/types";
import { valueIsArray, valueIsSkillInfo } from "../../../common/Utils";
import {
  FlexBox,
  FlexBoxSection,
  Grid,
  SecHeader,
} from "../../../common/Elements";
import classNames from "classnames";
import { AppContext } from "../../../store/profile/context";
import StarIcon from "../../../assets/star.svg";
import StarUnfilledIcon from "../../../assets/star-unfilled.svg";

interface ISkillsProps {
  isExport?: boolean;
  refObj: React.MutableRefObject<any>;
  skills: ISectionInfo;
}
export const Skills = (props: ISkillsProps) => {
  const { refObj, skills, isExport = false } = props;
  const { isMobile } = useContext(AppContext);

  const getSkillStars = (text: string, index: number, icon: string) => (
    <img key={index} alt={text} className="star" src={icon} />
  );

  const getSkillWithStars = (starNum: number) => (
    <FlexBox className="stars">
      {Array(5)
        .fill(null)
        .map((_item, index) => {
          let skillText = "Star unfilled",
            starIcon = StarUnfilledIcon;
          if (index + 1 <= starNum) {
            skillText = "Star filled";
            starIcon = StarIcon;
          }
          return getSkillStars(skillText, index, starIcon);
        })}
    </FlexBox>
  );

  const getColumnData = (skill: ISkill) => (
    <FlexBox className="skill">
      <div className="skill-label">
        <strong>{skill.label}</strong>
      </div>
      {getSkillWithStars(skill.star)}
    </FlexBox>
  );

  const getStarredSkillsData = () =>
    valueIsArray(skills.info) && valueIsSkillInfo(skills.info)
      ? skills.info.map((skill: ISkill, index: number) => (
          <div key={index}>{getColumnData(skill)}</div>
        ))
      : null;

  return (
    <section
      className="profile-section"
      id={isExport ? "" : "skills"}
      ref={isExport ? null : refObj}
    >
      <SecHeader className={classNames({ export: isExport })}>
        {skills.title}
      </SecHeader>
      <SkillsInfoWrapper
        isExport={isExport}
        isMobile={isMobile}
        justifyContent={isExport ? "normal" : "center"}
      >
        <Grid gridTemplateColumns="1fr 1fr">{getStarredSkillsData()}</Grid>
      </SkillsInfoWrapper>
    </section>
  );
};

const SkillsInfoWrapper = styled(FlexBoxSection)<{
  isMobile: boolean;
  isExport: boolean;
}>`
  .skill {
    padding-bottom: 10px;
    .skill-label {
      flex-basis: ${(props) => {
        let flexBasis = "50%";
        flexBasis = props.isExport ? "60%" : props.isMobile ? "40%" : flexBasis;
        return flexBasis;
      }};
      padding-right: 10px;
      ${(props) => props.isMobile && !props.isExport && "font-size: 13px"}
    }
    .stars {
      margin-right: ${(props) => (props.isExport ? "100px" : "10px")};
    }

    .star {
      height: ${(props) =>
        props.isMobile && !props.isExport ? "15px" : "20px"};
      width: ${(props) =>
        props.isMobile && !props.isExport ? "15px" : "20px"};
    }
  }

  @media screen and (max-width: 767px) {
    justify-content: normal;
  }
`;
