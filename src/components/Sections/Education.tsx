import classNames from "classnames";
import React from "react";
import { SecHeader, Desc } from "../../common/Elements";
import { ISectionInfo } from "../../store/types";

interface IEducationProps {
  education: ISectionInfo;
  isExport?: boolean;
  refObj: React.MutableRefObject<any>;
}
export const Education = (props: IEducationProps) => {
  const { education, refObj, isExport } = props;
  return (
    <section
      className="profile-section"
      id={isExport ? "" : "education"}
      ref={isExport ? null : refObj}
    >
      <SecHeader className={classNames({ export: isExport })}>
        {education.title}
      </SecHeader>
      <Desc
        className={classNames("education", { export: isExport })}
        dangerouslySetInnerHTML={{ __html: education.info as string }}
      />
    </section>
  );
};
