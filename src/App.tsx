import React, { useRef } from "react";
import styled from "styled-components";
import MenuBar from "./components/MenuBar";
import ProfileSections from "./components/ProfileSections";
import { AppProvider } from "./context";
import { ProfileData } from "./store/ProfileData";

function App() {
  const homeRef = useRef(null);
  const skillsRef = useRef(null);
  const experienceRef = useRef(null);
  const educationRef = useRef(null);
  const contactRef = useRef(null);

  return (
    <AppProvider
      value={{
        data: ProfileData,
        refs: { homeRef, skillsRef, experienceRef, educationRef, contactRef },
      }}
    >
      <Wrapper>
        <MenuBar />
        <ProfileSections />
      </Wrapper>
    </AppProvider>
  );
}

export default App;

const Wrapper = styled.section``;
