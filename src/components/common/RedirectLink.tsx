import { Link } from "react-router-dom";
import styled from "styled-components";

interface IRedirectLinkProps {
  route: string;
  label: string;
}
const RedirectLink = (props: IRedirectLinkProps) => {
  const { route, label } = props;
  return <RedirectButton to={route}>{label}</RedirectButton>;
};

export default RedirectLink;

const RedirectButton = styled(Link)`
  text-decoration: none;
  padding: 10px 20px;
  background: #3f9635;
  color: #fff;
  letter-spacing: 0.3px;
  font-weight: 600;
  border-radius: 5px;
  &:hover {
    background: #027148;
  }
`;
