import React from "react";
import { IAppContext } from "./types";
import { DEFAULT_APP_CONTEXT } from "../../common/constants";

const AppContext = React.createContext<IAppContext>(DEFAULT_APP_CONTEXT);

const { Provider: AppProvider, Consumer: AppConsumer } = AppContext;

export { AppProvider, AppConsumer, AppContext };
