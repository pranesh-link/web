import React from "react";
import { IAppContext, IPWA } from "../store/profile/types";
import { IMaintenance } from "../store/common/types";

export const CORS_MODE = "cors";
export const DEV_JSON_BASE_URL = "http://localhost:8080";
export const PROD_JSON_BASE_URL = "https://profile-jsons.pranesh.link";
export const TOAST_POSITION = "top-center";
export const PROFILE_PDF_NAME = "Pranesh_Profile";
export const TOAST_ERROR_MESSAGE = [
  "Something went wrong.",
  "Please close this error to reload the page.",
];
export const SHORT_INFOS = ["client", "duration", "role", "softwareTech"];
export const EXPANDABLE_INFOS = ["description", "responsibilities"];
export const COPIED = "copied";
export const NOT_COPIED = "not-copied";
export const COPIED_TEXT = "Copied!";

export const DEFAULT_PWA: IPWA = {
  messages: {
    install: "",
    yes: "",
    no: "",
  },
  bannerExpiryTime: 0,
};

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
      resumeExperiences: {
        title: "",
        info: [],
      },
    },
    download: {
      download: {
        message: "",
        icon: "",
      },
      downloading: {
        message: "",
        icon: "",
      },
      downloaded: {
        message: "",
        icon: "",
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
  commonData: {
    icons: {
      star: { icon: "", pdfExportIcon: "" },
      starUnfilled: { icon: "", pdfExportIcon: "" },
    },
  },
  currentSection: "about",
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

export const SECTIONS = {
  HEADER: "header",
  ABOUT_ME: "aboutMe",
  DETAILS: "details",
  EDUCATION: "education",
  ORGANIZATIONS: "organizations",
  SKILLS: "skills",
  EXPERIENCE: "experiences",
  LINKS: "links",
  DOWNLOAD: "download",
  RESUME_EXPERIENCES: "resume-experiences",
};

export const PAGE_TITLES = {
  profile: "Pranesh",
};

export const DEFAULT_MAINTENANCE_DATA: IMaintenance = {
  isUnderMaintenance: false,
  message: "",
  image: "",
};

export const SECTION_ORDER_DISPLAY: Record<
  string,
  { order: number; display?: boolean }
> = {
  ABOUTME: { order: 1 },
  EDUCATION: { order: 4 },
  ORGANIZATIONS: { order: 3, display: false },
  SKILLS: { order: 2 },
  EXPERIENCE: { order: 5 },
  CONTACT: { order: 6 },
};

export const LABELS = {
  PROJECTS: "Projects",
  CLIENTS: "Clients",
  RESPONSIBILITIES: "Responsibilities",
  CLIENT: "Client",
};

export const EXPERIENCE_TYPES = {
  CURRENT: "Current",
  PREVIOUS: "Previous",
};
