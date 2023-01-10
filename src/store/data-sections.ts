import AboutMe from "./data-sections/data-about-me-section";
import Education from "./data-sections/data-education-section";
import Details from "./data-sections/data-details-section";
import Organizations from "./data-sections/data-organizations-section";
import Skills from "./data-sections/data-skills-section";
import Experiences from "./data-sections/data-experiences-section";
import Links from "./data-sections/data-links-section";
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
