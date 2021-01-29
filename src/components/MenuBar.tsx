import React from "react";
import styled from "styled-components";
import { FlexBox } from "../common/Elements";
import { AppContext } from "../context";

const MenuBar = () => {
  const {
    refs: { homeRef, skillsRef, experienceRef, educationRef, contactRef },
  } = React.useContext(AppContext);
  const goTo = (ref: React.MutableRefObject<any>) => {
    const yOffset = -20;
    const y =
      ref.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo({ top: y, behavior: "smooth" });
  };
  return (
    <MenuWrapper>
      <FlexBox
        justifyContent="space-between"
        direction="column"
        className="wrapper"
      >
        <MenuBtn onClick={() => goTo(homeRef)}>About Me</MenuBtn>
        <MenuBtn onClick={() => goTo(skillsRef)}>Skills</MenuBtn>
        <MenuBtn onClick={() => goTo(experienceRef)}>Experience</MenuBtn>
        <MenuBtn onClick={() => goTo(educationRef)}>Education</MenuBtn>
        <MenuBtn onClick={() => goTo(contactRef)}>Contact</MenuBtn>
      </FlexBox>
    </MenuWrapper>
  );
};

export default MenuBar;

const MenuWrapper = styled.nav`
  overflow: hidden;
  position: fixed;
  top: 20%;
  right: 25px;
  width: 100%;
  z-index: 10;
  background-color: #222222;
  max-width: 10%;
`;

const MenuBtn = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  outline: none;
  color: #fff;
  font-size: 14px;
  font-weight: bold;
  padding: 20px 5px;
  &:hover {
    color: #434242;
  }
`;
