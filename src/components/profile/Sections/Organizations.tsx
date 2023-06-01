import classNames from "classnames";
import React, { useContext } from "react";
import styled from "styled-components";
import { FlexBoxSection, SecHeader } from "../../../common/Elements";
import { valueIsArray, valueIsExperienceInfo } from "../../../common/Utils";
import { EXPERIENCE_TYPES } from "../../../common/constants";
import { AppContext } from "../../../store/profile/context";

export const Organizations = () => {
  const {
    isExport,
    isMobile,
    data: {
      sections: { organizations },
    },
    refs: { orgRef: refObj },
  } = useContext(AppContext);
  if (
    valueIsArray(organizations.info) &&
    valueIsExperienceInfo(organizations.info)
  ) {
    const currentOrg = organizations.info.find(
      (organization) => organization.type === EXPERIENCE_TYPES.CURRENT
    );
    const previousOrgs = organizations.info.filter(
      (organization) => organization.type === EXPERIENCE_TYPES.PREVIOUS
    );

    return (
      <OrgsWrapper
        className={classNames("profile-section", "organizations", {
          export: isExport,
        })}
        id={isExport ? "" : "organizations"}
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
            <p className="org-info current">
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
            <p className="org-info previous" key={index}>
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
    margin-top: 0;
    &.current {
      color: #006400;
    }
    &.previous {
      color: #8a8982;
    }
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
