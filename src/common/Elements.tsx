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

export const SectionsWrapper = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  height: 100%;
  margin-top: 40px;
  padding-bottom: 40px;
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
        margin-bottom: 0px;
      }
    }
    &.links {
      padding: 15px 0;
      background-color: #fff;
      position: fixed;
      bottom: 0;
      width: 100%;
      margin-bottom: 0;
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
      padding-top: 20px;
      background-color: #f3f0de;
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
      }
    }
    .image-details-wrap {
      margin-right: 10px;
    }
    .about-me {
      flex-basis: 20%;
      padding-right: 10px;
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
      flex-basis: 20%;
      .detail-info {
        line-height: 1.5;
        margin-right: 10px;
        span {
          flex-basis: 75%;
        }
      }
    }
  }
  @media screen and (max-width: 767px) {
    padding-left: 20px;
    margin-top: 0;
  }
`;
