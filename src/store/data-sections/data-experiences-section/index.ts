import { ISectionInfo } from "../../types";
import { BrillioExperience } from "./data-brillio";
import { StancExperience } from "./data-stanc-gbs";

const Experiences: ISectionInfo = {
  title: "Experiences",
  ref: "experienceRef",
  info: [BrillioExperience, StancExperience],
};

export default Experiences;
