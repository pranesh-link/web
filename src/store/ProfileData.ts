import { IProfileData } from "./types";

export const ProfileData: IProfileData = {
  header: {
    shortDesc: "Hey, I'm",
    name: "Pranesh",
  },
  sections: {
    aboutMe: {
      title: "About Me",
      ref: "homeRef",
      info: `I'm an enthusiastic front-end developer who wants to be an integral part of a competitive work environment, which would
    help me to update my knowledge and skills, both on the intellectual
    and personal front while contributing to the growth and success of the
    organisation.`,
    },
    details: {
      title: "Details",
      info: [
        {
          label: "Location:",
          info: "Bengaluru, India",
        },
        {
          label: "Mobile",
          info: "+91-9443329991",
          canCopy: true,
        },
        {
          label: "E-mail",
          info: "prans1991@gmail.com",
          canCopy: true,
        },
      ],
    },
    education: {
      title: "Education",
      ref: "educationRef",
      info:
        "<strong>B.E (Electronics and Communication)</strong>, Sri Krishna College of Engineering and Technology, Coimbatore",
    },
    skills: {
      title: "Skills",
      ref: "skillsRef",
      info: [
        {
          label: "Web Technologies",
          info: "HTML 5, CSS 3, SASS, Cordova",
        },
        {
          label: "Scripting Languages",
          info:
            "Javascript, Jquery, AngularJS, EmberJS, Angular 5, React, Typescript",
        },
        {
          label: "Tools",
          info: "Git, SVN, Jenkins, Xcode",
        },
        {
          label: "Testing",
          info: "Jasmine, Karma",
        },
      ],
    },
    experience: {
      title: "Experiences",
      ref: "experienceRef",
      info: [
        {
          title: { info: "aXess Developer Platform" },
          client: { info: "Standard Chartered Bank" },
          duration: { info: "April 2020 - Jan 2021" },
          softwareTech: {
            info: "React, Redux, Typescript, CSS, HTML5,GraphQL",
          },
          description: {
            info: `aXess is a Developer platform built in-house to facilitate the developer community toward better communication. Every existing employee can manage their role profile associated with the Bank and can
              <ul> 
                  <li>extend to offer help based on their skillset</li>
                  <li>add teams to coordinate and work together</li>
                  <li>create/manage survey</li>
                  <li>share APIs, APPs, Libraries which can be useful for other teams within the Bank</li>
                  <li>manage the Application(s) developed by their respective teams (feature developer)</li>
                  <li>create/manage share ideas with the Developer community using Idea Boards (feature developer)</li>
                  <li>create/manage Squads, Tribes to improvise Agile coordination within teams (feature developer)</li>
                  <li>create/manage POCs</li>
              </ul>
            `,
          },
          responsibilities: {
            info: `
              <ul> 
                  <li>Design and development of web UI</li>
                  <li>Facilitate team especially junior developers towards better coding practices through more code reviews</li>
                  <li>Independent development contribution of features</li>
                  <li>Development of reusable UI components</li>
              </ul>`,
            requiresShowHide: true,
          },
        },
        {
          title: { info: "Real Time On-boarding" },
          client: { info: "Standard Chartered Bank" },
          duration: { info: "January 2017 – March 2020" },
          softwareTech: {
            info: "Ember CLI, AngularJS, CSS, HTML5, Cordova, Xcode",
          },
          description: {
            info: `Real Time On-boarding is a future driven initiative, with creation of bank accounts in real time to the customers using the pre-populated customer details from their Identity proofs`,
          },
          responsibilities: {
            info: `
              <ul> 
                  <li>Design of Web UI</li>
                  <li>UI development of functional modules with unit testing</li>
                  <li>Showcasing the application developed to stakeholders in Sprint demo sessions by following an Agile Development Methodology</li>
                  <li>Device testing of application on iPad</li>
                  <li>Build and upload of iOS application of the product developed to TestFlight (App store) for testing by the stakeholders</li>
                  <li>Production release activities</li>
                  <li>Deployment and maintenance of Web Server</li>
                  <li>DevOps with build and release automation</li>
              </ul>
            `,
            requiresShowHide: true,
          },
        },
        {
          title: { info: "Retail Workbench" },
          client: { info: "Standard Chartered Bank" },
          duration: { info: "May 2015 – December 2016" },
          softwareTech: {
            info: "Ember CLI, AngularJS, CSS, HTML5, Cordova, Xcode",
          },
          description: {
            info:
              "Retail Workbench is a digital channel to get customers onboarded to bank and used by Relationship managers. It bankrolls on the offline cache feature",
          },
          responsibilities: {
            info: `
              <ul> 
                  <li>UI development of functional modules with unit testing</li>
                  <li>Showcasing the application developed to stakeholders in Sprint demo sessions by following an Agile Methodology</li>
                  <li>Device testing of application on iPad</li>
                  <li>Build and upload of iOS application of the product developed to TestFlight (App store) for testing</li>
                  <li>Production release activities</li>
                  <li>Deployment and maintenance of Web Server</li>
              </ul>
            `,
            requiresShowHide: true,
          },
        },
        {
          title: { info: "Breeze Mobile Web – Indonesia [SKN/DFS]" },
          client: { info: "Standard Chartered Bank Indonesia" },
          duration: { info: "Feb 2015 – April 2015" },
          softwareTech: { info: "Ember CLI, CSS, HTML5, Cordova" },
          description: {
            info: `Breeze Mobile Web was developed with focus on giving a ease of use Banking experience anytime and at any place in their mobile devices. The
          application use simple yet comprehensive provided it’s users all the basic banking features at
          their hands.`,
          },
          responsibilities: {
            info: `
              <ul> 
                  <li>UI development of the functional module</li>
                  <li>Unit testing for the changes made in the mobile application developed</li>
                  <li>Build promotion implementation for the application</li>
                  <li>Providing UI fixes for the bugs identified during the testing phases</li>
                  <li>Build and upload of iOS application of the product developed to TestFlight (App store) for testing</li>
              </ul>
            `,
            requiresShowHide: true,
          },
        },
        {
          title: { info: "Breeze Mobile Web – India" },
          client: { info: "Standard Chartered Bank India" },
          duration: { info: "January 2013 – Feb 2015" },
          softwareTech: { info: "Ember CLI, CSS, HTML5, Cordova" },
          description: {
            info: `Breeze Mobile Web India had an initial launch in August 2013 (Phase1) which met user’s basic banking needs.
             In July 2014 Phase 2 was released with added features of Mobile Top up, EMI breakup and Locate a branch or ATM. 
             Breeze India had subsequent CR release for reducing the timeouts of some functionalities and fixes in February 2015.`,
          },
          responsibilities: {
            info: `
            <ul>
                <li>UI development of the functional module</li>
                <li>Unit testing for the changes made in the mobile application developed</li>
                <li>Build promotion implementation for the application</li>
                <li>Providing UI fixes for the bugs identified during the testing phases</li>
                <li>Build and upload of iOS application of the product developed to TestFlight (App store) for testing</li>
            </ul>  
          `,
            requiresShowHide: true,
          },
        },
      ],
    },

    links: {
      title: "Links",
      info: [
        {
          label: "Github",
          info:
            "<a href='https://github.com/prans1991/' target='_blank'>Github</a><span> - </span>",
        },
        {
          label: "LinkedIn",
          info: `<a href='https://www.linkedin.com/in/pranesh-g/' target='_blank'>LinkedIn</a>
             <span> - </span> `,
        },

        {
          label: "Facebook",
          info:
            "<a href='https://www.facebook.com/anonymousOffl/' target='_blank'>Facebook</a><span> - </span>",
        },
        {
          label: "Twitter",
          info:
            "<a href='https://twitter.com/anonymous_offl' target='_blank'>Twitter</a>",
        },
      ],
    },
  },
};
