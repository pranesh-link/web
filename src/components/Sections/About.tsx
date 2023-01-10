import classNames from "classnames";
import React, { useEffect, useState } from "react";
import {
  FlexBoxSection,
  SecHeader,
  Desc,
  ActionBtn,
} from "../../common/Elements";
import { ISectionInfo } from "../../store/types";
import { valueIsArray, valueIsLinkInfo } from "../Utils";
import ProfileImg from "../../assets/profile.jpeg";
import styled from "styled-components";
import DownloadIcon from "../../assets/download-icon.svg";
import { AppContext } from "../../context";
import DownloadedIcon from "../../assets/white-tick-icon.svg";
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
  const { hasDownloadedProfile, isExport, isDownloading } =
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
        <Desc className="about">{aboutMe.info}</Desc>
      </FlexBoxSection>
      <FlexBoxSection alignItems="center" className="image-details-wrap">
        <FlexBoxSection className="image">
          <p className="image-wrap">
            <img alt="" className="profile-image" src={ProfileImg} />
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
                        src={`${link.icon}?dummy=${Math.floor(
                          Math.random() * 1000
                        )}`}
                      />
                    </a>
                  ))
                : null}
            </FlexBoxSection>
          ) : (
            <DownloadProfileBtn
              onClick={props.exportProfile}
              disabled={isDownloading || hasDownloadedProfile}
              className={classNames({ downloading: isDownloading })}
            >
              <span>
                {isDownloading
                  ? "Downloading..."
                  : hasDownloadedProfile
                  ? "Downloaded"
                  : "Download"}
              </span>
              {!isDownloading && !hasDownloadedProfile && (
                <img alt="" src={DownloadIcon} />
              )}
              {hasDownloadedProfile && (
                <img alt="" className="downloaded" src={DownloadedIcon} />
              )}
            </DownloadProfileBtn>
          )}
        </FlexBoxSection>
      </FlexBoxSection>
    </FlexBoxSection>
  );
};

const DownloadProfileBtn = styled(ActionBtn)`
  margin: 10px 0 0 10px;
  max-width: 150px;
  background-color: #2161ff;
  min-height: 55px;
  padding: 10px 15px;
  color: #f0f0f0;
  border-radius: 7px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  &:hover {
    background-color: #005c84;
  }
  &.downloading {
    justify-content: center;
  }
  @media screen and (max-width: 767px) {
    max-width: unset;
    margin: 10px 0 0 0;
  }
  img {
    margin-left: 10px;
    margin-right: 5px;
    height: 35px;
    width: 30px;
    &.downloaded {
      height: 30px;
      width: 20px;
      margin-bottom: 3px;
      margin-right: 0;
    }
  }
`;
