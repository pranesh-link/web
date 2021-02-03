import React from "react";
import { FlexBoxSection } from "../../common/Elements";
import { ISectionInfo } from "../../store/types";
import { valueIsArray, valueIsSkillInfo } from "../Utils";

interface IContactProps {
  refObj: React.MutableRefObject<any>;
  links: ISectionInfo;
}
export const Contact = (props: IContactProps) => {
  const { links, refObj } = props;
  return (
    <FlexBoxSection
      justifyContent="center"
      className="profile-section links"
      id="links"
      ref={refObj}
    >
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
  );
};
