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
import { IIcon } from "../../../store/common/types";
import StarIcon from "../../../assets/star.svg";
import StarUnfilledIcon from "../../../assets/star-unfilled.svg";

interface ISkillsProps {
  isExport?: boolean;
  refObj: React.MutableRefObject<any>;
  skills: ISectionInfo;
}
export const Skills = (props: ISkillsProps) => {
  const { refObj, skills, isExport = false } = props;
  const {
    commonData: {
      icons: { star, starUnfilled },
    },
    isMobile,
  } = useContext(AppContext);

  const getSkillStars = (
    star: IIcon,
    text: string,
    index: number,
    icon: string
  ) => {
    return <img key={index} alt={text} className="star" src={icon} />;
  };

  const getSkillWithStars = (starNum: number) => {
    return (
      <FlexBox className="stars">
        {Array(5)
          .fill(null)
          .map((_item, index) => {
            return index + 1 <= starNum
              ? getSkillStars(star, "Star filled", index, StarIcon)
              : getSkillStars(
                  starUnfilled,
                  "Star unfilled",
                  index,
                  StarUnfilledIcon
                );
          })}
      </FlexBox>
    );
  };

  const getColumnData = (skill: ISkill) => {
    return (
      <FlexBox className="skill">
        <div className="skill-label">
          <strong>{skill.label}</strong>
        </div>
        {getSkillWithStars(skill.star)}
      </FlexBox>
    );
  };

  const getStarredSkillsData = () => {
    const { info } = skills;
    return valueIsArray(info) && valueIsSkillInfo(info)
      ? info.map((skill: ISkill, index: number) => {
          return <div key={index}>{getColumnData(skill)}</div>;
        })
      : [];
  };

  const skillsData = getStarredSkillsData();

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
        <Grid gridTemplateColumns="1fr 1fr">{skillsData}</Grid>
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
