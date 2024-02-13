import { IPWA, IPreloadSrc, ISectionInfo } from "react-profile-component";
import {
  IAppConfig,
  IBMICalculatorFormInfo,
  IMaintenance,
} from "../common/types";

export interface IAppContext {
  data: IAppConfigData;
}

export interface IAppConfigData {
  currentDevice: {
    osName: string;
    browserName: string;
    isMobile: boolean;
  };
  version: string;
  isAdmin: boolean;
  preloadedAssets: { id: string; image: string }[];
  preloadedFiles: { id: string; file: string }[];
  preloadSrcList: IPreloadSrc[];
  pwa: IPWA;
  maintenance: IMaintenance;
  links: ISectionInfo;
  messages: IMessages;
  appConfig: IAppConfig;
  bmiCalculatorForm: IBMICalculatorFormInfo;
}

export interface IMessages {
  homepage: {
    title: string;
    underConstruction: string;
    redirection: string;
  };
}
