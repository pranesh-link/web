import { Elements } from "react-profile-component";
import { ROUTES } from "../../common/constants";

interface IPageLinkProps {
  label: string;
  route: string;
  redirectToRoute: (route: string) => void;
}

const { ProjectLink } = Elements;
const PageLink = (props: IPageLinkProps) => {
  const { label, route, redirectToRoute } = props;
  return (
    <ProjectLink
      className="page-link"
      onClick={(e) => {
        e.preventDefault();
        redirectToRoute(ROUTES[`ROUTE_${route}`]);
      }}
    >
      {label}
    </ProjectLink>
  );
};

export default PageLink;
