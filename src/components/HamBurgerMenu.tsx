import classNames from "classnames";
import React, { useEffect, useState } from "react";
import { Transition } from "react-transition-group";
import styled from "styled-components";
import HamBurgerIcon from "../assets/burgericon.svg";
import { FlexBoxSection } from "../common/Elements";
import { AppContext } from "../context";
import MenuBar from "./MenuBar";
import { valueIsArray, valueIsSkillInfo } from "./Utils";

export const HamBurgerMenu = () => {
  const contentRef = React.useRef<HTMLDivElement>(null);
  const { data } = React.useContext(AppContext);
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
              <MenuBar
                isMobileMenu={true}
                closeHamburgerMenu={() => setIsOpen(false)}
              />
              <div className="find-me">Find me @</div>
              <FlexBoxSection flexWrap="wrap" className="links" id="links">
                {valueIsArray(links.info) && valueIsSkillInfo(links.info)
                  ? links.info.map((link) => (
                      <div
                        className="link"
                        key={link.label}
                        dangerouslySetInnerHTML={{ __html: link.info }}
                      ></div>
                    ))
                  : null}
              </FlexBoxSection>
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
  .links {
    padding: 30px 10px;
    /* position: fixed; */
    bottom: 0;
    margin-bottom: 0;
    .link {
      padding-right: 5px;
      margin-bottom: 40px;
      a {
        padding: 10px 15px;
        text-decoration: none;
        border-radius: 20px;
        background-color: #0c77b9;
        &:hover {
          background-color: #3f9c35;
        }
      }
      a {
        color: #f0f0f0;
      }
      span {
        display: none;
      }
      .link-separator {
        display: none;
      }
    }
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
