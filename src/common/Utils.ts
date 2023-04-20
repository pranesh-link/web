import { CORS_MODE, DEV_JSON_BASE_URL, PROD_JSON_BASE_URL } from "./constants";
import {
  DownloadType,
  IDetailInfo,
  IHeader,
  ILink,
  InfoType,
  IOrganization,
  IOrgProject,
  IResumeOrg,
  ISectionInfo,
  ISkill,
} from "../store/profile/types";

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

export const valueIsResumeOrgInfo = (item: InfoType): item is IResumeOrg[] => {
  return (item as IResumeOrg[])[0].organization !== undefined;
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

export const setLocalStorage = (key: string, value: any) =>
  localStorage.setItem(key, JSON.stringify({ value }));

export const getLocalStorage = (key: string) => {
  const itemStr = localStorage.getItem(key);

  if (!itemStr) {
    return null;
  }
  const item = JSON.parse(itemStr);
  return item.value;
};

export const isBannerHidden = (hideTime: number) => {
  if (hideTime > 0) {
    const isHideTime = new Date().getTime() < hideTime;
    if (!isHideTime) {
      localStorage.removeItem("pwaBannerHideTime");
    }
    return new Date().getTime() < hideTime;
  }
  return false;
};

export const getJsonBaseUrl = () =>
  process.env.NODE_ENV === "development"
    ? DEV_JSON_BASE_URL
    : PROD_JSON_BASE_URL;

export const getIconUrl = (url: string) => `${getJsonBaseUrl()}/${url}`;

export const getJsonResponse = async (jsonToFetch: string, data?: any) => {
  const JSON_BASE_URL = getJsonBaseUrl();
  let hasError = false;
  data = data || {};
  try {
    const url = `${JSON_BASE_URL}/${jsonToFetch}.json`;
    const response = await fetch(url, {
      mode: CORS_MODE,
    });
    data = await response.json();
  } catch (e) {
    hasError = true;
  }
  return { data, hasError };
};

export const getProfileJsonResponse = async (
  jsonToFetch: string,
  data: IHeader | ISectionInfo | DownloadType
) => {
  return getJsonResponse(jsonToFetch, data);
};

export const getIconUrlByExportFlag = (
  iconUrl?: string,
  pdfExportIconUrl?: string,
  isExport?: boolean
) =>
  isExport
    ? `${pdfExportIconUrl}?dummy=${Math.floor(Math.random() * 1000)}`
    : getIconUrl(iconUrl || "");

export const isEmptyObject = (obj: Object) => Object.keys(obj).length === 0;

export const getObjectKeyValuesByIndex = (obj: Object, index: number) => [
  Object.keys(obj)[index],
  Object.values(obj)[index],
];
