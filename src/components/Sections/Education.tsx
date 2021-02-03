import React from "react";
import { SecHeader, Desc } from "../../common/Elements";
import { ISectionInfo } from "../../store/types";

interface IEducationProps {
  education: ISectionInfo;
  refObj: React.MutableRefObject<any>;
}
export const Education = (props: IEducationProps) => {
  const { education, refObj } = props;
  return (
    <section className="profile-section" id="education" ref={refObj}>
      <SecHeader>{education.title}</SecHeader>
      <Desc
        className="education"
        dangerouslySetInnerHTML={{ __html: education.info as string }}
      />
    </section>
  );
};
