import { IAppContext } from "../store/app/types";
import {
  Constants,
  Environment,
  ICMSServerConfig,
  IWebServerConfig,
} from "react-profile-component";
import { IMaintenance } from "../store/common/types";

const { DEFAULT_PROFILE_CONTEXT, DEFAULT_PWA } = Constants;

export const ENVIRONMENT: Environment = process.env.NODE_ENV;
export const ROUTES: Record<string, string> = {
  ROUTE_HOME: "/",
  ROUTE_PROFILE: "/profile",
  ROUTE_MAINTENANCE: "/maintenance",
  ROUTE_BMICALCULATOR: "/bmi-calculator",
};

export const PAGE_TITLES = {
  profile: "Pranesh | Lead UI Engineer",
  bmiCalculator: "BMI Calculator",
};

export const DEFAULT_MAINTENANCE_DATA: IMaintenance = {
  isUnderMaintenance: false,
  message: "",
  image: "",
};

export const DEFAULT_APP_CONTEXT: IAppContext = {
  data: {
    bmiCalculatorForm: {
      name: "bmi-calculator",
      header: "",
      fields: [],
      key: "",
      actionButtonLabel: "",
      defaultMaxLength: 3,
      label: {},
      messages: { mandatoryError: "", retry: "" },
      statusMessages: {
        error: "",
        form_fill: "",
        offline: "",
        review: "",
        sending: "",
        success: "",
      },
      permissibleHeights: {
        min: 50,
        max: 350,
      },
      permissibleWeights: {
        min: 2,
        max: 700,
      },
      bmiRanges: [
        {
          id: "underWeight",
          max: 18.5,
          label: "Underweight",
          prefixedPercentile: 0,
          color: "#3498db",
        },
      ],
      transformFields: [],
    },
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
      notFoundPage: {
        title: "",
      },
      labels: {},
      homepage: {
        title: "",
        profileRedirectDelay: 3,
        pages: [],
      },
      pwa: {
        browsers: [],
        os: [],
      },
      preloadSrcList: [],
    },
  },
};

export const DEV_CMS_URL = "http://localhost:7373";
export const PROD_CMS_URL = "https://profile-jsons.pranesh.link";
export const PROD_WEB_URL = "https://pranesh.link/profile";
export const DEV_WEB_URL = "http://localhost:3000";
export const EMAILJS_CONFIG = {
  SERVICE_ID: "U2FsdGVkX1+/Ekcp8WIEIevCcut8R0pL2cDmNPDFEQg=",
  TEMPLATE_ID:
    "U2FsdGVkX1+WVTFxJh0xy9cHz88fqnR1GURfEw0qLwV60o1uRo6hB12u8pNe5ody",
  PUBLIC_KEY:
    "U2FsdGVkX1/M46+97vn9sj2D3LbKO9dKmwqIO+Zh21fONTOa8xN+aMKg0/zeLgj6",
};

export const CMS_SERVER_CONFIG: ICMSServerConfig = {
  devCMSUrl: DEV_CMS_URL,
  prodCMSUrl: PROD_CMS_URL,
};

export const WEB_SERVER_CONFIG: IWebServerConfig = {
  devWebUrl: DEV_WEB_URL,
  prodWebUrl: PROD_WEB_URL,
};

export const DEFAULT_BMI_CALCULATOR_FORM_DATA = {
  heightInCm: "",
  weightInKg: "",
};

export const DEFAULT_BMI_CALCULATOR_FORM_ERROR =
  DEFAULT_BMI_CALCULATOR_FORM_DATA;
