import { IFormInfo, IPreloadSrc } from "react-profile-component";
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

export interface IPageLinkCollection {
  id: string;
  label: string;
  links: IPageLink[];
}
export interface IPageLink {
  id: string;
  label: string;
  route: string;
}

export interface IHomePageConfig {
  title: string;
  profileRedirectDelay: number;
  pages: (IPageLink | IPageLinkCollection)[];
}

interface IPWAConfig {
  browsers: string[];
  os: string[];
}

interface INotFoundPageConfig {
  title: string;
}
export interface IAppConfig {
  homepage: IHomePageConfig;
  notFoundPage: INotFoundPageConfig;
  labels: Record<string, string>;
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

export type BMICalculatorFields = "heightInCm" | "weightInKg";

export type BMICalculatorFormData = {
  [key in BMICalculatorFields]: string;
};

type BMIRangeLabels =
  | "underWeight"
  | "healthyWeight"
  | "overWeight"
  | "obese"
  | "severeObese";

export interface IBMIRange {
  id: BMIRangeLabels;
  min?: number;
  max?: number;
  label: string;
  prefixedPercentile: number;
  isHealthyRange?: boolean;
  color: string;
}

export interface IMinMax {
  min: number;
  max: number;
}
export interface IBMICalculatorFormInfo extends IFormInfo {
  bmiRanges: IBMIRange[];
  permissibleHeights: IMinMax;
  permissibleWeights: IMinMax;
}

export interface IWeightSuggestConfig {
  weightDirection: string;
  diffToIdealWeight: number;
  idealWeightRanges: IMinMax;
}
