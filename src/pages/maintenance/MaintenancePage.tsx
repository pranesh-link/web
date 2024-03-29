import styled from "styled-components";
import { IMaintenance } from "../../store/common/types";
import { useContext, useEffect, useRef } from "react";
import { Utils, ISectionInfo, Contact } from "react-profile-component";
import { CMS_SERVER_CONFIG, ENVIRONMENT, ROUTES } from "../../common/constants";
import { AppContext } from "../../store/app/context";
import { useNavigate } from "react-router-dom";

const { getIconUrl } = Utils;
interface IMaintenanceProps {
  maintenance: IMaintenance;
  links: ISectionInfo;
  isMobile: boolean;
}
const MaintenancePage = (props: IMaintenanceProps) => {
  const { maintenance, links, isMobile } = props;
  const {
    data: {
      maintenance: { isUnderMaintenance },
    },
  } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isUnderMaintenance) {
      navigate(ROUTES.ROUTE_PROFILE);
    }
  }, [isUnderMaintenance, navigate]);
  return (
    <MaintenanceArticle isMobile={isMobile}>
      <div className="maintenance-info">
        <img
          className="maintenance-image"
          alt="maintenance"
          src={getIconUrl(maintenance.image, ENVIRONMENT, CMS_SERVER_CONFIG)}
        />
        <h1 dangerouslySetInnerHTML={{ __html: maintenance.message }} />
      </div>
      <div className="contact-links">
        <Contact links={links} refObj={useRef(null)} />
      </div>
    </MaintenanceArticle>
  );
};

const MaintenanceArticle = styled.article<{ isMobile: boolean }>`
  display: block;
  height: 100vh;
  overflow: hidden;
  padding: 0;
  background: #d6433b;
  color: #fff;

  .maintenance-image {
    height: ${(props) => (props.isMobile ? "300px" : "400px")};
  }

  .contact-links {
    position: fixed;
    margin: 0 auto;
    width: 100%;
    bottom: 0px;
    padding: 20px 0;
    background: rgb(34, 34, 34);
    .links {
      justify-content: space-evenly;
    }
    img {
      height: 30px;
      margin-right: ${(props) => (props.isMobile ? "0" : "50px")};
    }
  }

  .maintenance-info {
    margin: 0 auto;
    padding: 50px;
    text-align: center;
  }

  p {
    font-size: 20px;
  }

  h1 {
    font-size: ${(props) => (props.isMobile ? "30px" : "50px")};
    font-weight: 100;
    text-align: center;
  }
`;

export default MaintenancePage;
