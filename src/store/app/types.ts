import { IMaintenance } from "../common/types";
import { IPWA, ISectionInfo } from "../profile/types";

export interface IAppContext {
  data: IAppConfigData;
}

export interface IAppConfigData {
  pwa: IPWA;
  maintenance: IMaintenance;
  links: ISectionInfo;
  messages: IMessages;
}

export interface IMessages {
  homepage: {
    title: string;
    underConstruction: string;
    redirection: string;
  };
}
