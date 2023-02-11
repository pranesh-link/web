import classNames from "classnames";
import { FlexBox, FlexBoxSection, Grid } from "../../../common/Elements";
import {
  getHref,
  getIconUrlByExportFlag,
  lowercase,
  valueIsArray,
  valueIsDetailInfo,
} from "../../../common/Utils";
import { AppContext } from "../../../store/profile/context";
import { IDetailInfo, ISectionInfo } from "../../../store/profile/types";
import { useContext } from "react";
import styled from "styled-components";
import * as clipboard from "clipboard-polyfill/text";
import CopyIcon from "../../../assets/copy-icon.svg";

interface AboutMeDetailsProps {
  details: ISectionInfo;
  showCopy: boolean;
  copyInfoId: string;
  copied: boolean;
  setShowCopy: (showCopy: boolean) => void;
  setCopyInfoId: (copyInfoId: string) => void;
  setCopied: (copied: boolean) => void;
}
export const AboutMeDetails = (props: AboutMeDetailsProps) => {
  const { isMobile, isExport } = useContext(AppContext);
  const {
    details,
    showCopy,
    copyInfoId,
    copied,
    setShowCopy,
    setCopyInfoId,
    setCopied,
  } = props;

  const getCopyButton = (detail: IDetailInfo) => (
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
        hide: !(
          !isExport &&
          detail.canCopy &&
          showCopy &&
          copyInfoId === detail.label
        ),
        mobile: !isExport && isMobile && detail.canCopy,
        copied: copied && copyInfoId === detail.label,
      })}
    >
      {copied && copyInfoId === detail.label ? (
        "Copied!"
      ) : (
        <img alt="" src={CopyIcon} />
      )}
    </CopyButton>
  );

  const getGridDetailInfo = (detail: IDetailInfo, index: number) => (
    <>
      {(isMobile || isExport) && detail.canCopy ? (
        <a href={getHref(lowercase(detail.label), detail.info)}>
          {detail.info}
        </a>
      ) : (
        <span className="detail-info-text" id={lowercase(detail.label)}>
          <b>{detail.info}</b>
        </span>
      )}
      {getCopyButton(detail)}
    </>
  );

  const getDesktopDetails = (details: ISectionInfo) => {
    return valueIsArray(details.info) && valueIsDetailInfo(details.info) ? (
      <DetailSection
        className="details"
        isMobile={isMobile}
        isExport={isExport}
      >
        {!isExport && (
          <FlexBoxSection direction="column" justifyContent="space-between">
            {details.info.map((detail, index) => (
              <img
                crossOrigin="anonymous"
                key={index}
                alt={detail.label}
                className={classNames("detail-icon", detail.label, {
                  export: isExport,
                })}
                src={getIconUrlByExportFlag(
                  detail.icon,
                  detail.pdfExportIcon,
                  isExport
                )}
              />
            ))}
          </FlexBoxSection>
        )}
        <FlexBoxSection direction="column">
          {details.info.map((detail, index) => (
            <Grid
              gridTemplateColumns="1fr 1fr"
              className="detail-info"
              key={index}
              onMouseEnter={() => {
                setCopyInfoId(detail.label);
                setShowCopy(true);
              }}
              onMouseLeave={() => {
                setCopyInfoId("");
                setShowCopy(false);
              }}
            >
              {getGridDetailInfo(detail, index)}
            </Grid>
          ))}
        </FlexBoxSection>
      </DetailSection>
    ) : null;
  };

  const getMobileDetails = (details: ISectionInfo) => {
    return valueIsArray(details.info) && valueIsDetailInfo(details.info) ? (
      <DetailSection
        className="details"
        direction="column"
        isMobile={isMobile}
        isExport={isExport}
      >
        {details.info.map((detail, index) => (
          <FlexBox key={index} direction="column" className="mobile-detail">
            <Grid
              gridTemplateColumns="1fr 1fr"
              className="detail-info"
              key={index}
              onMouseEnter={() => {
                setCopyInfoId(detail.label);
                setShowCopy(true);
              }}
              onMouseLeave={() => {
                setCopyInfoId("");
                setShowCopy(false);
              }}
            >
              {getGridDetailInfo(detail, index)}
            </Grid>
          </FlexBox>
        ))}
      </DetailSection>
    ) : null;
  };

  let displayDetails = getDesktopDetails(details);

  if (isMobile && !isExport) {
    displayDetails = getMobileDetails(details);
  }
  return displayDetails;
};

const DetailSection = styled(FlexBoxSection)<{
  isMobile: boolean;
  isExport?: boolean;
}>`
  cursor: pointer;
  line-height: 1.5;
  .detail-icon {
    height: 25px;
    min-width: ${(props) =>
      props.isMobile && !props.isExport ? "unset" : "50px"};
    margin: ${(props) => (props.isMobile && !props.isExport ? "0" : "10px 0")};
    &.export {
      min-width: 0;
      width: 25px;
      margin-right: 10px;
    }
  }
  .mobile-detail {
    margin-bottom: 7px;
  }
  .detail-info {
    padding: 7px 0;
  }
  .detail-info-text {
    cursor: auto;
  }
`;

const CopyButton = styled.button`
  border: none;
  color: #f0f0f0;
  cursor: pointer;
  outline: none;
  border-radius: 15px;
  padding: 3px 7px;
  font-size: 10px;
  margin-left: 10px;
  max-width: 50px;
  img {
    width: 20px;
    height: 20px;
  }
  &.hide {
    visibility: hidden;
  }
  &.mobile {
    visibility: visible;
    img {
      width: 15px;
      height: 15px;
    }
  }
  &.copied {
    background-color: #3f9c35;
  }
`;
