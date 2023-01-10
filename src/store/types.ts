export interface IProfileData {
  header: IHeader;
  sections: SectionsType;
}

export type SectionsType = {
  [key in ProfileSectionType]: ISectionInfo;
};

export interface IHeader {
  shortDesc: string;
  name: string;
}
export interface ISectionInfo {
  title: string;
  info: InfoType;
  ref?: string;
}

export type InfoType =
  | string
  | (ISkill | IOrgProject | ILink | IDetailInfo | IOrganization)[];

export interface ISkill {
  label: string;
  info: string;
}

export interface IOrganization {
  name: string;
  type: string;
  from: string;
  to?: string;
  designation: string;
}

export interface IDetailInfo extends ISkill {
  canCopy?: boolean;
  icon: string;
  pdfExportIcon: string;
}

export interface ILink {
  icon: string;
  link: string;
  label: string;
  pdfExportIcon: string;
  isExportOnly?: boolean;
}

export interface IOrgProject {
  organization: string;
  projects: IProject[];
}

export interface IProject {
  [key: string]: {
    info: string;
    requiresShowHide?: boolean;
  };
}

export type ProfileSectionType =
  | "aboutMe"
  | "details"
  | "skills"
  | "experience"
  | "education"
  | "links"
  | "organizations";

export type RefTypes =
  | "homeRef"
  | "skillsRef"
  | "experienceRef"
  | "educationRef"
  | "contactRef"
  | "orgRef";

export interface IAppContext {
  data: IProfileData;
  refs: {
    [key in RefTypes]: React.MutableRefObject<any>;
  };
  isExport?: boolean;
  isDownloading?: boolean;
  isMobile: boolean;
  isInstallBannerOpen: boolean;
  hasDownloadedProfile?: boolean;
}
