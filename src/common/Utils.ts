import { IPageLink, IPageLinkCollection } from "../store/common/types";

export const getImage = async (fileName: string) => {
  const image = await import(`../assets/${fileName}`);
  return image.default;
};

export const round = (value: number, precision: number) => {
  const multiplier = Math.pow(10, precision || 0);
  return Math.round(value * multiplier) / multiplier;
};

export const findAndReplace = (
  str: string = "",
  replaceText: (string | number)[]
) => {
  const textsToReplace = str.match(/{(.*?)}/g) || [];
  return textsToReplace.reduce(
    (curr, prev, index) => curr.replace(prev, `${replaceText[index]}`),
    str
  );
};

export const isInstanceOfPageLink = (item: any): item is IPageLink =>
  "route" in item;

export const isInstanceOfPageLinkCollection = (
  item: any
): item is IPageLinkCollection => "links" in item;
