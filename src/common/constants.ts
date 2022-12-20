import React from "react";

export const CORS_MODE = "cors";
export const HTTP_INCLUDE_CREDENTIALS = "include";

export const DEFAULT_CONTEXT = {
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
};

export const LABEL_TEXT: { [key: string]: string } = {
  client: "Client",
  duration: "Duration",
  description: "Description",
  responsibilities: "Responsibilities",
  softwareTech: "Software/Technologies",
};

export const SHORT_INFOS = ["client", "duration", "softwareTech"];
export const EXPANDABLE_INFOS = ["description", "responsibilities"];
