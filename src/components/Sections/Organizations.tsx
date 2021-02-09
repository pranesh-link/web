import classNames from "classnames";
import React from "react";
import styled from "styled-components";
import { FlexBoxSection, SecHeader } from "../../common/Elements";
import { ISectionInfo } from "../../store/types";
import { valueIsArray, valueIsOrgInfo } from "../Utils";

interface IOrganizationsProps {
  isExport?: boolean;
  isMobile: boolean;
  organizations: ISectionInfo;
  refObj: React.MutableRefObject<any>;
}

export const Organizations = (props: IOrganizationsProps) => {
  const { isExport, organizations, refObj, isMobile } = props;
  if (valueIsArray(organizations.info) && valueIsOrgInfo(organizations.info)) {
    const currentOrg = organizations.info.find(
      (organization) => organization.type === "Current"
    );
    const previousOrgs = organizations.info.filter(
      (organization) => organization.type === "Previous"
    );

    return (
      <OrgsWrapper
        className={classNames("profile-section", "organizations", {
          export: isExport,
        })}
        id="organizations"
        ref={isExport ? null : refObj}
      >
        <SecHeader className={classNames({ export: isExport })}>
          {organizations.title}
        </SecHeader>
        {currentOrg && (
          <FlexBoxSection
            justifyContent={isMobile ? "normal" : "center"}
            className="current-org"
          >
            <p className="org-info">
              <span className="designation">{currentOrg.designation}, </span>
              <span className="org-name">{currentOrg.name} </span>
              <span className="duration">
                ( {currentOrg.from} - {currentOrg.to} )
              </span>
            </p>
          </FlexBoxSection>
        )}
        <FlexBoxSection
          justifyContent={isMobile ? "normal" : "center"}
          className="previous-org"
        >
          {previousOrgs.map((organization, index) => (
            <p className="org-info" key={index}>
              <span className="designation">{organization.designation}, </span>
              <span className="org-name">{organization.name} </span>
              <span className="duration">
                ( {organization.from} - {organization.to} )
              </span>
            </p>
          ))}
        </FlexBoxSection>
      </OrgsWrapper>
    );
  }
  return null;
};

const OrgsWrapper = styled.section`
  .current-org {
    padding-top: 5px;
  }
  &.export {
    .current-org,
    .previous-org {
      justify-content: normal;
      padding-left: 0px;
    }
  }
  .current-org,
  .previous-org {
    padding-left: 5px;
  }
  .org-info {
    .duration {
      font-style: italic;
    }
    .designation {
      font-weight: bold;
    }
  }
  @media screen and (max-width: 767px) {
    &:not(.export) {
      .org-info {
        .duration {
          display: block;
        }
      }
    }
  }
`;
