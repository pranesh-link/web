import { InfoType, IProject, ISkill } from "../store/types";

export const valueIsString = (item: InfoType): item is string => {
  return typeof item === "string";
};

export const valueIsArray = (item: InfoType): item is any[] => {
  return Array.isArray(item);
};

export const valueIsProjectInfo = (item: InfoType): item is IProject[] => {
  return (item as IProject[])[0].title !== undefined;
};

export const valueIsSkillInfo = (item: InfoType): item is ISkill[] => {
  return (item as ISkill[])[0].label !== undefined;
};
