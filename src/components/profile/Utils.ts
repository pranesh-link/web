import {
  CORS_MODE,
  DEV_JSON_BASE_URL,
  PROD_JSON_BASE_URL,
} from "../../common/constants";
import {
  IDetailInfo,
  IHeader,
  ILink,
  InfoType,
  IOrganization,
  IOrgProject,
  ISectionInfo,
  ISkill,
} from "../../store/profile/types";

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

export const getJsonResponse = async (
  jsonToFetch: string,
  data: IHeader | ISectionInfo
) => {
  const JSON_BASE_URL = getJsonBaseUrl();
  let hasError = false;
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

export const getIconUrlByExportFlag = (
  iconUrl?: string,
  pdfExportIconUrl?: string,
  isExport?: boolean
) =>
  isExport
    ? `${pdfExportIconUrl}?dummy=${Math.floor(Math.random() * 1000)}`
    : getIconUrl(iconUrl || "");
