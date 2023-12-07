export interface IMaintenance {
  isUnderMaintenance: boolean;
  message: string;
  image: string;
}

export interface IIcon {
  icon: string;
  pdfExportIcon: string;
}
export interface ICommonData {
  icons: {
    star: IIcon;
    starUnfilled: IIcon;
  };
}

export type BasicDataType = "links" | "maintenance" | "pwa";

export type ProfileDataType =
  | "profileSections"
  | "links"
  | "download"
  | "skills";

export interface IConfigDataParams {
  type: string;
  ref: string;
  name: string;
}

export interface IHomePageConfig {
  profileRedirectDelay: number;
}

interface IPWAConfig {
  browsers: string[];
  os: string[];
}

export interface IPreloadSrc {
  id: string;
  type: string;
  fileName: string;
  fileLocation: string;
}
export interface IAppConfig {
  homepage: IHomePageConfig;
  pwa: IPWAConfig;
  preloadSrcList: IPreloadSrc[];
}
export interface IConfigData {
  jsonConfig: {
    defaultConfig: IConfigDataParams[];
    profileConfig: IConfigDataParams[];
  };
  appConfig: IAppConfig;
}
