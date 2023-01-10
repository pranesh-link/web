import classNames from "classnames";
import { FlexBox, FlexBoxSection, Grid } from "../../common/Elements";
import {
  getHref,
  getIconUrl,
  lowercase,
  valueIsArray,
  valueIsDetailInfo,
} from "../Utils";
import { AppContext } from "../../context";
import { IDetailInfo, ISectionInfo } from "../../store/types";
import { useContext } from "react";
import styled from "styled-components";
import * as clipboard from "clipboard-polyfill/text";
import CopyIcon from "../../assets/copy-icon.svg";

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

  const getDetailIcon = (detail: IDetailInfo, index: number) => (
    <img
      key={index}
      alt={detail.label}
      className={classNames("detail-icon", detail.label)}
      src={getIconUrl(detail.icon)}
    />
  );

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
      <span id={lowercase(detail.label)}>{detail.info}</span>
      {getCopyButton(detail)}
    </Grid>
  );

  const getDesktopDetails = (details: ISectionInfo) => {
    return valueIsArray(details.info) && valueIsDetailInfo(details.info) ? (
      <DetailSection className="details">
        <FlexBoxSection direction="column" justifyContent="space-between">
          {details.info.map((detail, index) => (
            <>{getDetailIcon(detail, index)}</>
          ))}
        </FlexBoxSection>
        <FlexBoxSection direction="column">
          {details.info.map((detail, index) => (
            <>{getGridDetailInfo(detail, index)}</>
          ))}
        </FlexBoxSection>
      </DetailSection>
    ) : null;
  };

  const getMobileDetails = (details: ISectionInfo) => {
    return valueIsArray(details.info) && valueIsDetailInfo(details.info) ? (
      <DetailSection className="details" direction="column">
        {details.info.map((detail, index) => (
          <FlexBox direction="column" className="mobile-detail">
            <FlexBox>
              {getDetailIcon(detail, index)}
              {getCopyButton(detail)}
            </FlexBox>
            {detail.canCopy ? (
              <a href={getHref(lowercase(detail.label), detail.info)}>
                {detail.info}
              </a>
            ) : (
              <span id={lowercase(detail.label)}>{detail.info}</span>
            )}
          </FlexBox>
        ))}
      </DetailSection>
    ) : null;
  };

  return isMobile ? getMobileDetails(details) : getDesktopDetails(details);
};

const DetailSection = styled(FlexBoxSection)`
  cursor: pointer;
  line-height: 1.5;
  .detail-icon {
    height: 25px;
    min-width: 50px;
    margin: 10px 0;
    @media screen and (max-width: 767px) {
      min-width: unset;
      margin: 0;
    }
  }
  .mobile-detail {
    margin-bottom: 7px;
  }
  .detail-info {
    padding: 7px 0;
  }
`;

const CopyButton = styled.button`
  border: none;
  /* background-color: #434242; */
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
