import { useContext, useEffect, useMemo } from "react";
import { AppContext } from "../store/app/context";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../common/constants";
import LoaderIcon from "../assets/loader-icon.svg";
import { Utils, Elements } from "react-profile-component";

const { getLocalStorage } = Utils;
const { FlexBoxSection, LoaderImg } = Elements;

export const HomePage = () => {
  const {
    data: {
      currentDevice: { isMobile },
      messages: { homepage: messages },
      appConfig: {
        homepage: { profileRedirectDelay },
      },
    },
  } = useContext(AppContext);

  const navigate = useNavigate();

  const hasPWAInstalled = useMemo(() => getLocalStorage("hasPWAInstalled"), []);

  useEffect(() => {
    if (hasPWAInstalled) {
      navigate(ROUTES.ROUTE_PROFILE);
    } else {
      setTimeout(
        () => navigate(ROUTES.ROUTE_PROFILE),
        profileRedirectDelay * 1000,
      );
    }
  }, [navigate, profileRedirectDelay, hasPWAInstalled]);
  return (
    <>
      {hasPWAInstalled ? (
        <LoaderImg isMobile={isMobile} src={LoaderIcon} />
      ) : (
        <HomePageWrapper
          direction="column"
          alignItems="center"
          justifyContent="space-around"
        >
          <FlexBoxSection direction="column">
            <h1 className="homepage-title">{messages.title}</h1>
            <h3 className="homepage-construction">
              {messages.underConstruction}
            </h3>
            <h3 className="homepage-redirection">{messages.redirection}</h3>
          </FlexBoxSection>
        </HomePageWrapper>
      )}
    </>
  );
};

const HomePageWrapper = styled(FlexBoxSection)`
  height: 100vh;
  background: #f0f0f0;
  h1,
  h3 {
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
  .homepage-redirection {
    color: #3f9c35;
    font-style: italic;
  }
`;
