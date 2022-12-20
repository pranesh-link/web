import React from "react";
import { IAppContext } from "./store/types";
import { DEFAULT_CONTEXT } from "./common/constants";

const AppContext = React.createContext<IAppContext>(DEFAULT_CONTEXT);

const { Provider: AppProvider, Consumer } = AppContext;

export { AppProvider, Consumer, AppContext };
