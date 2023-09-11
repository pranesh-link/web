import { useContext, useEffect } from "react";
import { AppContext } from "../store/app/context";
import { FlexBoxSection } from "../common/Elements";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

export const HomePage = () => {
  const {
    data: {
      messages: { homepage: messages },
    },
  } = useContext(AppContext);

  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => navigate("/profile"), 2000);
  }, [navigate]);
  return (
    <HomePageWrapper
      direction="column"
      alignItems="center"
      justifyContent="space-around"
    >
      <FlexBoxSection direction="column">
        <h1 className="homepage-title">{messages.title}</h1>
        <h3 className="homepage-construction">{messages.underConstruction}</h3>
        <h3 className="homepage-redirection">{messages.redirection}</h3>
      </FlexBoxSection>
    </HomePageWrapper>
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
