import classNames from "classnames";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FlexBoxSection } from "../common/Elements";
import { AppContext } from "../context";

const MenuBar = () => {
  const {
    refs: { homeRef, skillsRef, experienceRef, educationRef, contactRef },
  } = React.useContext(AppContext);
  const [currentSection, setCurrentSection] = useState<string>("about");
  const goTo = (ref: React.MutableRefObject<any>) => {
    const top = ref.current.getBoundingClientRect().top + window.pageYOffset;
    window.scrollTo({ top, behavior: "smooth" });
  };

  const handleScroll = () => {
    const positions = [
      { section: "about", pos: homeRef.current.getBoundingClientRect().top },
      { section: "skills", pos: skillsRef.current.getBoundingClientRect().top },
      {
        section: "experiences",
        pos: experienceRef.current.getBoundingClientRect().top,
      },
      {
        section: "education",
        pos: educationRef.current.getBoundingClientRect().top,
      },
    ];

    const resultPosition = positions.reduce(
      (result, curr, index) => {
        if (index === 0) {
          return curr;
        }
        if (curr.pos <= 0 && curr.pos > result.pos) {
          return curr;
        }
        return result;
      },
      { section: "about", pos: 0 }
    );
    setCurrentSection(resultPosition.section);
  };

  useEffect(() => {
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <MenuWrapper className="wrapper">
      <FlexBoxSection direction="column">
        <MenuBtn
          onClick={() => goTo(homeRef)}
          className={classNames({ "is-active": currentSection === "about" })}
        >
          About Me
        </MenuBtn>
        <MenuBtn
          onClick={() => goTo(educationRef)}
          className={classNames({
            "is-active": currentSection === "education",
          })}
        >
          Education
        </MenuBtn>
        <MenuBtn
          onClick={() => goTo(skillsRef)}
          className={classNames({ "is-active": currentSection === "skills" })}
        >
          Skills
        </MenuBtn>
        <MenuBtn
          onClick={() => goTo(experienceRef)}
          className={classNames({
            "is-active": currentSection === "experiences",
          })}
        >
          Experiences
        </MenuBtn>
      </FlexBoxSection>
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
  &.wrapper {
    .is-active {
      background-color: #3f9c35;
    }
    ul {
      list-style-type: none;
      padding: 0;
      margin: 0;
    }
    li {
      text-align: center;
      padding: 20px 5px;
    }
    a {
      font-weight: bold;
      padding: 20px 5px;
      text-decoration: none;
      color: #fff;
      &:hover {
        color: #434242;
      }
    }
  }
`;

const MenuBtn = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  outline: none;
  color: #fff;
  font-weight: bold;
  padding: 20px 10px;
  &:hover {
    color: #434242;
  }
`;
