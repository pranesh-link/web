import React from "react";
import {
  ExpandableInfosType,
  IProfileContext,
  IPWA,
  ShortInfosType,
} from "../store/profile/types";
import { IMaintenance } from "../store/common/types";
import { IAppContext } from "../store/app/types";

export const CORS_MODE = "cors";
export const DEV_JSON_BASE_URL = "http://localhost:7373";
export const PROD_JSON_BASE_URL = "https://profile-jsons.pranesh.link";
export const TOAST_POSITION = "top-center";
export const PROFILE_PDF_NAME = "Pranesh_Profile";
export const MESSAGES = {
  genericError: "Something went wrong!",
};
export const PROD_WEB_URL = "https://pranesh.link/profile";
export const LOCAL_DEV_URL = "http://localhost:3000";

export const SHORT_INFOS: ShortInfosType[] = [
  "client",
  "duration",
  "role",
  "softwareTech",
];
export const EXPANDABLE_INFOS: ExpandableInfosType[] = ["description"];
export const COPIED = "copied";
export const NOT_COPIED = "not-copied";
export const COPIED_TEXT = "Copied!";

export const DEFAULT_PWA: IPWA = {
  messages: {
    install: "",
    yes: "",
    no: "",
    open: "",
    relatedApp: "",
  },
  bannerExpiryTime: 0,
};

export const DEFAULT_MAINTENANCE_DATA: IMaintenance = {
  isUnderMaintenance: false,
  message: "",
  image: "",
};

export const DEFAULT_PROFILE_CONTEXT: IProfileContext = {
  data: {
    header: {
      shortDesc: "",
      name: "",
      currentJobRole: "",
    },
    forms: {
      contactForm: {
        actionButtonLabel: "",
        submitLabel: "",
        submittingLabel: "",
        statusMessages: {
          success: "",
          error: "",
          form_fill: "",
          sending: "",
          offline: "",
        },
        messages: {
          retry: "",
          mandatoryError: "",
        },
        name: "",
        fields: [],
      },
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
      experiences: {
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
    download: {
      type: "",
      staticFileUrl: "",
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
  },
  currentSection: "about",
  isExport: false,
  isDownloading: false,
  isMobile: false,
  isInstallBannerOpen: false,
  hasDownloadedProfile: false,
  isContactFormOpen: false,
  setIsContactFormOpen: () => {},
};

export const DEFAULT_APP_CONTEXT: IAppContext = {
  data: {
    currentDevice: {
      osName: "Android",
      browserName: "Chrome",
      isMobile: false,
    },
    version: "1.0.0",
    isAdmin: false,
    preloadedAssets: [],
    messages: {
      homepage: {
        title: "",
        underConstruction: "",
        redirection: "",
      },
    },
    links: DEFAULT_PROFILE_CONTEXT.data.sections.links,
    pwa: DEFAULT_PWA,
    maintenance: DEFAULT_MAINTENANCE_DATA,
    appConfig: {
      homepage: {
        profileRedirectDelay: 3,
      },
      pwa: {
        browsers: [],
        os: [],
      },
    },
  },
};

export const LABEL_TEXT: Record<string, string> = {
  client: "Client",
  duration: "Duration",
  description: "Description",
  responsibilities: "Responsibilities",
  softwareTech: "Software/Technologies",
  role: "Role",
  retry: "Retry",
  close: "Close",
};

export const SECTIONS = {
  COMBINED: "profile-sections",
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

export const FORMS = {
  CONTACT_FORM: "contact-form",
};

export const PAGE_TITLES = {
  profile: "Pranesh",
};

export const SECTION_ORDER_DISPLAY: Record<
  string,
  { order: number; display?: boolean }
> = {
  ABOUTME: { order: 1 },
  EDUCATION: { order: 4 },
  ORGANIZATIONS: { order: 3, display: false },
  SKILLS: { order: 2 },
  EXPERIENCES: { order: 5 },
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

export const FIELD_TYPES = {
  TEXT: "text",
  MOBILE: "mobile",
  TEXTAREA: "textarea",
};

export const FIELD_SUB_TYPES = {
  EMAIL: "email",
};

export enum CONTACT_FORM_STATUS {
  FORM_FILL = "form_fill",
  SENDING = "sending",
  SUCCESS = "success",
  ERROR = "error",
  OFFLINE = "offline",
}

export const EMAILJS_CONFIG = {
  SERVICE_ID: "service_h7f2fbh",
  TEMPLATE_ID: "template_ccivvus",
  PUBLIC_KEY: "YM2FkZ24YRF2W_Vgl",
};

export const DEFAULT_PROFILE_CONFIG_DATA = {
  profileSections: {
    header: DEFAULT_PROFILE_CONTEXT.data.header,
    aboutMe: DEFAULT_PROFILE_CONTEXT.data.sections.aboutMe,
    education: DEFAULT_PROFILE_CONTEXT.data.sections.education,
    details: DEFAULT_PROFILE_CONTEXT.data.sections.details,
    experiences: DEFAULT_PROFILE_CONTEXT.data.sections.experiences,
  },
  links: DEFAULT_PROFILE_CONTEXT.data.sections.links,
  download: DEFAULT_PROFILE_CONTEXT.data.download,
  skills: DEFAULT_PROFILE_CONTEXT.data.sections.skills,
  contactForm: DEFAULT_PROFILE_CONTEXT.data.forms.contactForm,
};

export const CONFIG_REF_INFO = {
  ref: "config.json",
  name: "config",
};

export const ROUTES = {
  ROUTE_PROFILE: "/profile",
  ROUTE_MAINTENANCE: "/maintenance",
};

export const CONFIG_TYPES = {
  APPCONFIG: "appConfig",
  PROFILECONFIG: "profileConfig",
};
