import classNames from "classnames";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FlexBoxSection } from "../common/Elements";
import { AppContext, RefTypes } from "../context";
import { ProfileSectionType } from "../store/types";

interface IMenuBarProps {
  isMobileMenu?: boolean;
  closeHamburgerMenu?: () => void;
}
const MenuBar = (props: IMenuBarProps) => {
  const { refs, data } = React.useContext(AppContext);

  const [currentSection, setCurrentSection] = useState<string>("about");

  const goTo = (ref: React.MutableRefObject<any>) => {
    const additionalOffset = visualViewport.width < 767 ? -90 : 0;
    const top =
      ref.current.getBoundingClientRect().top +
      additionalOffset +
      window.pageYOffset;
    window.scrollTo({ top, behavior: "smooth" });
  };

  const menuItems = Object.keys(data.data).reduce(
    (
      items: { title: string; ref: string; section: string }[],
      current: string
    ) => {
      if (data.data[current as ProfileSectionType].ref) {
        const { title, ref = "" } = data.data[current as ProfileSectionType];
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
        let pos = refs[ref as RefTypes].current.getBoundingClientRect().top;
        pos = visualViewport.width < 767 ? pos - 95 : pos;
        console.log(pos);

        if (index === 0 || (pos <= 0 && pos > result.pos)) {
          return {
            section,
            pos,
          };
        }
        return result;
      },
      { section: "aboutMe", pos: 0 }
    );
    setCurrentSection(resultPosition.section);
  };

  useEffect(() => {
    handleScroll();
    window.addEventListener("scroll", handleScroll);
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
              goTo(refs[item.ref as RefTypes]);
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
  max-width: 10%;
  &.mobile {
    padding-top: 25px;
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
