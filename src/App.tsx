import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import React, { Suspense, useEffect, useState } from "react";
import LoaderIcon from "./assets/loader-icon.svg";
import { IConfigData, IConfigDataParams } from "./store/common/types";
import { HomePage } from "./pages/HomePage";
import { AppProvider } from "./store/app/context";
import { IAppConfigData } from "./store/app/types";
import {
  osName,
  browserName,
  isMobile as isMobileDevice,
} from "react-device-detect";
import { version } from "../package.json";
import {
  Constants,
  Elements,
  ISectionInfo,
  Utils,
} from "react-profile-component";
import { getImage } from "./common/Utils";
import {
  CMS_SERVER_CONFIG,
  DEFAULT_APP_CONTEXT,
  ENVIRONMENT,
  ROUTES,
} from "./common/constants";

const { LoaderImg } = Elements;
const {
  getJsonResponse,
  getPdfBlob,
  getPdfUrl,
  getProfileJsonResponse,
  toDataURL,
} = Utils;
const { CONFIG_REF_INFO, CONFIG_TYPES } = Constants;

const DEFAULT_CONFIG_DATA: IConfigData = {
  jsonConfig: {
    defaultConfig: [
      {
        name: "maintenance",
        type: "",
        ref: "",
      },
    ],
    profileConfig: [
      {
        name: "profileSections",
        type: "",
        ref: "",
      },
    ],
  },
  appConfig: {
    homepage: {
      profileRedirectDelay: 2,
    },
    pwa: {
      browsers: [],
      os: [],
    },
    preloadSrcList: [],
  },
};

function App() {
  const queryParams = new URLSearchParams(window.location.search);
  const isAdmin = queryParams.get("admin");
  const isExport = !!queryParams.get("export");
  const [isMobile, setIsMobile] = useState<boolean>(isMobileDevice);
  const [hasError, setHasError] = useState(false);
  const [retry, setRetry] = useState<boolean>(true);
  const [configData, setConfigData] =
    useState<IConfigData>(DEFAULT_CONFIG_DATA);
  const [basicConfigData, setBasicConfigData] = useState<IAppConfigData>(
    DEFAULT_APP_CONTEXT.data
  );
  const [preloadAssetImages, setPreloadAssetImages] = useState<any>([]);
  const [preloadedFiles, setPreloadedFiles] = useState<
    { id: string; file: string }[]
  >([]);
  const [preloadSrcList, setPreloadSrcList] = useState(
    DEFAULT_CONFIG_DATA.appConfig.preloadSrcList
  );

  const fetchSections = async (
    jsonToFetch: string,
    data: ISectionInfo,
    name: string
  ) => {
    const response = await getProfileJsonResponse(
      ENVIRONMENT,
      jsonToFetch,
      CMS_SERVER_CONFIG,
      data
    );
    setHasError(response.hasError);
    return { name, data: response.data as ISectionInfo };
  };

  const fetchData = async (jsonToFetch: string, name: string) => {
    const response = await getJsonResponse(
      ENVIRONMENT,
      jsonToFetch,
      CMS_SERVER_CONFIG
    );
    setHasError(response.hasError);
    return { name, data: response.data };
  };

  const setViewportProps = () => setIsMobile(window.innerWidth < 768);

  useEffect(() => {
    window.addEventListener("resize", setViewportProps);
    return () => window.removeEventListener("resize", setViewportProps);
  }, []);

  useEffect(() => {
    let isCancelled = false;
    async function effect() {
      if (isCancelled) {
        return;
      }
      const imagesPromiseList: Promise<any>[] = [];
      const filesList: { id: string; file: string }[] = [];
      for (const item of preloadSrcList) {
        if (item.type === "image") {
          const image = await getImage(item.fileName);
          imagesPromiseList.push(toDataURL(image, item.id));
        }
        if (item.fileLocation === "server" && item.type === "pdf") {
          const pdfFile = await getPdfBlob(
            getPdfUrl(ENVIRONMENT, item.fileName, CMS_SERVER_CONFIG)
          );
          filesList.push({ id: item.id, file: pdfFile.objectUrl });
        }
      }

      const images = await Promise.all(imagesPromiseList);
      setPreloadAssetImages(
        images.map((item) => ({
          id: item.id,
          image: item.image,
        }))
      );
      setPreloadedFiles(filesList);
      if (isCancelled) {
        return;
      }
    }
    effect();

    return () => {
      isCancelled = true;
    };
  }, [preloadSrcList]);

  useEffect(() => {
    (async () => {
      if (retry) {
        const config = (
          (await fetchData(
            CONFIG_REF_INFO.ref,
            CONFIG_REF_INFO.name
          )) as unknown as { data: IConfigData }
        ).data;
        setConfigData(config);
        setPreloadSrcList(config.appConfig.preloadSrcList);
        const {
          jsonConfig: { defaultConfig },
          appConfig,
        } = config;
        const configData = await Promise.all(
          defaultConfig.map((data: IConfigDataParams) => {
            const { name, type, ref } = data;
            return type === CONFIG_TYPES.PROFILECONFIG
              ? fetchSections(ref, basicConfigData.links, name)
              : fetchData(ref, name);
          })
        );
        setBasicConfigData({
          ...configData.reduce(
            (curr, prev) => ({ ...curr, [prev.name]: prev.data }),
            basicConfigData
          ),
          appConfig,
        });

        setRetry(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [retry]);

  const ProfilePageComponent = React.lazy(
    () => import("./pages/profile/ProfilePage")
  );

  const MaintenancePageComponent = React.lazy(
    () => import("./pages/maintenance/MaintenancePage")
  );

  return (
    <AppProvider
      value={{
        data: {
          ...basicConfigData,
          isAdmin: !!isAdmin,
          preloadedAssets: preloadAssetImages,
          preloadedFiles,
          preloadSrcList,
          currentDevice: { osName, browserName, isMobile },
          version,
        },
      }}
    >
      <Suspense fallback={<LoaderImg isMobile={isMobile} src={LoaderIcon} />}>
        <BrowserRouter>
          <Routes>
            {!hasError &&
            !isAdmin &&
            basicConfigData.maintenance?.isUnderMaintenance ? (
              <>
                <Route
                  path="*"
                  element={<Navigate to={ROUTES.ROUTE_MAINTENANCE} />}
                />
                <Route
                  path={ROUTES.ROUTE_MAINTENANCE}
                  element={
                    <>
                      <MaintenancePageComponent
                        isMobile={isMobile}
                        maintenance={basicConfigData.maintenance}
                        links={basicConfigData.links}
                      />
                    </>
                  }
                />
              </>
            ) : (
              <>
                <Route
                  path="/"
                  element={
                    <>
                      <HomePage />
                    </>
                  }
                />
                <Route
                  path={ROUTES.ROUTE_PROFILE}
                  element={
                    <>
                      <ProfilePageComponent
                        isMobile={isMobile}
                        isExport={isExport}
                        hasError={hasError}
                        profileConfig={configData.jsonConfig.profileConfig}
                        pwa={basicConfigData.pwa}
                        retryBaseInfo={() => setRetry(true)}
                      />
                    </>
                  }
                />
              </>
            )}
          </Routes>
        </BrowserRouter>
      </Suspense>
    </AppProvider>
  );
}

export default App;
