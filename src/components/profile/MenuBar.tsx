import classNames from "classnames";
import React, { useEffect } from "react";
import styled from "styled-components";
import { FlexBoxSection } from "../../common/Elements";
import { AppContext } from "../../store/profile/context";
import { ProfileSectionType, RefTypes } from "../../store/profile/types";
import { scrollTo } from "./ScrollTo";

interface IMenuBarProps {
  isMobileMenu?: boolean;
  closeHamburgerMenu?: () => void;
  onMenuChange?: (section: string) => void;
}
const MenuBar = (props: IMenuBarProps) => {
  const { refs, data, currentSection, isInstallBannerOpen } =
    React.useContext(AppContext);
  const { onMenuChange } = props;
  const goTo = (section: string) => {
    scrollTo(
      `#${section}`,
      props.isMobileMenu ? 90 : isInstallBannerOpen ? 110 : 20
    );
  };
  let timeout: any;
  const menuItems = Object.keys(data.sections).reduce(
    (
      items: { title: string; ref: string; section: string }[],
      current: string
    ) => {
      if (data.sections[current as ProfileSectionType].ref) {
        const { title, ref = "" } =
          data.sections[current as ProfileSectionType];
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
          pos =
            window.innerWidth < 768
              ? pos - 95
              : isInstallBannerOpen
              ? pos - 120
              : pos - 30;
          if (index === 0 || (pos <= 0 && pos > result.pos)) {
            return {
              section,
              pos,
            };
          }
        }
        return result;
      },
      { section: "aboutMe", pos: isInstallBannerOpen ? 90 : 0 }
    );
    if (onMenuChange) {
      onMenuChange(resultPosition.section);
    }
  };

  const debounce = (method: () => void, delay: number) => {
    clearTimeout(timeout);
    timeout = setTimeout(function () {
      method();
    }, delay);
  };

  useEffect(() => {
    handleScroll();
    window.addEventListener("scroll", () => {
      debounce(handleScroll, 100);
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
    color: #00b2e2;
  }
`;
