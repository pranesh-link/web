import ReactTable from "react-table";
import styled from "styled-components";
import "react-table/react-table.css";
import React from "react";
import { ISkill, ISectionInfo } from "../../store/types";
import { valueIsArray, valueIsSkillInfo } from "../Utils";
import { FlexBoxSection, SecHeader } from "../../common/Elements";

interface ISkillsProps {
  refObj: React.MutableRefObject<any>;
  skills: ISectionInfo;
}
export const Skills = (props: ISkillsProps) => {
  const { refObj, skills } = props;

  const getSkillsData = () => {
    const { info } = skills;
    return valueIsArray(info) && valueIsSkillInfo(info)
      ? info.map((skill: ISkill) => ({
          technology: <strong>{skill.label}</strong>,
          skills: skill.info,
        }))
      : [];
  };

  const skillsData = getSkillsData();

  return (
    <section className="profile-section" id="skills" ref={refObj}>
      <SecHeader>{skills.title}</SecHeader>
      <SkillsInfoWrapper justifyContent="center">
        <TABLE
          columns={COLUMNS}
          data={skillsData}
          defaultPageSize={skillsData.length}
          TheadComponent={(props) => null}
          className="-striped -highlight"
          NoDataComponent={NoData}
          showPagination={false}
        />
      </SkillsInfoWrapper>
    </section>
  );
};

const SkillsInfoWrapper = styled(FlexBoxSection)`
  @media screen and (max-width: 767px) {
    justify-content: normal;
  }
`;

const TABLE = styled(ReactTable)`
  &.ReactTable {
    border: 1px solid #fff;
    flex-basis: 30%;
    &.-highlight {
      .rt-tbody {
        .rt-tr {
          &:not(.-padRow):hover {
            background: none;
          }
        }
      }
    }
    .rt-tbody {
      .rt-tr-group {
        border-bottom: 1px solid #fff;
      }
      .rt-td {
        border-right: 1px solid #fff;
        white-space: break-spaces;
      }
      .rt-tr {
        &.-odd {
          background-color: #fff;
        }
      }
    }
  }
`;
const COLUMNS = [
  {
    Header: "technology",
    accessor: "technology",
    minWidth: 200,
    maxWidth: 200,
  },
  {
    Header: "skills",
    accessor: "skills",
    minWidth: 200,
    maxWidth: 300,
  },
];

const NoData = () => <NoDataText>Fetching data....</NoDataText>;

const NoDataText = styled.div`
  position: absolute;
  left: 45%;
  top: 40%;
`;
