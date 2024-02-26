import { useContext, useMemo } from "react";
import styled from "styled-components";
import { AppContext } from "../../store/app/context";
import { Elements } from "react-profile-component";
import { ROUTES } from "../../common/constants";
import RedirectLink from "../../components/common/RedirectLink";

const { FlexBox } = Elements;

const NotFoundPage = () => {
  const {
    data: {
      appConfig: {
        notFoundPage: { title },
        labels,
      },
    },
  } = useContext(AppContext);

  const showContent = useMemo(() => title, [title]);
  return showContent ? (
    <NotFoundPageWrapper direction="column" alignItems="center">
      <NotFoundTitle dangerouslySetInnerHTML={{ __html: title }} />
      <RedirectLink route={ROUTES.ROUTE_HOME} label={labels.goToHomePage} />
    </NotFoundPageWrapper>
  ) : null;
};

export default NotFoundPage;

const NotFoundPageWrapper = styled(FlexBox)`
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0;
  background: #faf6f9;
`;

const NotFoundTitle = styled.div`
  margin: 0 auto;
  margin-top: 50px;
  text-align: center;
`;
