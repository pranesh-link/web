import styled from "styled-components";

export const FlexBox = styled.div<{
  direction?: FLEX_DIRECTION;
  justifyContent?: JUSTIFY_CONTENT;
  alignItems?: string;
  flexWrap?: FLEX_WRAP;
}>`
  display: flex;
  flex-direction: ${(props) => props.direction || "row"};
  justify-content: ${(props) => props.justifyContent || "normal"};
  align-items: ${(props) => props.alignItems || "normal"};
  flex-wrap: ${(props) => props.flexWrap || "nowrap"};
`;

export const FlexBoxSection = styled.section<{
  direction?: FLEX_DIRECTION;
  justifyContent?: JUSTIFY_CONTENT;
  alignItems?: string;
  flexWrap?: FLEX_WRAP;
}>`
  display: flex;
  flex-direction: ${(props) => props.direction || "row"};
  justify-content: ${(props) => props.justifyContent || "normal"};
  align-items: ${(props) => props.alignItems || "normal"};
  flex-wrap: ${(props) => props.flexWrap || "nowrap"};
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
  | "space-evenly";

export type ALIGN_ITEMS =
  | "flex-start"
  | "flex-end"
  | "center"
  | "baseline"
  | "stretch";

export type FLEX_DIRECTION =
  | "row"
  | "row-reverse"
  | "column"
  | "column-reverse";

export const SecHeader = styled.header`
  font-size: 54px;
  font-weight: 300;
  margin-bottom: 20px;
  color: #22a39f;
  text-align: center;
  &.about-me-title {
    text-align: left;
    font-size: 28px;
    @media screen and (max-width: 767px) {
      margin-bottom: 0;
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
  strong {
    color: #3e3e3e;
  }
`;
