import styled from "styled-components";
import { IMaintenance } from "../../store/common/types";
import { Contact } from "../../components/profile/Sections/Contact";
import { ISectionInfo } from "../../store/profile/types";
import { useRef } from "react";
import { IS_MOBILE } from "../../common/constants";
import { getIconUrl } from "../../common/Utils";

interface IMaintenanceProps {
  maintenance: IMaintenance;
  links: ISectionInfo;
}
export const MaintenancePage = (props: IMaintenanceProps) => {
  const { maintenance, links } = props;
  return (
    <MaintenanceArticle isMobile={IS_MOBILE}>
      <div className="maintenance-info">
        <img
          className="maintenance-image"
          alt="maintenance"
          src={getIconUrl(maintenance.image)}
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
      justify-content: ${(props) =>
        props.isMobile ? "space-evenly" : "center"};
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
