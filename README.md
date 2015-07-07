# defender
    
https://defender.ionep.io

## Introduction
The Defender prototype was developed to inform the general public about drug, device, and food product recalls.  Its vision is to combine product recall information from FDA, news outlets, and social media to provide users with a global view of current recalls.  

## Approach
Our approach leveraged our extensive experience using Scrum to define, design, develop, and implement sites and applications. We decided to time-box one as-yet-to-be-defined release into 7 sprints including a Sprint 0 and a Release Sprint (we know, hear us out).

| Statistic  | Process  | 
| :------------ |:---------------: |
| Release Type         | Time-boxed               |
| # of Sprints	         | 7                                   |
| Sprints                    | 4.5h                             |
| Sprint Planning     | 30m                             |
| Sprint Review       | 15m                              |
| Sprint Retro	        | 15m                              |
| Completed Points|49.5                               |
| Velocity	        |  7.1                                |

The Product Owner developed a vision of the product and the Dev Team helped refine it during the [planning session] (https://github.com/INTEGRITY-One/defender/blob/master/AgileArtifacts/Release Planning.mp4). Our ScrumMaster led the team in developing an initial set of 16 user stories and we then used Planning Poker to estimate story points for each.  Two stories were Epics and that required some serious research/prototyping to determine if the release goal was even viable. We conducted a Sprint 0 to address these and cancelled four stories. The Release was baselined at 12 stories (35 points) and a Release sprint was added to address automated testing concerns.

The Product Owner prioritized the user stories and the Dev Team weighed in on technical priorities. From there, the ScrumMaster iteratively led the team to craft a Sprint 1 plan based on a mixture of priority and estimated velocity from Sprint 0.  Trello is great but we decided to use Taiga for our Agile project management tool to gain additional tracking and we loved it!  All of our user stories, tasks, issues, and bugs were [captured in Taiga] (https://tree.taiga.io/project/bschwetz-1-18f-challenge-accepted/backlog/); a summary of these is available in [an SRS] (https://github.com/INTEGRITY-One/defender/blob/master/requirements-design/Defender High-Level SRS.docx).  

For Sprint 1 planning, the team worked collaboratively towards protosketching Defender after reviewing a low fidelity Balsamiq prototype from Release Planning and the US Digital Services Playbook. In parallel, we planned tasks for OpenFDA API integration, AWS configuration, continuous integration using Travis-CI, and test execution.  Our ScrumMaster continuously observed progress, [updated burndown charts] (https://tree.taiga.io/project/bschwetz-1-18f-challenge-accepted/backlog), and adjusted the direction of the team as issues arose.  We conducted brief stand-ups every 1.5 hours to check on progress and remove impediments.  At the end of the sprint, we brought in external stakeholders in addition to the PO to review and solicited feedback.  After Review, we conducted a retrospective where we documented what went well, what didn’t go well, lessons learned, and determined how to implement lessons in the next sprint.

Our subsequent sprints were re-prioritized by the Product Owner prior to the planning session and were comprised of: 
* [Sprint Planning] (https://github.com/INTEGRITY-One/defender/blob/master/AgileArtifacts/Sprint Planning.mp4): A prioritized Sprint Backlog, tasks, and user acceptance criteria (i.e., defined done).  Sprint Planning also incorporated feedback from the Sprint Retrospective and constantly evolved to get to the PO’s vision of a MVP
* Iterative Development:  Executed [test-driven development] (https://github.com/INTEGRITY-One/defender/blob/master/src/client/components/results-area/results-area.controller.spec.js), [manual] (https://github.com/INTEGRITY-One/defender/blob/master/testing/) and [automated testing] (https://github.com/INTEGRITY-One/defender/blob/master/testing/recalls.html), [continuous integration] (https://github.com/INTEGRITY-One/defender/tree/master/CI-Artifacts), automated deployment to AWS, and implemented [continuous monitoring] (https://github.com/INTEGRITY-One/defender/tree/master/CM-Artifacts) alerts 
* [Sprint Review:] (https://github.com/INTEGRITY-One/defender/blob/master/AgileArtifacts/Sprint Reviews and Retros.docx) Demonstrated the capabilities to the Product Owner and stakeholders to [gain feedback] (https://github.com/INTEGRITY-One/defender/blob/master/AgileArtifacts/Sprint Review.mp4) and updated backlog 
* [Sprint Retrospective:] (https://github.com/INTEGRITY-One/defender/blob/master/AgileArtifacts/Sprint Retrospective.mp4) Identified efficiencies and corrective actions to implement 

Along the way we used github for configuration management, and created a [design document] (https://github.com/INTEGRITY-One/defender/blob/master/requirements-design/Defender Design Doc.docx) and a bare metal [installation document] (https://github.com/INTEGRITY-One/defender/blob/master/INSTALL.md).  

## Team Composition
[The team] (https://github.com/INTEGRITY-One/defender/blob/master/AgileArtifacts/about_us.png) was comprised of personnel with distinct and defined roles across multiple disciplines: 
* Product Owner –In addition to the standard responsibilities of a PO, to facilitate rapid feedback for our short sprints, we integrated the PO into testing and validation with mentoring by the Scrum Master to ensure changes weren’t being made on the fly. 
* Delivery Manager/Agile Coach – Our ScrumMaster coordinated decomposition and sizing of backlog with team and PO, and coached the PO in agile requirements definition
* Frontend Developer – Designed, developed and unit tested user-facing capabilities using open source technologies such as Express, AngularJS, node.JS, Bootstrap, Grunt and Karma
* Backend Developer – Designed, developed and unit tested back-end functionality integrating RESTful APIs using open source technologies including Express, AngularJS, node.JS, Mapbox, Grunt and Mocha
* DevOps Engineer – Configured our AWS environment, Travis CI for continuous integration, automated AWS deployments from Travis, integrated Morgan for logging, and wrote scripts to capture, aggregate and synthesize application alerts into AWS Cloudwatch
* Interaction Designer – Provided graphic support and guidance on responsive design
* Test Engineer	– Performed quality assurance by conducting functional testing through manual and automated tests

_Oh and one more thing…we loved every minute of it!_
