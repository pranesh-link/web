import { IAppContext } from "../store/app/types";
import { Constants } from "react-profile-component";
import { IMaintenance } from "../store/common/types";

const { DEFAULT_PROFILE_CONTEXT, DEFAULT_PWA } = Constants;

export const ENVIRONMENT = process.env.NODE_ENV;
export const ROUTES = {
  ROUTE_PROFILE: "/profile",
  ROUTE_MAINTENANCE: "/maintenance",
};

export const DEFAULT_MAINTENANCE_DATA: IMaintenance = {
  isUnderMaintenance: false,
  message: "",
  image: "",
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
    preloadedFiles: [],
    preloadSrcList: [],
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
      preloadSrcList: [],
    },
  },
};
