import { createContext, useContext } from "react";
import type { ProfilePageParams } from "./page";

const appContext = createContext<ProfilePageParams>(null!)

export const useAppCtx = () => useContext(appContext)

export const AppContextProvider = appContext.Provider