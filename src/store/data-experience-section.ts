import { ISectionInfo } from "./types";

const Experiences: ISectionInfo = {
  title: "Experiences",
  ref: "experienceRef",
  info: [
    {
      organization: "Brillio Technologies",
      projects: [
        {
          title: { info: "MCP" },
          client: { info: "Ciena" },
          duration: { info: "Feb 2021 -" },
          softwareTech: { info: "EmberJS" },
          description: {
            info: `Manage, Control and Plan (MCP) software converges the complete network operations lifecycle through network planning, 
                   infrastructure commissioning, service fulfillment, and service assurance. MCP converges network and service management 
                   throughout the complete lifecycle. It enables carriers and enterprises to take advantage of the following:
                   <ul>
                       <li>Lower operating expenditures</li>
                       <li>Lower capital expenditure</li>
                       <li>Increased revenues and ROI</li>
                   </ul>`,
          },
          responsibilities: {
            info: `
                <ul>
                    <li>Development of web UI</li>
                    <li>Unit test and integration tests</li>
                    <li>Code review with fellow colleagues</li>
                    <li>Educating team towards better coding standards</li>
                </ul>
              `,
            requiresShowHide: true,
          },
        },
      ],
    },
    {
      organization: "Standard Chartered GBS",
      projects: [
        {
          title: { info: "aXess Developer Platform" },
          client: { info: "Standard Chartered Bank" },
          duration: { info: "Apr 2020 - Jan 2021" },
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
          duration: { info: "Jan 2017 - Mar 2020" },
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
          duration: { info: "May 2015 - Dec 2016" },
          softwareTech: {
            info: "Ember CLI, AngularJS, CSS, HTML5, Cordova, Xcode",
          },
          description: {
            info: "Retail Workbench is a digital channel to get customers onboarded to bank and used by Relationship managers. It bankrolls on the offline cache feature",
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
          title: { info: "Breeze Mobile Web - Indonesia [SKN/DFS]" },
          client: { info: "Standard Chartered Bank Indonesia" },
          duration: { info: "Feb 2015 - Apr 2015" },
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
          title: { info: "Breeze Mobile Web - India" },
          client: { info: "Standard Chartered Bank India" },
          duration: { info: "Jan 2013 - Feb 2015" },
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
  ],
};

export default Experiences;
