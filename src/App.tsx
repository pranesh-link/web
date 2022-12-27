import { useEffect, useMemo, useRef, useState } from "react";
import styled from "styled-components";
import { IHeader, IProfileData, ISectionInfo } from "./store/types";
import {
  CORS_MODE,
  DEFAULT_CONTEXT,
  DEV_JSON_BASE_URL,
  PROD_JSON_BASE_URL,
  SECTIONS,
  TOAST_ERROR_MESSAGE,
  TOAST_POSITION,
} from "./common/constants";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CloseIcon from "./assets/close-icon.svg";
import { ColorRing } from "react-loader-spinner";
import { Profile } from "./Profile";

function App() {
  const homeRef = useRef(null);
  const skillsRef = useRef(null);
  const experienceRef = useRef(null);
  const educationRef = useRef(null);
  const contactRef = useRef(null);
  const orgRef = useRef(null);

  const [hasError, setHasError] = useState<boolean>(false);
  const [profileData, setProfileData] = useState<IProfileData>(
    DEFAULT_CONTEXT.data
  );
  const [isFetchingData, setIsFetchingData] = useState<boolean>(true);
  const [isDownloading, setIsDownloading] = useState<boolean>(false);
  const [isHamburgerMenuOpen, setIsHamburgerMenuOpen] =
    useState<boolean>(false);

  const JSON_BASE_URL =
    process.env.NODE_ENV === "development"
      ? DEV_JSON_BASE_URL
      : PROD_JSON_BASE_URL;

  const CloseButton = () => (
    <i className="material-icons" onClick={closeToast}>
      <img src={CloseIcon} alt="Close icon" width={"20px"} />
    </i>
  );

  const ToastError = useMemo(
    () => (
      <ToastErrorWrapper>
        {TOAST_ERROR_MESSAGE.map((lineError: string) => (
          <p>{lineError}</p>
        ))}
      </ToastErrorWrapper>
    ),
    []
  );

  const closeToast = () => {
    window.location.reload();
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    const {
      HEADER,
      ABOUT_ME,
      DETAILS,
      EDUCATION,
      ORGANIZATIONS,
      SKILLS,
      EXPERIENCE,
      LINKS,
    } = SECTIONS;

    const getJsonResponse = async (
      jsonToFetch: string,
      data: IHeader | ISectionInfo
    ) => {
      try {
        const url = `${JSON_BASE_URL}/${jsonToFetch}.json`;
        const response = await fetch(url, {
          mode: CORS_MODE,
        });
        data = await response.json();
      } catch (e) {
        setHasError(true);
      }
      return data;
    };

    const fetchSections = async (jsonToFetch: string, data: ISectionInfo) =>
      (await getJsonResponse(jsonToFetch, data)) as ISectionInfo;

    const fetchHeader = async (jsonToFetch: string, data: IHeader) =>
      (await getJsonResponse(jsonToFetch, data)) as IHeader;

    const DEFAULT_SECTIONS_DETAILS = DEFAULT_CONTEXT.data.sections.details;

    (async () => {
      const header = await fetchHeader(HEADER, DEFAULT_CONTEXT.data.header);
      const aboutMe = await fetchSections(ABOUT_ME, DEFAULT_SECTIONS_DETAILS);
      const details = await fetchSections(DETAILS, DEFAULT_SECTIONS_DETAILS);
      const education = await fetchSections(
        EDUCATION,
        DEFAULT_SECTIONS_DETAILS
      );
      const organizations = await fetchSections(
        ORGANIZATIONS,
        DEFAULT_SECTIONS_DETAILS
      );
      const skills = await fetchSections(SKILLS, DEFAULT_SECTIONS_DETAILS);
      const experience = await fetchSections(
        EXPERIENCE,
        DEFAULT_SECTIONS_DETAILS
      );
      const links = await fetchSections(LINKS, DEFAULT_SECTIONS_DETAILS);

      const sections = {
        aboutMe,
        details,
        education,
        organizations,
        skills,
        experience,
        links,
      };
      setProfileData({ header, sections });
      setIsFetchingData(false);
    })();
  }, [JSON_BASE_URL]);

  useEffect(() => {
    if (hasError) {
      toast.error(ToastError);
    }
  }, [hasError, ToastError]);

  const isMobile = window.innerWidth < 768;

  return isFetchingData ? (
    <ColorRing
      visible={true}
      height="80"
      width="80"
      ariaLabel="blocks-loading"
      wrapperStyle={{ position: "fixed", top: "45%", left: "47%" }}
      wrapperClass="blocks-wrapper"
      colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
    />
  ) : (
    <Wrapper>
      <ToastContainer
        autoClose={false}
        position={TOAST_POSITION}
        closeButton={CloseButton}
        limit={1}
      />
      {!hasError && (
        <Profile
          profileData={profileData}
          homeRef={homeRef}
          skillsRef={skillsRef}
          experienceRef={experienceRef}
          educationRef={educationRef}
          contactRef={contactRef}
          orgRef={orgRef}
          isDownloading={isDownloading}
          isMobile={isMobile}
          isHamburgerMenuOpen={isHamburgerMenuOpen}
          setIsDownloading={(isDownloading: boolean) =>
            setIsDownloading(isDownloading)
          }
          setIsHamburgerMenuOpen={(isHamburgerMenuOpen: boolean) =>
            setIsHamburgerMenuOpen(isHamburgerMenuOpen)
          }
        />
      )}
    </Wrapper>
  );
}

export default App;

const Wrapper = styled.section`
  .export-wrapper {
    position: absolute;
    left: -3000px;
    top: 0;
  }
`;

const ToastErrorWrapper = styled.div`
  p {
    &:first-child {
      margin-bottom: 3px;
    }
  }
`;
