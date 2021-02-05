import classNames from "classnames";
import React, { useEffect, useState } from "react";
import {
  FlexBoxSection,
  FlexBox,
  SecHeader,
  Desc,
  ActionBtn,
} from "../../common/Elements";
import { ISectionInfo } from "../../store/types";
import { valueIsArray, valueIsDetailInfo, lowercase } from "../Utils";
import ProfileImg from "../../assets/profile.jpeg";
import * as clipboard from "clipboard-polyfill/text";
import styled from "styled-components";
import DownloadIcon from "../../assets/download-icon.svg";

interface IAboutProps {
  refObj: React.MutableRefObject<any>;
  isExport?: boolean;
  aboutMe: ISectionInfo;
  details: ISectionInfo;
  isDownloading?: boolean;
  exportProfile: () => void;
}
export const About = (props: IAboutProps) => {
  const { refObj, aboutMe, details, isExport, isDownloading } = props;
  const [copied, setCopied] = useState<boolean>(false);
  const [copyInfoId, setCopyInfoId] = useState<string>("");

  useEffect(() => {
    if (copied) {
      setTimeout(() => {
        setCopied(false);
        setCopyInfoId("");
      }, 3000);
    }
  }, [copied]);

  return (
    <FlexBoxSection
      className="profile-section about"
      justifyContent={isExport ? "normal" : "center"}
      ref={refObj}
      id="home"
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
        <FlexBoxSection direction="column" className="details">
          <FlexBoxSection direction="column">
            {valueIsArray(details.info) && valueIsDetailInfo(details.info)
              ? details.info.map((detail, index) => (
                  <FlexBoxSection
                    className="detail"
                    key={index}
                    direction="column"
                  >
                    <DetailLabel>{detail.label}</DetailLabel>
                    <FlexBox alignItems="center" className="detail-info">
                      <span id={lowercase(detail.label)}>{detail.info}</span>
                      {!isExport && detail.canCopy && (
                        <CopyButton
                          data-id={lowercase(detail.label)}
                          data-clipboard-text={detail.info}
                          onClick={() => {
                            clipboard.writeText(detail.info).then(() => {
                              setCopyInfoId(detail.label);
                              setCopied(true);
                            });
                          }}
                          className={classNames({
                            copied: copied && copyInfoId === detail.label,
                          })}
                        >
                          {copied && copyInfoId === detail.label
                            ? "Copied!"
                            : "Copy"}
                        </CopyButton>
                      )}
                    </FlexBox>
                  </FlexBoxSection>
                ))
              : null}
            {!isExport && (
              <DownloadProfileBtn
                className=""
                onClick={() => props.exportProfile()}
              >
                <span>
                  {isDownloading ? "Downloading..." : "Download profile"}
                </span>
                <img alt="" src={DownloadIcon} />
              </DownloadProfileBtn>
            )}
          </FlexBoxSection>
        </FlexBoxSection>
      </FlexBoxSection>
    </FlexBoxSection>
  );
};

const DownloadProfileBtn = styled(ActionBtn)`
  margin-top: 10px;
  background-color: #0c77b9;
  max-width: 80%;
  padding: 10px 5px;
  color: #f0f0f0;
  border-radius: 25px;
  &:hover {
    background-color: #005c84;
  }
  img {
    margin-left: 10px;
    margin-right: 5px;
    height: 15px;
    width: 15px;
  }
`;
const CopyButton = styled.button`
  border: none;
  background-color: #434242;
  color: #f0f0f0;
  cursor: pointer;
  outline: none;
  border-radius: 15px;
  padding: 3px 10px;
  margin-left: 10px;
  &.copied {
    background-color: #3f9c35;
  }
`;

const DetailLabel = styled.label`
  font-weight: bold;
  line-height: 1.5;
`;
