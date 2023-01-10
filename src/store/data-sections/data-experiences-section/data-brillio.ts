import { IOrgProject } from "../../types";

export const BrillioExperience: IOrgProject = {
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
};
