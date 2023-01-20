import React from "react";
import { IAppContext } from "../store/profile/types";

export const CORS_MODE = "cors";
export const DEV_JSON_BASE_URL = "http://localhost:8080";
export const PROD_JSON_BASE_URL = "https://profile-jsons.pranesh.link";
export const TOAST_POSITION = "top-center";
export const IS_MOBILE =
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );

export const DEFAULT_CONTEXT: IAppContext = {
  data: {
    header: {
      shortDesc: "",
      name: "",
    },
    sections: {
      aboutMe: {
        title: "",
        info: "",
      },
      details: {
        title: "",
        info: "",
      },
      skills: {
        title: "",
        info: "",
      },
      organizations: {
        title: "",
        info: "",
      },
      experience: {
        title: "",
        info: "",
      },
      education: {
        title: "",
        info: "",
      },
      links: {
        title: "",
        info: "",
      },
    },
  },
  refs: {
    homeRef: React.createRef(),
    skillsRef: React.createRef(),
    experienceRef: React.createRef(),
    educationRef: React.createRef(),
    contactRef: React.createRef(),
    orgRef: React.createRef(),
  },
  isExport: false,
  isDownloading: false,
  isMobile: false,
  isInstallBannerOpen: false,
  hasDownloadedProfile: false,
};

export const LABEL_TEXT: { [key: string]: string } = {
  client: "Client",
  duration: "Duration",
  description: "Description",
  responsibilities: "Responsibilities",
  softwareTech: "Software/Technologies",
  role: "Role",
};

export const SHORT_INFOS = ["client", "duration", "role", "softwareTech"];
export const EXPANDABLE_INFOS = ["description", "responsibilities"];
export const SECTIONS = {
  HEADER: "header",
  ABOUT_ME: "aboutMe",
  DETAILS: "details",
  EDUCATION: "education",
  ORGANIZATIONS: "organizations",
  SKILLS: "skills",
  EXPERIENCE: "experiences",
  LINKS: "links",
};
export const PROFILE_PDF_NAME = "Pranesh_Profile";
export const TOAST_ERROR_MESSAGE = [
  "Something went wrong.",
  "Please close this error to reload the page.",
];
export const PWA_INSTALL_MESSAGE =
  "Installing almost uses no storage and provides a quick way to return to this app.";
export const PWA_INSTALL = "Install";
export const PWA_NOT_NOW = "Not now";
export const PWA_HIDE_BANNER_EXPIRY = 86400;
