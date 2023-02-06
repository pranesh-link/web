import classNames from "classnames";
import React, { useEffect, useState } from "react";
import {
  FlexBoxSection,
  SecHeader,
  Desc,
  ActionBtn,
  FlexBox,
} from "../../../common/Elements";
import { ISectionInfo } from "../../../store/profile/types";
import {
  getIconUrlByExportFlag,
  valueIsArray,
  valueIsLinkInfo,
} from "../../../common/Utils";
import styled from "styled-components";
import { AppContext } from "../../../store/profile/context";
import DownloadAnimatedIcon from "../../../assets/animated-download-icon.gif";
import DownloadingIcon from "../../../assets/downloading-icon.gif";
import DownloadedIcon from "../../../assets/downloaded-icon.gif";
import { AboutMeDetails } from "./AboutMeDetails";

interface IAboutProps {
  refObj: React.MutableRefObject<any>;
  aboutMe: ISectionInfo;
  details: ISectionInfo;
  links: ISectionInfo;
  exportProfile: () => void;
}
export const About = (props: IAboutProps) => {
  const { refObj, aboutMe, details, links } = props;
  const { hasDownloadedProfile, isExport, isMobile, isDownloading } =
    React.useContext(AppContext);
  const [copied, setCopied] = useState<boolean>(false);
  const [copyInfoId, setCopyInfoId] = useState<string>("");
  const [showCopy, setShowCopy] = useState<boolean>(false);

  useEffect(() => {
    if (copied) {
      setTimeout(() => {
        setCopied(false);
        setCopyInfoId("");
      }, 2000);
    }
  }, [copied]);

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
            copied={copied}
            copyInfoId={copyInfoId}
            details={details}
            showCopy={showCopy}
            setCopied={(copied: boolean) => setCopied(copied)}
            setShowCopy={(showCopy: boolean) => setShowCopy(showCopy)}
            setCopyInfoId={(copyInfoId: string) => setCopyInfoId(copyInfoId)}
          />
          {isExport ? (
            <FlexBoxSection
              alignItems="center"
              className="profile-section links export"
            >
              {valueIsArray(links.info) && valueIsLinkInfo(links.info)
                ? links.info.map((link) => (
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
                  <span>Interested in profile ?</span>
                  <img
                    className="download"
                    alt="Download"
                    height="25px"
                    onClick={props.exportProfile}
                    src={DownloadAnimatedIcon}
                  />
                </>
              )}
              {isDownloading && (
                <>
                  <img
                    className="downloading"
                    alt="Downloading"
                    height="35px"
                    src={DownloadingIcon}
                  />
                  <FlexBox alignItems="center" className="downloading-text">
                    Downloading
                    <span className="progress-animation"></span>
                  </FlexBox>
                </>
              )}
              {hasDownloadedProfile && (
                <>
                  <img
                    className="downloaded"
                    alt="Downloaded"
                    height="40px"
                    src={DownloadedIcon}
                  />
                  <span>Downloaded profile!</span>
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
    margin-left: 5px;
    cursor: pointer;
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
      animation: dot-flashing 2s infinite linear alternate;
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
        animation: dot-flashing 2s infinite alternate;
        animation-delay: 0s;
      }
      &::after {
        left: 15px;
        width: 7px;
        height: 7px;
        border-radius: 5px;
        background-color: #3f9c35;
        color: #3f9c35;
        animation: dot-flashing 2s infinite alternate;
        animation-delay: 1s;
      }

      @keyframes dot-flashing {
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
