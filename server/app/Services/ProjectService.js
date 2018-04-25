

const BusinessNetworkConnection = require('composer-client')
  .BusinessNetworkConnection;

const self = this;
class ProjectService {
  constructor() {
    self.bizNetworkConnection = new BusinessNetworkConnection();
  }/*eslint-disable*/
const BusinessNetworkConnection = require("composer-client")
.BusinessNetworkConnection;
const projectService = require("../../Services/ProjectService");

const self = this;
class ProjectController {
constructor() {
  self.bizNetworkConnection = new BusinessNetworkConnection();
}
async create({ request, response }) {
  let newProject = {
    insttitution: request.input("insttitution"),
    fundsource: request.input("fundsource"),
    functioncode: request.input("functioncode"),
    location: request.input("location"),
    objective: request.input("objective"),
    mmda: request.input("mmda"),
    program: request.input("program"),
    subprogram: request.input("subprogram"),
    eclassification: request.input("ecclassification"),
    startdate: request.input("startdate"),
    enddate: request.input("enddate"),
    receipient: request.input("receipient"),
    expenses: request.input("expenses")
  };
  let data = projectService.initiateProject(newProject);

  return response.ok(data);
}
}

module.exports = ProjectController;


  async initiateProject(project) {
    ''
      return project
  }
}

module.exports = new ProjectService();
