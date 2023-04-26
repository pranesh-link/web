import classNames from "classnames";
import React, { useEffect, useState } from "react";
import {
  FlexBoxSection,
  SecHeader,
  Desc,
  FlexBox,
} from "../../../common/Elements";
import { ILink, ISectionInfo } from "../../../store/profile/types";
import {
  getFilteredLinks,
  getIconUrl,
  getIconUrlByExportFlag,
  getObjectKeyValuesByIndex,
  isEmptyObject,
  valueIsArray,
  valueIsLinkInfo,
} from "../../../common/Utils";
import styled from "styled-components";
import { AppContext } from "../../../store/profile/context";
import { AboutMeDetails } from "./AboutMeDetails";
import { COPIED, NOT_COPIED } from "../../../common/constants";

interface IAboutProps {
  refObj: React.MutableRefObject<any>;
  aboutMe: ISectionInfo;
  details: ISectionInfo;
  links: ISectionInfo;
  exportProfile: () => void;
}
export const About = (props: IAboutProps) => {
  const { refObj, aboutMe, details, links } = props;
  const {
    hasDownloadedProfile,
    isExport,
    isMobile,
    isDownloading,
    data: { download },
  } = React.useContext(AppContext);
  const [copyState, setCopyState] = useState<Record<string, { state: string }>>(
    {}
  );
  const [showCopy, setShowCopy] = useState<boolean>(false);

  useEffect(() => {
    const [key, value] = getObjectKeyValuesByIndex(copyState, 0);
    if (!isEmptyObject(copyState) && value.state === COPIED) {
      setTimeout(() => {
        setCopyState({
          [key]: {
            state: NOT_COPIED,
          },
        });
        setShowCopy(true);
      }, 2000);
    }
  }, [copyState]);

  const filteredLinks = getFilteredLinks(links.info as ILink[]);
  return (
    <FlexBoxSection
      className={classNames("profile-section", "about", { export: isExport })}
      justifyContent={isExport ? "normal" : "center"}
      ref={isExport ? null : refObj}
      id={isExport ? "" : "home"}
    >
      <FlexBoxSection
        direction="column"
        className={classNames("about-me", { export: isExport })}
      >
        <SecHeader className="about-me-title">{aboutMe.title}</SecHeader>
        <Desc
          className="about"
          dangerouslySetInnerHTML={{ __html: aboutMe.info as string }}
        />
      </FlexBoxSection>
      <FlexBoxSection alignItems="center" className="image-details-wrap">
        <FlexBoxSection className="image">
          <p className="image-wrap">
            <img
              alt=""
              className="profile-image"
              src={getIconUrlByExportFlag(
                aboutMe.icon,
                aboutMe.pdfExportIcon,
                isExport
              )}
            />
          </p>
        </FlexBoxSection>
        <FlexBoxSection direction="column">
          <AboutMeDetails
            copyState={copyState}
            details={details}
            showCopy={showCopy}
            setShowCopy={(showCopy: boolean) => setShowCopy(showCopy)}
            setCopyState={(copyInfoId: string, state: string) => {
              setCopyState(
                copyInfoId
                  ? {
                      [copyInfoId]: {
                        state,
                      },
                    }
                  : {}
              );
            }}
          />
          {isExport ? (
            <FlexBoxSection
              alignItems="center"
              className="profile-section links export"
            >
              {valueIsArray(links.info) && valueIsLinkInfo(links.info)
                ? filteredLinks.map((link) => (
                    <a
                      className="link"
                      href={link.link}
                      target="_blank"
                      key={link.label}
                      rel="noreferrer"
                    >
                      <img
                        crossOrigin="anonymous"
                        alt={link.label}
                        className={link.label}
                        src={`${link.pdfExportIcon}?dummy=${Math.floor(
                          Math.random() * 1000
                        )}`}
                      />
                    </a>
                  ))
                : null}
            </FlexBoxSection>
          ) : (
            <InterestedInProfile
              isMobile={isMobile}
              className={classNames({
                "downloaded-profile": hasDownloadedProfile,
              })}
              alignItems="center"
            >
              {!isDownloading && !hasDownloadedProfile && (
                <>
                  <img
                    className="download"
                    alt="Click here"
                    height="25px"
                    onClick={props.exportProfile}
                    src={getIconUrl(download.download.icon)}
                    loading="lazy"
                  />
                  <span className="download-text">
                    {download.download.message}
                  </span>
                </>
              )}
              {isDownloading && (
                <>
                  <img
                    className="downloading"
                    alt="Downloading"
                    height="35px"
                    src={getIconUrl(download.downloading.icon)}
                    loading="lazy"
                  />
                  <FlexBox alignItems="center" className="downloading-text">
                    <span>{download.downloading.message}</span>
                    <span className="progress-animation" />
                  </FlexBox>
                </>
              )}
              {hasDownloadedProfile && (
                <>
                  <img
                    className="downloaded"
                    alt="Downloaded"
                    height="40px"
                    src={getIconUrl(download.downloaded.icon)}
                    loading="lazy"
                  />
                  <span className="downloaded-text">
                    {download.downloaded.message}
                  </span>
                </>
              )}
            </InterestedInProfile>
          )}
        </FlexBoxSection>
      </FlexBoxSection>
    </FlexBoxSection>
  );
};

const InterestedInProfile = styled(FlexBox)<{ isMobile: boolean }>`
  margin: ${(props) => (props.isMobile ? "10px 0 0 0" : "10px 0 0 10px")};
  min-height: 50px;
  font-weight: bold;
  &.downloaded-profile {
    margin-left: ${(props) => (props.isMobile ? "0" : "5px")};
  }

  .download {
    min-width: 100px;
    margin-right: 5px;
    border-radius: 5px;
    cursor: pointer;
  }

  .downloading {
    min-width: 35px;
  }

  .downloaded {
    min-width: 40px;
  }

  .download-text,
  .downloading-text,
  .downloaded-text {
    overflow: hidden;
    white-space: nowrap;
    width: 0;
    animation: typing;
    animation-duration: 3s;
    animation-timing-function: steps(30, end);
    animation-fill-mode: forwards;
  }

  @keyframes typing {
    from {
      width: 0;
    }
    to {
      width: 100%;
    }
  }
  .downloading-text {
    margin-left: 5px;
    .progress-animation {
      position: relative;
      width: 7px;
      height: 7px;
      border-radius: 5px;
      background-color: #3f9c35;
      color: #3f9c35;
      animation: flashing 1s infinite linear alternate;
      animation-delay: 0.5s;
      margin: 5px 0 0 20px;
      &::before,
      &::after {
        content: "";
        display: inline-block;
        position: absolute;
        top: 0;
      }
      &::before {
        left: -15px;
        width: 7px;
        height: 7px;
        border-radius: 5px;
        background-color: #3f9c35;
        color: #3f9c35;
        animation: flashing 1s infinite alternate;
        animation-delay: 0s;
      }
      &::after {
        left: 15px;
        width: 7px;
        height: 7px;
        border-radius: 5px;
        background-color: #3f9c35;
        color: #3f9c35;
        animation: flashing 1s infinite alternate;
        animation-delay: 1s;
      }

      @keyframes flashing {
        0% {
          background-color: #3f9c35;
        }
        50%,
        100% {
          background-color: rgba(152, 128, 255, 0.2);
        }
      }
    }
  }
`;
