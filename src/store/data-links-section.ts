import LinkedInImg from "../assets/logos/linkedin-logo.svg";
import FacebookImg from "../assets/logos/facebook-logo.svg";
import TwitterImg from "../assets/logos/twitter-logo.svg";
import GithubImg from "../assets/logos/github-logo.png";
import { ISectionInfo } from "./types";

const Links: ISectionInfo = {
  title: "Links",
  info: [
    {
      label: "Github",
      link: "https://github.com/prans1991/",
      icon: GithubImg,
    },
    {
      label: "LinkedIn",
      link: "https://www.linkedin.com/in/pranesh-g/",
      icon: LinkedInImg,
    },

    {
      label: "Facebook",
      link: "https://www.facebook.com/anonymousOffl/",
      icon: FacebookImg,
    },
    {
      label: "Twitter",
      link: "https://twitter.com/anonymous_offl",
      icon: TwitterImg,
    },
  ],
};

export default Links;
