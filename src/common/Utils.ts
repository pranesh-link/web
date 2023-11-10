import {
  CORS_MODE,
  DEV_JSON_BASE_URL,
  LOCAL_DEV_URL,
  PROD_JSON_BASE_URL,
  PROD_WEB_URL,
  SERVER_FILES_LOC,
} from "./constants";
import {
  DownloadType,
  IDetailInfo,
  IHeader,
  ILink,
  InfoType,
  IExperience,
  IOrgProject,
  IResumeOrg,
  ISectionInfo,
  ISkill,
  IFormInfo,
} from "../store/profile/types";

export const valueIsString = (item: InfoType): item is string => {
  return typeof item === "string";
};

export const valueIsArray = (item: InfoType): item is any[] => {
  return Array.isArray(item);
};

export const valueIsOrgProjectInfo = (
  item: InfoType,
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

export const valueIsExperienceInfo = (
  item: InfoType,
): item is IExperience[] => {
  return (item as IExperience[])[0].name !== undefined;
};
export const lowercase = (str: string) => str.toLowerCase().replace(/ /g, "");

export const uppercase = (str: string) => str.toUpperCase().replace(/ /g, "");

export const replaceWith = (
  mainStr: string,
  replaceChar1: string,
  replaceChar2: string,
) => mainStr.replace(replaceChar1, replaceChar2);

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

export const clearLocalStorage = (key?: string) => {
  key ? localStorage.removeItem(key) : localStorage.clear();
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

export const getServerBaseUrl = () =>
  process.env.NODE_ENV === "development"
    ? DEV_JSON_BASE_URL
    : PROD_JSON_BASE_URL;

export const getIconUrl = (url: string) => `${getServerBaseUrl()}/${url}`;

export const isNetworkOnline = () => navigator.onLine;

export const getJsonResponse = async (jsonToFetch: string, data?: any) => {
  const JSON_BASE_URL = getServerBaseUrl();
  let hasError = false;
  data = data || {};
  try {
    const url = `${JSON_BASE_URL}/${jsonToFetch}`;
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
  data: IHeader | ISectionInfo | DownloadType | IFormInfo,
) => {
  return getJsonResponse(jsonToFetch, data);
};

export const getPdfUrl = (fileName: string) =>
  `${getServerBaseUrl()}${SERVER_FILES_LOC}/${fileName}`;

export const getPdfFile = async (url: string) => {
  let hasError = false;
  let objectUrl = "";
  try {
    if (url) {
      const response = await fetch(url, {
        mode: CORS_MODE,
      });
      const blob = await response.blob();
      objectUrl = URL.createObjectURL(blob);
    } else {
      hasError = true;
    }
  } catch (e) {
    hasError = true;
  }
  return { objectUrl, hasError };
};

export const getPdfBlob = async (url: string) => getPdfFile(url);

export const getIconUrlByExportFlag = (
  iconUrl?: string,
  pdfExportIconUrl?: string,
  isExport?: boolean,
) =>
  isExport
    ? `${pdfExportIconUrl}?dummy=${Math.floor(Math.random() * 1000)}`
    : getIconUrl(iconUrl || "");

export const isEmptyObject = (obj: Object) => Object.keys(obj).length === 0;

export const isStringBooleanRecord = (
  val: any,
): val is Record<string, boolean> =>
  typeof val[Object.keys(val)[0]] === "boolean" ||
  (typeof val === "object" && Object.keys(val).length === 0);

export const isObject = (val: any): val is Object => typeof val === "object";

export const isString = (val: any): val is string => typeof val === "string";

export const getObjectKeyValuesByIndex = (obj: Object, index: number) => [
  Object.keys(obj)[index],
  Object.values(obj)[index],
];

export const getFilteredLinks = (info: ILink[]) =>
  info.filter(link => link?.display !== false);

export const getRemainingCharacters = (fieldStr: string, maxLength: number) =>
  maxLength - fieldStr.length;

export const isSupportedBrowserAndOS = (
  browsers: string[],
  os: string[],
  browserName: string,
  osName: string,
) => {
  const isSupportedBrowser = browsers.indexOf(browserName) > -1;
  const isSupportedOS = os.indexOf(osName) > -1;
  return isSupportedOS && isSupportedBrowser;
};

export const toDataURL = async (url: string, imageId: string) => {
  const response = await fetch(url);
  const blobResponse = await response.blob();
  return await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve({ id: imageId, image: reader.result });
    reader.onerror = reject;
    reader.readAsDataURL(blobResponse);
  });
};

export const getWebUrl = () =>
  process.env.NODE_ENV === "development" ? LOCAL_DEV_URL : PROD_WEB_URL;
