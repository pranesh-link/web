import React, { useState } from "react";
import styled from "styled-components";
import { FlexBoxSection, SecHeader } from "../../common/Elements";
import { ISectionInfo } from "../../store/types";
import { ProjectInfo } from "../ProjectInfo";
import { valueIsArray, valueIsProjectInfo } from "../Utils";

interface IExperiencesProps {
  experiences: ISectionInfo;
  refObj: React.MutableRefObject<any>;
}
export const Experiences = (props: IExperiencesProps) => {
  const {
    experiences,
    experiences: { info: experience },
    refObj,
  } = props;

  const [isExpanded, setIsExpanded] = useState<{ [key: string]: boolean }>({});

  return valueIsArray(experience) && valueIsProjectInfo(experience) ? (
    <section
      className="profile-section experience"
      id="experience"
      ref={refObj}
    >
      <SecHeader>{experiences.title}</SecHeader>
      <SectionWrapper direction="column" justifyContent="space-around">
        {experience.map((project, index) => (
          <ProjectInfo
            key={index}
            index={index}
            project={project}
            isExpanded={isExpanded}
            setExpanded={(expandSection, expanded) =>
              setIsExpanded({
                ...isExpanded,
                [`${expandSection}-${index}`]: expanded,
              })
            }
          />
        ))}
      </SectionWrapper>
    </section>
  ) : null;
};

const SectionWrapper = styled(FlexBoxSection)`
  padding-left: 20px;
  padding-right: 15%;
  margin-left: 25%;
  @media screen and (max-width: 767px) {
    padding: 0;
    margin-left: 0;
    ul {
      margin: 0;
      padding-left: 25px;
    }
  }
`;
