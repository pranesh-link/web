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

export interface IHomePageConfig {
  profileRedirectDelay: number;
}

interface IPWAConfig {
  browsers: string[];
  os: string[];
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
