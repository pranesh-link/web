import React from "react";
import styled from "styled-components";
import { FlexBox } from "../common/Elements";
import { AppContext } from "../context";

const MenuBar = () => {
  const {
    refs: { homeRef, skillsRef, experienceRef, educationRef, contactRef },
  } = React.useContext(AppContext);
  const goTo = (ref: React.MutableRefObject<any>) => {
    const yOffset = -70;
    const y =
      ref.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo({ top: y, behavior: "smooth" });
  };
  return (
    <MenuWrapper>
      <FlexBox justifyContent="space-between" className="wrapper">
        <MenuBtn onClick={() => goTo(homeRef)}>Home</MenuBtn>
        <MenuBtn onClick={() => goTo(skillsRef)}>Skills</MenuBtn>
        <MenuBtn onClick={() => goTo(experienceRef)}>
          Professional Experience
        </MenuBtn>
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
  top: 0;
  width: 100%;
  z-index: 10;
  background-color: #ccc;
  .wrapper {
    padding: 20px;
  }
`;

const MenuBtn = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  outline: none;
  color: #0c77b9;
  font-size: 14px;
  font-weight: bold;
  padding: 5px 15px;
  border-radius: 20px;
  &:hover {
    color: #fff;
    background-color: #0c77b9;
  }
`;
