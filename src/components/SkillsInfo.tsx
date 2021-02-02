import ReactTable from "react-table";
import styled from "styled-components";
import "react-table/react-table.css";
import React from "react";
import { AppContext } from "../context";
import { ISkill } from "../store/types";
import { valueIsArray, valueIsSkillInfo } from "./Utils";
import { FlexBoxSection } from "../common/Elements";

export const SkillsInfo = () => {
  const { data } = React.useContext(AppContext);

  const getSkillsData = () => {
    const { skills } = data.data;
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
