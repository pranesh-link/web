import React, { useContext } from "react";
import { FlexBoxSection, Overlay } from "../../../common/Elements";
import { ILink, ISectionInfo } from "../../../store/profile/types";
import {
  getFilteredLinks,
  getIconUrl,
  valueIsArray,
  valueIsLinkInfo,
} from "../../../common/Utils";
import classNames from "classnames";
import styled from "styled-components";
import { AppContext } from "../../../store/profile/context";

interface IContactProps {
  refObj: React.MutableRefObject<any>;
  links: ISectionInfo;
}
export const Contact = (props: IContactProps) => {
  const { links, refObj } = props;
  const { isMobile } = useContext(AppContext);
  const filteredLinks = getFilteredLinks(links.info as ILink[]);
  return (
    <>
      {!isMobile && (
        <>
          <Overlay background="#f0f0f0" height={15} bottom={55} opacity={0.9} />
          <Overlay background="#f0f0f0" height={15} bottom={70} opacity={0.6} />
        </>
      )}

      <ContactsSection
        justifyContent="center"
        alignItems="center"
        className="profile-section links"
        id="links"
        ref={refObj}
      >
        {valueIsArray(links.info) && valueIsLinkInfo(links.info)
          ? filteredLinks.map((link, index) => (
              <div
                key={index}
                className={classNames("link-wrapper", {
                  "hide-profile-url": link.isExportOnly,
                })}
              >
                {!link.isExportOnly && (
                  <a
                    className="link"
                    href={link.link}
                    target="_blank"
                    key={link.label}
                    rel="noopener noreferrer"
                  >
                    <img
                      alt={link.label}
                      className={link.label}
                      src={getIconUrl(link.icon)}
                    />
                  </a>
                )}
              </div>
            ))
          : null}
      </ContactsSection>
    </>
  );
};

const ContactsSection = styled(FlexBoxSection)`
  .hide-profile-url {
    display: none;
  }
`;
