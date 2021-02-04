import classNames from "classnames";
import React, { useEffect, useState } from "react";
import { Transition } from "react-transition-group";
import styled from "styled-components";
import HamBurgerIcon from "../assets/burgericon.svg";
import { FlexBox, FlexBoxSection, SectionsWrapper } from "../common/Elements";
import { AppContext } from "../context";
import MenuBar from "./MenuBar";
import { Contact } from "./Sections/Contact";
import CloseIcon from "../assets/close-icon.svg";

export const HamBurgerMenu = () => {
  const contentRef = React.useRef<HTMLDivElement>(null);
  const {
    data,
    refs: { contactRef },
  } = React.useContext(AppContext);
  const { links } = data.sections;

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [hamburgerClicked, setHamburgerClicked] = useState<boolean>(false);
  const scrollbarSize =
    window.innerWidth - document.documentElement.clientWidth;

  useEffect(() => {
    // On open scroll to top of content div
    // Else content div will be at previously scrolled position
    if (isOpen && contentRef.current) {
      contentRef.current.scrollTop = 0;
    }
    setTimeout(() => {
      // Disable body scroll to avoid double scroll on page
      document.getElementsByTagName("body")[0].style.overflow = isOpen
        ? "hidden"
        : "";
      // Add padding to body so that content inside body does not glitch
      document.getElementsByTagName("body")[0].style.paddingRight = isOpen
        ? `${scrollbarSize}px`
        : "";
    }, 100);
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  return (
    <>
      <IconWrap>
        <Icon
          src={HamBurgerIcon}
          onClick={() => {
            setIsOpen(true);
            setHamburgerClicked(true);
          }}
          className={classNames({ clicked: hamburgerClicked })}
        />
      </IconWrap>
      <Transition
        in={isOpen}
        duration={0}
        addEndListener={(node, done) => {
          // use the css transitionend event to mark the finish of a transition
          node.addEventListener("transitionend", done, true);
        }}
      >
        {(state) => (
          <Menu className={state}>
            <ContentSection direction="column" justifyContent="space-around">
              <FlexBox justifyContent="flex-end">
                <img
                  alt=""
                  src={CloseIcon}
                  className="close-button"
                  onClick={() => setIsOpen(false)}
                />
              </FlexBox>
              <MenuBar
                isMobileMenu={true}
                closeHamburgerMenu={() => setIsOpen(false)}
              />
              <label className="find-me">Find me @</label>
              <SectionsWrapper className="hamburger-menu">
                <Contact links={links} refObj={contactRef} />
              </SectionsWrapper>
            </ContentSection>
            <RightSection onClick={() => setIsOpen(false)} />
          </Menu>
        )}
      </Transition>
    </>
  );
};

const IconWrap = styled.div`
  position: fixed;
  width: 100%;
  z-index: 20;
  background: #fff;
  padding: 20px 0;

  @media screen and (min-width: 768px) {
    display: none;
  }
`;
const Menu = styled.div`
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 100011;
  transition: all 200ms;
  &.exited {
    visibility: hidden;
  }
  &.entered {
    background-color: rgba(0, 0, 0, 0.75);
  }
`;
const ContentSection = styled(FlexBoxSection)`
  background-color: #222222;
  flex-basis: 50%;
  .find-me {
    color: #f0f0f0;
    padding-bottom: 5px;
    padding-left: 15px;
    font-style: italic;
    font-weight: bold;
  }
  .close-button {
    cursor: pointer;
    margin: 10px;
    height: 30px;
  }
`;
const RightSection = styled.div`
  flex-basis: 50%;
`;
const Icon = styled.img`
  margin-left: 10px;
  cursor: pointer;
  padding: 10px;
  animation: blinker 5s linear infinite;
  box-shadow: rgb(0 0 0 / 20%) 0 -1px 0px 1px, inset #304701 0 -1px 0px,
    #3f9c35 0 2px 12px;
  &.clicked {
    animation: none;
    box-shadow: none;
    @keyframes blinker {
      50% {
        opacity: 0.5;
        box-shadow: none;
      }
    }
  }
`;
