import classNames from "classnames";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FlexBoxSection } from "../common/Elements";
import { AppContext, RefTypes } from "../context";
import { ProfileSectionType } from "../store/types";
import { scrollTo } from "./ScrollTo";

interface IMenuBarProps {
  isMobileMenu?: boolean;
  closeHamburgerMenu?: () => void;
}
const MenuBar = (props: IMenuBarProps) => {
  const { refs, data } = React.useContext(AppContext);

  const [currentSection, setCurrentSection] = useState<string>("about");

  const goTo = (section: string) => {
    scrollTo(`#${section}`, props.isMobileMenu ? 90 : 20);
  };

  const menuItems = Object.keys(data.sections).reduce(
    (
      items: { title: string; ref: string; section: string }[],
      current: string
    ) => {
      if (data.sections[current as ProfileSectionType].ref) {
        const { title, ref = "" } = data.sections[
          current as ProfileSectionType
        ];
        items.push({ section: current, title, ref });
      }
      return items;
    },
    []
  );

  const handleScroll = () => {
    const resultPosition = menuItems.reduce(
      (result, curr, index) => {
        const { ref, section } = curr;
        const currentRef = refs[ref as RefTypes];
        if (currentRef.current) {
          let pos = currentRef.current.getBoundingClientRect().top;
          pos = window.innerWidth < 768 ? pos - 95 : pos - 30;
          console.log(pos);
          if (index === 0 || (pos <= 0 && pos > result.pos)) {
            return {
              section,
              pos,
            };
          }
        }
        return result;
      },
      { section: "aboutMe", pos: 0 }
    );
    setCurrentSection(resultPosition.section);
  };

  useEffect(() => {
    handleScroll();
    window.addEventListener("scroll", () => {
      setTimeout(() => {
        handleScroll();
      }, 1000);
    });
    return () => window.removeEventListener("scroll", handleScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <MenuWrapper
      className={classNames("wrapper", { mobile: props.isMobileMenu })}
    >
      <FlexBoxSection direction="column">
        {menuItems.map((item) => (
          <MenuBtn
            key={item.section}
            onClick={() => {
              goTo(item.section);
              if (props.closeHamburgerMenu) {
                props.closeHamburgerMenu();
              }
            }}
            className={classNames({
              "is-active": currentSection === item.section,
            })}
          >
            {item.title}
          </MenuBtn>
        ))}
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
  max-width: 150px;
  &.mobile {
    padding-top: 0;
    position: static;
    max-width: unset;
    height: 100%;
  }
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
  &:not(.mobile) {
    @media screen and (max-width: 767px) {
      display: none;
      right: 0;
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
