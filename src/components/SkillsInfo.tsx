import ReactTable from "react-table";
import styled from "styled-components";
import "react-table/react-table.css";
import React from "react";
import { AppContext } from "../context";
import { ISkill } from "../store/types";
import { valueIsArray, valueIsSkillInfo } from "./Utils";

export const SkillsInfo = () => {
  const { data } = React.useContext(AppContext);

  const getSkillsData = () => {
    const { skills } = data.data;
    const { info } = skills;
    return valueIsArray(info) && valueIsSkillInfo(info)
      ? info.map((skill: ISkill) => ({
          technology: skill.label,
          skills: skill.info,
        }))
      : [];
  };

  const skillsData = getSkillsData();

  return (
    <TABLE
      columns={COLUMNS}
      data={skillsData}
      defaultPageSize={skillsData.length}
      TheadComponent={(props) => null}
      className="-striped -highlight"
      NoDataComponent={NoData}
      showPagination={false}
    />
  );
};

const TABLE = styled(ReactTable)`
  margin-left: 20px;
  border: 1px solid #fff;
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
`;
const COLUMNS = [
  {
    Header: "technology",
    accessor: "technology",
    maxWidth: 200,
  },
  {
    Header: "skills",
    accessor: "skills",
    maxWidth: 300,
  },
];

const NoData = () => <NoDataText>Fetching data....</NoDataText>;

const NoDataText = styled.div`
  position: absolute;
  left: 45%;
  top: 40%;
`;
