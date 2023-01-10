import { ISectionInfo } from "../types";
import LocationImg from "../../assets/location-icon.svg";
import MobileImg from "../../assets/mobile-icon.svg";
import MailImg from "../../assets/mail-icon.svg";

const Details: ISectionInfo = {
  title: "Details",
  info: [
    {
      label: "location",
      info: "Bengaluru, India",
      icon: LocationImg,
    },
    {
      label: "mobile",
      info: "+91-9443329991",
      canCopy: true,
      icon: MobileImg,
    },
    {
      label: "e-mail",
      info: "prans1991@gmail.com",
      canCopy: true,
      icon: MailImg,
    },
  ],
};

export default Details;
