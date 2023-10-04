import { CONTACT_FORM_STATUS } from "../../common/constants";

export interface IProfileData {
  header: IHeader;
  sections: SectionsType;
  download: DownloadType;
  forms: FormsType;
}

export type FormType = "contactForm";

export interface IFormField {
  id: string;
  name: string;
  label: string;
  placeholder: string;
  subType?: string;
  type: string;
  maxLength: number;
  regex: string;
  messages?: {
    regexError: string;
    fieldError: string;
  };
}

export type MailStatusType = Record<CONTACT_FORM_STATUS, string>;
export interface IFormInfo {
  name: string;
  actionButtonLabel: string;
  submitLabel: string;
  submittingLabel: string;
  icons: MailStatusType;
  statusMessages: MailStatusType;
  messages: {
    mandatoryError: string;
    retry: string;
  };
  fields: IFormField[];
}

export type FormsType = {
  [key in FormType]: IFormInfo;
};
export type SectionsType = {
  [key in ProfileSectionType]: ISectionInfo;
};

export interface IExperienceJsonInfo {
  ref: string;
  name: string;
}

export interface IHeader {
  shortDesc: string;
  name: string;
  currentJobRole: string;
}
export interface ISectionInfo {
  title: string;
  info: InfoType;
  ref?: string;
  icon?: string;
  pdfExportIcon?: string;
}

export interface IResumeExperience {
  title: string;
  info: IResumeOrg[];
}

export interface IResumeOrg {
  organization: string;
  responsibilities: string;
  designation: string;
  duration: string;
  projects: {
    title: string;
    client: string;
    links: string[];
  }[];
}

type DownloadStages = "download" | "downloading" | "downloaded";

export type DownloadType = {
  [key in DownloadStages]: {
    disabled?: boolean;
    message: string;
    icon: string;
  };
} & { type: string; staticFileUrl: string };

export interface IPWA {
  messages: {
    install: string;
    yes: string;
    no: string;
  };
  bannerExpiryTime: number;
}

export type InfoType =
  | string
  | (ISkill | IOrgProject | ILink | IDetailInfo | IExperience | IResumeOrg)[];

export interface ISkill {
  label: string;
  star: number;
}

export type ShortInfosType = "client" | "duration" | "role" | "softwareTech";
export type ExpandableInfosType = "description";
export interface IProjectExperience {
  title: string;
  shortTitle: string;
  client: string;
  duration: string;
  role: string;
  softwareTech: string;
  description: string;
  links: string[];
}
export interface IExperience {
  name: string;
  type: string;
  from: string;
  to?: string;
  designation: string;
  responsibilities: string;
  projects: IProjectExperience[];
}

export interface IDetailInfo extends ISkill {
  info: string;
  canCopy?: boolean;
  icon: string;
  pdfExportIcon: string;
}

export interface ILink {
  icon: string;
  link: string;
  label: string;
  pdfExportIcon: string;
  display?: boolean;
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
  | "experiences"
  | "education"
  | "links";

export type RefTypes =
  | "homeRef"
  | "skillsRef"
  | "experienceRef"
  | "educationRef"
  | "contactRef";

export interface IProfileContext {
  data: IProfileData;
  refs: {
    [key in RefTypes]: React.MutableRefObject<any>;
  };
  currentSection: string;
  isExport?: boolean;
  isDownloading?: boolean;
  isMobile: boolean;
  isInstallBannerOpen: boolean;
  hasDownloadedProfile?: boolean;
  isContactFormOpen: boolean;
  setIsContactFormOpen: Function;
}
