/*eslint-disable*/

const BusinessNetworkConnection = require("composer-client")
  .BusinessNetworkConnection;
const historianService = require("../../Services/HistorianService");
const assetService =require("../../Services/AssetService");
const participantService=require("../../Services/ParticipantService");
const self = this;

class ProjectController {
  constructor() {
    self.bizNetworkConnection = new BusinessNetworkConnection();
  }
  /**
   * Create a New project Resource
   * @param {request}
   * @param{response}
   * @returns{response}
   */

  async create({ request, response ,auth}) {
    let id = "1";
    let idNumber;
    let name = "hello";
    let fund=request.input('fund')
    let projectData = {};
    let initialbudgetData={}
    let history = {};

    if (request.input("id")) {
      id = parseInt(request.input("id")) + 1;
    }

  
  await self.bizNetworkConnection.connect("admin@decentralizedgov-network");
  let factory = self.bizNetworkConnection.getBusinessNetwork().getFactory();
  let projectRegistry = await self.bizNetworkConnection.getAssetRegistry(
    "org.gov.fundtracker.Project"
  );
  let budgetRegistry = await self.bizNetworkConnection.getAssetRegistry(
    "org.gov.fundtracker.Budget"
  );

  //Serialize project to Json
  let serializer = self.bizNetworkConnection
    .getBusinessNetwork()
    .getSerializer();



  let project = factory.newResource("org.gov.fundtracker", "Project", id.toString());
  const mmda = factory.newRelationship(
    "org.gov.fundtracker",
    "MMDA",
    request.input("mmda")
  );
  const program = factory.newRelationship(
    "org.gov.fundtracker",
    "Program",
    request.input("program")
  );
  project.id = id.toString();
  project.name = request.input("name");
  project.allocation = parseFloat(request.input("allocation"));
  project.MMDA = mmda;
  project.FundSource = fund;
  project.Program = program;
  project.objective = request.input("objective");
  await projectRegistry.add(project);

  //Get project with Id
  let newproject = await projectRegistry.get(id.toString());
  projectData = serializer.toJSON(newproject);

// Get INITIAL Budget with id
let newBudget = await budgetRegistry.get(request.input('budget'));
initialbudgetData=serializer.toJSON(newBudget)


  // let transaction = factory.newTransaction(
  //   "org.gov.fundtracker",
  //   "updateBudget"
  // );
  // transaction.Budget = factory.newRelationship(
  //   "org.gov.fundtracker",
  //   "Budget",
  //   request.input("budget")
  // );
  // transaction.FundSource = fund;
  // transaction.Amount = parseFloat(request.input("allocation"));
  // self.bizNetworkConnection.submitTransaction(transaction);

  const user =await auth.getUser();
  let budget = await budgetRegistry.get(request.input('budget'));
  let updatedbudgetData=serializer.toJSON(budget)

 let historian= await historianService.create({
  'controller':false,
    'transactionInvoked':'Update Budget',
    'Participant':'org.gov.fundtracker.FundTransferApprover#'+user.participantid,
    'initial':JSON.stringify(initialbudgetData),
    'change':JSON.stringify(updatedbudgetData),
    'projectid':id.toString()
  })


    return response.ok(projectData,historian);
  }

  async all({ response }) {
    await self.bizNetworkConnection.connect("admin@decentralizedgov-network");
    let projectRegistry = await self.bizNetworkConnection.getAssetRegistry(
      "org.gov.fundtracker.Project"
    );
    let mmdaRegistry = await self.bizNetworkConnection.getAssetRegistry(
      "org.gov.fundtracker.MMDA"
    );
    // Serialize project to Json
   let serializer = self.bizNetworkConnection
      .getBusinessNetwork()
      .getSerializer();
    let projects = await projectRegistry.getAll();
    let projectData= projects.map(project => {
      return serializer.toJSON(project);
    });
   
      const promises=projectData.map(async (project)=>{

            if (project.MMDA) {

               let id = project.MMDA.split("#").pop();
               const data = await mmdaRegistry.get(id)
               var mmdaData= serializer.toJSON(data);
            }

            return {
              'id':project.id,
               'name':project.name,
              'mmda':mmdaData.name,
              'region':mmdaData.Region,
              'fund source':project.FundSource,
              'allocation':project.allocation,
              'status':'APPROVED',
              'FundTransferStatus':project.FundTransferStatus
          
           
            }
      })

      const results = await Promise.all(promises)
   
    return response.ok(results);
  }

 async findByMmda({request,response,params}){
   // Serialize project to Json
     await self.bizNetworkConnection.connect("admin@decentralizedgov-network");
     let serializer = self.bizNetworkConnection
      .getBusinessNetwork()
      .getSerializer();
    let mmdaRegistry = await self.bizNetworkConnection.getAssetRegistry(
      "org.gov.fundtracker.MMDA"
    );
    let projectRegistry = await self.bizNetworkConnection.getAssetRegistry(
      "org.gov.fundtracker.Project"
    );
      const mmdas = await mmdaRegistry.getAll();
      const projects =await projectRegistry.getAll();

    var data={}
    
      if (mmdas) {
     data = mmdas.map(mmda => { return serializer.toJSON(mmda)
       
     }).filter(mmdaa=> mmdaa.name==params.mmda)
      }

      let projectData=projects.map(project=> serializer.toJSON(project)).filter(pro=> pro.MMDA=="resource:org.gov.fundtracker.MMDA#"+data[0].id)

return response.ok(projectData)
  }

  async getById({response,params}){

    let data= await assetService.getById(
      'org.gov.fundtracker.Project',
      params.id
    )

    return response.ok(data);
  }

  async attachReceipient({request,response,params,auth}){
    let projectid=request.input('project');
    let receipientid=request.input('receipient');
    // Serialize project to Json
    await self.bizNetworkConnection.connect("admin@decentralizedgov-network");
    let serializer = self.bizNetworkConnection
     .getBusinessNetwork()
     .getSerializer(); 
     let factory = self.bizNetworkConnection.getBusinessNetwork().getFactory();

   let projectRegistry = await self.bizNetworkConnection.getAssetRegistry(
     "org.gov.fundtracker.Project"
   );

   let project= await projectRegistry.get(projectid);
   let projectinitialData= serializer.toJSON(project)
   let  projectReceipient= factory.newRelationship(
    "org.gov.fundtracker",
    "FundReceipient",
    receipientid
  );

  project.Receipient=projectReceipient

   if (projectinitialData.CAGStatus&&projectinitialData.AGDStatus&&projectinitialData.MMDAStatus&&projectinitialData.MOFStatus == "APPROVED") {

    project.ProjectStatus="APPROVED"
     
   }
   projectRegistry.update(project);
 

  let updatedProject= await projectRegistry.get(projectid);
  let updatedprojectData= serializer.toJSON(project)

  const user =await auth.getUser();
 let historian= await historianService.create({
  'controller':false,
  'transactionInvoked':'Attach Receipient',
  'Participant':'org.gov.fundtracker.FundTransferApprover#'+user.participantid,
  'projectinitial':JSON.stringify(projectinitialData),
  'projectChange':JSON.stringify(updatedprojectData),
  'initial':'',
  'change':'',
  'projectid':projectid.toString()
})
  return response.ok(historian,200);

  };

  async updateAuditorStatus({ response, request }) {
   
  }


  async getHistorian({ params, response }) {
    let history = await historianService.getById(params.id);
    // const promises= history.map(async (hist)=>{
    //   let id = hist.Participant.split("#").pop();
    //  var participant= await participantService.getById('org.gov.fundtracker.FundTransferApprover',id);
    //   if (participant.MMDA) {
    //    var mmdaid = participant.MMDA.split("#").pop();
    //    var regulator= await assetService.getById('org.gov.fundtracker.MMDA',mmdaid);
    //    var regname="MMDA"
    //   }else if(participant.MDA){
    //     var mdaid = participant.MDA.split("#").pop();
    //     var regulator= await assetService.getById('org.gov.fundtracker.MMDA',mdaid);
    //     var regname="MDA"
    //   }
    //   return {
    //     'id':hist.id,
    //     'transactioninvoked':'create one',
    //     'invokedby':participant.firstname +" "+participant.lastname,
    //     'from':regulator.name + "," +regname,
    //     'timestamp':hist.timestamp,
    //     // 'initial':JSON.parse(hist.initial),
    //     // 'change':JSON.parse(hist.change)
    //   }

   
    // });
    // const results = await Promise.all(promises)
    
    return response.ok(history);
  }



  async initiateTransfer({request,response,auth}){
    let projectid=request.input('project');
    // Serialize project to Json
    await self.bizNetworkConnection.connect("admin@decentralizedgov-network");
    let serializer = self.bizNetworkConnection
     .getBusinessNetwork()
     .getSerializer(); 
     let factory = self.bizNetworkConnection.getBusinessNetwork().getFactory();

   let projectRegistry = await self.bizNetworkConnection.getAssetRegistry(
     "org.gov.fundtracker.Project"
   );

   let project= await projectRegistry.get(projectid);
   let projectinitialData= serializer.toJSON(project)


  project.FundTransferStatus ="INITIATED"
  project.MMDAStatus="APPROVED"
  //  if (projectinitialData.CAGStatus&&projectinitialData.AGDStatus&&projectinitialData.MMDAStatus&&projectinitialData.MOFStatus == "APPROVED") {

  //   project.FundTransferStatus ="APPROVED"
     
  //  }
   projectRegistry.update(project);
 

  let updatedProject= await projectRegistry.get(projectid);
  let updatedprojectData= serializer.toJSON(project)

  const user =await auth.getUser();
 let historian= await historianService.create({
  'controller':false,
  'transactionInvoked':'Initiate FundTransfer',
  'Participant':'org.gov.fundtracker.FundTransferApprover#'+user.participantid,
  'projectinitial':JSON.stringify(projectinitialData),
  'projectChange':JSON.stringify(updatedprojectData),
  'initial':'',
  'change':'',
  'projectid':projectid.toString()
})
  return response.ok(historian,200);
  }

  async controllerapprove({request,response,auth}){
    let projectid=request.input('project');
    // Serialize project to Json
    await self.bizNetworkConnection.connect("admin@decentralizedgov-network");
    let serializer = self.bizNetworkConnection
     .getBusinessNetwork()
     .getSerializer(); 
     let factory = self.bizNetworkConnection.getBusinessNetwork().getFactory();

   let projectRegistry = await self.bizNetworkConnection.getAssetRegistry(
     "org.gov.fundtracker.Project"
   );

   let project= await projectRegistry.get(projectid);
   let projectinitialData= serializer.toJSON(project)

   let mmda=projectinitialData.MMDA;

   let budgetRegistry = await self.bizNetworkConnection.getAssetRegistry(
    "org.gov.fundtracker.Budget"
  );

  
//Get Budget Id
  let budgets = await budgetRegistry.getAll();
  let budgetinitialData=budgets.map(budget=> serializer.toJSON(budget)).filter(bud=> bud.MMDA==mmda)
 


  project.CAGStatus="APPROVED"
  project.FundTransferStatus="APPROVED"
 projectRegistry.update(project);
 

  let updatedProject= await projectRegistry.get(projectid);
  let updatedprojectData= serializer.toJSON(project)





  let  budget= await budgetRegistry.get(budgetinitialData[0].id);
  budget.allocation-=projectinitialData.allocation
   budgetRegistry.update(budget);

   let updatedBudgetData= serializer.toJSON(budget)

  
  const user =await auth.getUser();
 let historian= await historianService.create({
   'controller':true,
  'transactionInvoked':'Controller Approved',
  'Participant':'org.gov.fundtracker.FundTransferApprover#'+user.participantid,
  'projectinitial':JSON.stringify(projectinitialData),
  'projectChange':JSON.stringify(updatedprojectData),
  'initial':JSON.stringify(budgetinitialData),
  'change':JSON.stringify(updatedBudgetData),
  'projectid':projectid.toString()
})
  return response.ok(historian,200);
  }

  async mofApprove({request,response,auth}){

    let projectid=request.input('project');
    // Serialize project to Json
    await self.bizNetworkConnection.connect("admin@decentralizedgov-network");
    let serializer = self.bizNetworkConnection
     .getBusinessNetwork()
     .getSerializer(); 
     let factory = self.bizNetworkConnection.getBusinessNetwork().getFactory();

   let projectRegistry = await self.bizNetworkConnection.getAssetRegistry(
     "org.gov.fundtracker.Project"
   );

   let project= await projectRegistry.get(projectid);
   let projectinitialData= serializer.toJSON(project)


  project.MOFStatus="APPROVED"
   projectRegistry.update(project);
 

  let updatedProject= await projectRegistry.get(projectid);
  let updatedprojectData= serializer.toJSON(project)

  const user =await auth.getUser();
 let historian= await historianService.create({
  'controller':false,
  'transactionInvoked':'Ministry Of Finance Approved',
  'Participant':'org.gov.fundtracker.FundTransferApprover#'+user.participantid,
  'projectinitial':JSON.stringify(projectinitialData),
  'projectChange':JSON.stringify(updatedprojectData),
  'initial':'',
  'change':'',
  'projectid':projectid.toString()
})
  return response.ok(historian,200);

  }
  

}

module.exports = ProjectController;
