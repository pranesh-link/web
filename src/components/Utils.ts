import {
  IDetailInfo,
  ILink,
  InfoType,
  IOrganization,
  IOrgProject,
  ISkill,
} from "../store/types";

export const valueIsString = (item: InfoType): item is string => {
  return typeof item === "string";
};

export const valueIsArray = (item: InfoType): item is any[] => {
  return Array.isArray(item);
};

export const valueIsOrgProjectInfo = (
  item: InfoType
): item is IOrgProject[] => {
  return (item as IOrgProject[])[0].organization !== undefined;
};

export const valueIsSkillInfo = (item: InfoType): item is ISkill[] => {
  return (item as ISkill[])[0].label !== undefined;
};

export const valueIsDetailInfo = (item: InfoType): item is IDetailInfo[] => {
  return (item as IDetailInfo[])[0].label !== undefined;
};

export const valueIsLinkInfo = (item: InfoType): item is ILink[] => {
  return (item as ILink[])[0].icon !== undefined;
};

export const valueIsOrgInfo = (item: InfoType): item is IOrganization[] => {
  return (item as IOrganization[])[0].name !== undefined;
};
export const lowercase = (str: string) => str.toLowerCase().replace(/ /g, "");

export const getHref = (label: string, info: string) => {
  switch (label) {
    case "mobile":
      return `tel:${info}`;
    case "e-mail":
      return `mailto:${info}`;
  }
  return "";
};
