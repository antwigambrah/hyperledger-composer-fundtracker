
/*eslint-disable*/
const BusinessNetworkConnection = require('composer-client').BusinessNetworkConnection;
  const identityService=require('../../Services/IdentityService')
  const authService=require('../../Services/AuthService')
const self = this;
class FundApproverController {
  constructor() {
    self.bizNetworkConnection = new BusinessNetworkConnection();
  }
  /**
   * Create a New Participant Resource
   * @param {request}
   * @param{response}
   * @returns{response}
   */
  async create({ request, response }) {
    let id='1';
    let firstname=request.input('firstname');
    let lastname=request.input('lastname');
    let email=request.input('email');
    let roleId=request.input('role');
    let mmdaId=request.input('mmdaid');
    let mdaId=request.input('mdaid');

      let participantData = {};
      let userIdentity={}
      let user={}

    if (request.input('id')) {
      id=request.input('id');
    }
  

    await self.bizNetworkConnection.connect('admin@decentralizedgov-network');
    const factory = self.bizNetworkConnection.getBusinessNetwork().getFactory();
    const participantRegistry = await self.bizNetworkConnection.getParticipantRegistry('org.gov.fundtracker.FundTransferApprover');
    const assetRegistry = await self.bizNetworkConnection.getAssetRegistry('org.gov.fundtracker.MMDA');
    const roleRegistry = await self.bizNetworkConnection.getAssetRegistry('org.gov.fundtracker.Role');
    // Serialize Participant to Json
    const serializer = self.bizNetworkConnection.getBusinessNetwork().getSerializer();

    const participantExists = await participantRegistry.exists(id);

    // check for initial id
    if (participantExists) {
      // Get Participant with Id
      const existingParticipant = await participantRegistry.get(id);
      const data = serializer.toJSON(existingParticipant);
      // Convert Participant of type String to integer and increment
      id = parseInt(data.id) + 1;
      // Convert back to String
      const idNumber = id.toString();
      const participant = factory.newResource('org.gov.fundtracker', 'FundTransferApprover', idNumber);
        const Role=factory.newRelationship('org.gov.fundtracker','Role',roleId)
      
        participant.id = idNumber;
        participant.firstname = firstname;
        participant.lastname=lastname;
        participant.email=email;
        participant.Role=Role
   

        if(mdaId){
          const MDA=factory.newRelationship('org.gov.fundtracker','MDA',mdaId)
            participant.MDA=MDA 
          }else{
            const MMDA=factory.newRelationship('org.gov.fundtracker','MMDA',mmdaId)
            participant.MMDA=MMDA 

              //MMDA registry 
      const mmdaAsset= await assetRegistry.get(mmdaId)
      var  assetData=serializer.toJSON(mmdaAsset);

          }

  

      // Add Participant To Registry
      await participantRegistry.add(participant);
      const newParticipant = await participantRegistry.get(idNumber);
      participantData = serializer.toJSON(newParticipant);

    const approverParticipant="org.gov.fundtracker.FundTransferApprover#"+idNumber

       // issueIdentity
       userIdentity = await identityService.issueIdentity({
        'class':approverParticipant,
        'firstname':firstname,
        'lastname':lastname,
       });
       
      var roleAsset= await roleRegistry.get(roleId)
      var  roleData=serializer.toJSON(roleAsset);
      
    if (assetData) {
       // register user with auth service
      user=await authService.register({
        firstname:firstname,
        lastname:lastname,
        email:email,
        networkid: userIdentity.userId,
         participantid:idNumber,
         mmda:assetData.name,
        role:roleData.name,
        password: userIdentity.userSecret,
      });
    }else{
       // register user with auth service
      user=await authService.register({
        firstname:firstname,
        lastname:lastname,
        email:email,
        networkid: userIdentity.userId,
        participantid:idNumber,
        role:roleData.name,
        password: userIdentity.userSecret,
      });
    }
     

    } else {
      const assetRegistry = await self.bizNetworkConnection.getAssetRegistry('org.gov.fundtracker.MMDA');
      const participant = factory.newResource('org.gov.fundtracker', 'FundTransferApprover',id);
      const Role=factory.newRelationship('org.gov.fundtracker','Role',roleId)
        participant.id = id;
        participant.firstname = firstname;
        participant.lastname=lastname;
        participant.email=email;
        participant.Role=Role

        if(mdaId){
        const MDA=factory.newRelationship('org.gov.fundtracker','MDA',mdaId)
          participant.MDA=MDA 


        }else{
          const MMDA=factory.newRelationship('org.gov.fundtracker','MMDA',mmdaId)
          participant.MMDA=MMDA 
           //MMDA registry 
      var mmdaAsset= await assetRegistry.get(mmdaId)
      var assetData=serializer.toJSON(mmdaAsset);
        }
 

    
      await participantRegistry.add(participant);
      // Get Participant with Id
      const newParticipant = await participantRegistry.get(id);
      participantData = serializer.toJSON(newParticipant);

      const approverParticipant="org.gov.fundtracker.FundTransferApprover#"+id

       // issueIdentity
       userIdentity = await identityService.issueIdentity({
        'class':approverParticipant,
        firstname:firstname,
        lastname:lastname,
       });

     var roleAsset= await roleRegistry.get(roleId)
      var  roleData=serializer.toJSON(roleAsset);

       if (assetData) {
       // register user with auth service
      user=await authService.register({
        firstname:firstname,
        lastname:lastname,
        email:email,
        networkid: userIdentity.userId,
        participantid:id,
        mmda:assetData.name,
        role:roleData.name,
        password: userIdentity.userSecret,
      });
    }else{
       // register user with auth service
      user=await authService.register({
        firstname:firstname,
        lastname:lastname,
        email:email,
        networkid: userIdentity.userId,
        participantid:id,
        role:roleData.name,
        password: userIdentity.userSecret,
      });
    }

    }

    return response.ok({
      'participant':participantData,
      "useridentity":userIdentity
    });
  }


async approveProject({response,request}){
  
}
  async all({ response }) {
   await self.bizNetworkConnection.connect("admin@decentralizedgov-network");
    let approverRegistry = await self.bizNetworkConnection.getParticipantRegistry(
      "org.gov.fundtracker.FundTransferApprover"
    );
    let mmdaRegistry = await self.bizNetworkConnection.getAssetRegistry(
      "org.gov.fundtracker.MMDA"
    );
     let mdaRegistry = await self.bizNetworkConnection.getAssetRegistry(
      "org.gov.fundtracker.MDA"
    );

     let roleRegistry = await self.bizNetworkConnection.getAssetRegistry(
      "org.gov.fundtracker.Role"
    );
    // Serialize project to Json
    let serializer = self.bizNetworkConnection
      .getBusinessNetwork()
      .getSerializer();
    let approvers = await approverRegistry.getAll();
    let approverData= approvers.map(approver => {
      return serializer.toJSON(approver);
    });
   
      const promises=approverData.map(async (approver)=>{

          var regulator='';

            if (approver.MMDA) {

               let id = approver.MMDA.split("#").pop();
               const data = await mmdaRegistry.get(id)
               var mmdaData= serializer.toJSON(data);
                regulator=mmdaData.name;

            } else if (approver.MDA) {

               let id = approver.MDA.split("#").pop();
               const data = await mdaRegistry.get(id)
               var mdaData= serializer.toJSON(data);
               regulator=mdaData.name


            }

             let roleid = approver.Role.split("#").pop();
               const roledata = await roleRegistry.get(roleid)
               var roleData= serializer.toJSON(roledata);



            return {
              'id':approver.id,
               'name':approver.firstname + ' '+approver.lastname,
               'role':roleData.name,
               'mmda or mda':regulator,        
            }
      })

      const results = await Promise.all(promises)
   
    return response.ok(results);
  }

  async getById({request,response,params,auth}){
    const user= await auth.getUser();
      await self.bizNetworkConnection.connect('admin@decentralizedgov-network');
    const ParticipantRegistry = await self.bizNetworkConnection.getParticipantRegistry('org.gov.fundtracker.FundTransferApprover');
    // Serialize Participant to Json
    const serializer = self.bizNetworkConnection.getBusinessNetwork().getSerializer();

    const newParticipant = await ParticipantRegistry.get(params.id);

    const data= serializer.toJSON(newParticipant)

    return response.ok(data)

  }
  
  async initiateProject({request,response}){
    let projectId=request.input('projectId');
    let mmdaId=request.input('mmdaId')

      await self.bizNetworkConnection.connect('admin@decentralizedgov-network');

    let serializer =  self.bizNetworkConnection.getBusinessNetwork().getSerializer();

let resource = serializer.fromJSON({
  '$class': 'org.gov.fundtracker.initiateProject',
  'project': {
    '$class': 'org.gov.fundtracker.Project',
    'Id':projectId,
    'MMDA':'resource:org.gov.fundtracker#MMDA'+mmdaId
  }
});

    let transaction=await this.bizNetworkConnection.submitTransaction(resource);
    let data=serializer.toJSON(transaction)

    return response.ok(data)
  }
}

module.exports = FundApproverController;
