export interface IProfileData {
  //TODO change to relevant types
  header: {
    shortDesc: string;
    name: string;
  };
  sections: {
    [key in ProfileSectionType]: ISectionInfo;
  };
}

export interface ISectionInfo {
  title: string;
  info: InfoType;
  ref?: string;
}

export type InfoType = string | (ISkill | IProject | ILink | IDetailInfo)[];

export interface ISkill {
  label: string;
  info: string;
}

export interface IDetailInfo extends ISkill {
  canCopy?: boolean;
}

export interface ILink {
  icon: string;
  link: string;
  label: string;
}

export interface IProject {
  [key: string]: {
    info: string;
    requiresShowHide?: boolean;
  };
  // title: string;
  // client: string;
  // duration: string;
  // softwareTech: string;
  // description: string;
  // responsibilities: string;
}

export type ProfileSectionType =
  | "aboutMe"
  | "details"
  | "skills"
  | "experience"
  | "education"
  | "links";
