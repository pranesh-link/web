import { MouseEventHandler } from "react";
import styled from "styled-components";

export const ActionBtn = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
  outline: none;
`;
export const FlexBox = styled.div<{
  direction?: FLEX_DIRECTION;
  justifyContent?: JUSTIFY_CONTENT;
  alignItems?: string;
  flexWrap?: FLEX_WRAP;
  flexBasis?: string;
}>`
  display: flex;
  flex-direction: ${(props) => props.direction || "row"};
  justify-content: ${(props) => props.justifyContent || "normal"};
  align-items: ${(props) => props.alignItems || "normal"};
  flex-wrap: ${(props) => props.flexWrap || "nowrap"};
  flex-basis: ${(props) => props.flexBasis || "auto"};
`;

export const FlexBoxSection = styled.section<{
  direction?: FLEX_DIRECTION;
  justifyContent?: JUSTIFY_CONTENT;
  alignItems?: string;
  flexWrap?: FLEX_WRAP;
  flexBasis?: string;
}>`
  display: flex;
  flex-direction: ${(props) => props.direction || "row"};
  justify-content: ${(props) => props.justifyContent || "normal"};
  align-items: ${(props) => props.alignItems || "normal"};
  flex-wrap: ${(props) => props.flexWrap || "nowrap"};
  flex-basis: ${(props) => props.flexBasis || "auto"};
  &.short-info {
    padding-left: 10px;
  }
`;

export type FLEX_WRAP =
  | "wrap"
  | "nowrap"
  | "initial"
  | "inherit"
  | "wrap-reverse"
  | "unset";

export type JUSTIFY_CONTENT =
  | "flex-start"
  | "flex-end"
  | "center"
  | "space-between"
  | "space-around"
  | "space-evenly"
  | "normal";

export type ALIGN_ITEMS =
  | "flex-start"
  | "flex-end"
  | "center"
  | "baseline"
  | "stretch"
  | "normal";

export type FLEX_DIRECTION =
  | "row"
  | "row-reverse"
  | "column"
  | "column-reverse";

export const SecHeader = styled.header`
  font-size: 40px;
  font-weight: 300;
  margin-bottom: 20px;
  color: #22a39f;
  text-align: center;
  &.export {
    text-align: unset;
    margin-bottom: 0;
    font-size: 30px;
  }
  &.about-me-title {
    text-align: left;
    @media screen and (max-width: 767px) {
      margin-bottom: 10px;
    }
  }
  @media screen and (max-width: 767px) {
    text-align: left;
    font-size: 28px;
  }
`;

export const Desc = styled.p`
  margin: 0;
  padding-right: 15%;
  @media screen and (max-width: 767px) {
    padding-right: 0;
  }
  &.about {
    padding-left: 0;
  }
  &.education {
    text-align: center;
    padding-right: 0;
    @media screen and (max-width: 767px) {
      text-align: left;
      padding: 0 5px;
    }
  }
  &.export {
    text-align: left;
  }
  strong {
    color: #3e3e3e;
  }
`;

export const SectionsWrapper = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  height: 100%;
  margin-top: 40px;
  padding-bottom: 40px;
  &.export {
    padding-left: 10%;
    margin-top: 0;
  }
  &.hamburger-menu {
    padding-left: 0;
    padding-bottom: 0;
    height: unset;
    .profile-section {
      &.links {
        @media screen and (max-width: 767px) {
          display: flex;
        }
      }
    }
  }
  .profile-section {
    margin-bottom: 20px;
    > header {
      @media screen and (max-width: 767px) {
        margin-bottom: 10px;
      }
    }

    &.links {
      padding: 15px 0;
      background-color: #222222;
      position: fixed;
      bottom: 0;
      width: 100%;
      margin-bottom: 0;
      &.export {
        position: static;
        background-color: transparent;
        @media screen and (max-width: 767px) {
          display: flex;
          position: static;
          padding: 20px 0;
          background-color: transparent;
        }
        .link {
          padding-right: 15px;
        }
      }
      @media screen and (max-width: 767px) {
        display: none;
        position: static;
        padding: 20px 0;
        background-color: transparent;
      }
      .link {
        padding-right: 50px;
        @media screen and (max-width: 767px) {
          margin-bottom: 0;
          padding-right: 15px;
        }
        a {
          padding: 10px 15px;
          text-decoration: none;
          border-radius: 20px;
          background-color: #0c77b9;
          &:hover {
            background-color: #3f9c35;
          }
        }
        img {
          height: 25px;
          &.Github {
            @media screen and (max-width: 767px) {
              height: 28px;
            }
          }
        }
        a,
        span {
          color: #f0f0f0;
        }
        .link-separator {
          &:last-child {
            display: none;
          }
        }
      }
    }

    &.experience {
      &.export {
        background-color: transparent;
        padding-top: 0px;
      }
      ${SecHeader} {
        @media screen and (max-width: 767px) {
          margin-bottom: 10px;
        }
      }
      @media screen and (max-width: 767px) {
        background: none;
      }
    }
    &.about {
      padding-top: 20px;
      @media screen and (max-width: 767px) {
        flex-direction: column;
        justify-content: normal;
        &.export {
          flex-direction: row;
        }
      }
    }
    .image-details-wrap {
      margin-right: 10px;
      align-self: flex-end;
      @media screen and (max-width: 767px) {
        margin-top: 15px;
        align-items: normal;
        align-self: normal;
      }
    }
    .about-me {
      flex-basis: 20%;
      padding-right: 10px;
      &.export {
        flex-basis: 33%;
      }
    }
    .image {
      .image-wrap {
        margin-right: 50px;
        @media screen and (max-width: 767px) {
          margin-right: 20px;
        }
      }
      .profile-image {
        width: 200px;
        height: 200px;
        border-radius: 50%;
        border: 2px solid #dddbca;
        @media screen and (max-width: 767px) {
          width: 125px;
          height: 125px;
        }
      }
    }
    .details {
      min-width: 55%;
      .detail {
        padding-bottom: 5px;
      }
      .detail-info {
        line-height: 2;
        span {
          /* flex-basis: 75%; */
        }
      }
    }
  }
  @media screen and (max-width: 767px) {
    padding-left: 20px;
    margin-top: 0;
  }
`;

interface CloseButtonProps {
  onClose: MouseEventHandler<HTMLButtonElement>;
  icon: string;
  width: string;
}
export const CloseButton = (props: CloseButtonProps) => (
  <i className="material-icons" onClick={props.onClose}>
    <img src={props.icon} alt="Close icon" width={props.width} />
  </i>
);

export const AutoCloseToastMessage = styled.div`
  font-family: Open Sans, sans-serif !important;
  text-align: center;
  font-style: italic;
  letter-spacing: 0.5px;
  color: #3f9c35;
`;

export const PWAWrapper = styled(FlexBox)<{ top?: string; bottom?: string }>`
  position: fixed;
  ${({ top }) =>
    top &&
    `
    top: ${top};
  `}
  ${({ bottom }) =>
    bottom &&
    `
    bottom: ${bottom};
  `}
  background: #8f00ff;
  width: 100%;
  padding: 25px 0;
  p {
    color: #fff;
    font-weight: 600;
    font-size: 1.1em;
  }
  button {
    color: #fff;
    border: none;
    background: none;
    flex-basis: 15%;
    cursor: pointer;
    font-size: 1.2em;
    font-weight: bold;
    &.install {
      background: #fff;
      margin-right: 15px;
      color: #8f00ff;
      padding: 10px 0;
      border-radius: 25px;
      font-size: 1.2em;
    }
    &.not-now {
      color: rgb(170, 187, 187, 0.8);
    }
  }
`;

export const MobilePWAWrapper = styled(PWAWrapper)`
  p {
    font-size: 14px;
    padding: 0 10px;
  }
  button {
    flex-basis: auto !important;
    font-size: 15px !important;
    padding: 10px !important;
  }
`;
