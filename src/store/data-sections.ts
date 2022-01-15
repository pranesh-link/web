import AboutMe from "./data-about-me-section";
import Education from "./data-education-section";
import Details from "./data-details-section";
import Organizations from "./data-organizations-section";
import Skills from "./data-skills-section";
import Experiences from "./data-experience-section";
import Links from "./data-links-section";
import { SectionsType } from "./types";

const Sections: SectionsType = {
  aboutMe: AboutMe,
  details: Details,
  education: Education,
  organizations: Organizations,
  skills: Skills,
  experience: Experiences,
  links: Links,
};

export default Sections;
