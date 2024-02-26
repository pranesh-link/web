import React, { useContext } from "react";
import { AppContext } from "../store/app/context";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Elements } from "react-profile-component";
import {
  isInstanceOfPageLink,
  isInstanceOfPageLinkCollection,
} from "../common/Utils";
import PageLink from "../components/home/PageLink";

const { FlexBoxSection, FlexBox } = Elements;

export const HomePage = () => {
  const {
    data: {
      appConfig: {
        homepage: { title, pages },
      },
    },
  } = useContext(AppContext);

  const navigate = useNavigate();

  const navigateToRoute = (route: string) => navigate(route);

  return (
    <HomePageWrapper direction="column">
      <FlexBoxSection direction="column">
        <h1 className="homepage-title">{title}</h1>
        {pages.map((item) => {
          let displayNode: JSX.Element = <></>;
          const { id, label } = item;
          if (isInstanceOfPageLink(item)) {
            displayNode = (
              <PageLink
                key={id}
                label={label}
                route={item.route}
                redirectToRoute={navigateToRoute}
              />
            );
          } else if (isInstanceOfPageLinkCollection(item)) {
            displayNode = (
              <React.Fragment key={id}>
                <h3 className="homepage-redirection tools">{label}</h3>
                <FlexBox>
                  {item.links.map((item) => {
                    const { id, label } = item;
                    return (
                      <PageLink
                        key={id}
                        label={label}
                        route={item.route}
                        redirectToRoute={navigateToRoute}
                      />
                    );
                  })}
                </FlexBox>
              </React.Fragment>
            );
          }
          return displayNode;
        })}
      </FlexBoxSection>
    </HomePageWrapper>
  );
};

const HomePageWrapper = styled(FlexBoxSection)`
  height: 100vh;
  background: #faf9f6;
  padding: 50px;
  .shimmer {
    height: 100%;
    width: 100%;
    border-radius: 15px;
    background: linear-gradient(-45deg, #ccc 40%, #faf9f6 50%, #eee 60%);
    background-size: 300%;
    background-position-x: 100%;
    animation: shimmer 2s infinite linear;
  }

  h1 {
    text-align: center;
  }

  .homepage-title {
    flex-basis: 40%;
    color: #3498db;
    font-size: 24px;
  }
  .homepage-construction {
    color: #ffa500;
  }
  .tools {
    color: #3f9c35;
    font-style: italic;
    font-size: 18px;
    margin-left: 10px;
  }
  .page-link {
    font-weight: 600;
    width: fit-content;
    letter-spacing: 0.3px;
    &:hover {
      box-shadow: transparent 0px -1px 0px 0px,
        rgba(240, 240, 240, 0.3) 0px -1px 0px inset,
        rgb(63, 156, 53) 0px 2px 12px;
    }
  }
  @media only screen and (max-width: 767px) {
    padding: 25px;
  }
`;
