import React from "react";
import { IProfileData } from "./store/types";

type RefTypes =
  | "homeRef"
  | "skillsRef"
  | "experienceRef"
  | "educationRef"
  | "contactRef";
interface IAppContext {
  data: IProfileData;
  refs: {
    [key in RefTypes]: React.MutableRefObject<any>;
  };
}

const DEFAULT_CONTEXT = {
  data: {
    data: {
      aboutMe: {
        title: "",
        info: "",
      },
      details: {
        title: "",
        info: "",
      },
      skills: {
        title: "",
        info: "",
      },
      experience: {
        title: "",
        info: "",
      },
      education: {
        title: "",
        info: "",
      },
      links: {
        title: "",
        info: "",
      },
    },
  },
  refs: {
    homeRef: React.createRef(),
    skillsRef: React.createRef(),
    experienceRef: React.createRef(),
    educationRef: React.createRef(),
    contactRef: React.createRef(),
  },
};

const AppContext = React.createContext<IAppContext>(DEFAULT_CONTEXT);

const { Provider: AppProvider, Consumer } = AppContext;

export { AppProvider, Consumer, AppContext };
