import { IAppConfig, IMaintenance } from "../common/types";
import { IPWA, ISectionInfo } from "../profile/types";

export interface IAppContext {
  data: IAppConfigData;
}

export interface IAppConfigData {
  currentDevice: {
    osName: string;
    browserName: string;
    isMobile: boolean;
  };
  isAdmin: boolean;
  preloadedAssets: string[];
  pwa: IPWA;
  maintenance: IMaintenance;
  links: ISectionInfo;
  messages: IMessages;
  appConfig: IAppConfig;
}

export interface IMessages {
  homepage: {
    title: string;
    underConstruction: string;
    redirection: string;
  };
}
