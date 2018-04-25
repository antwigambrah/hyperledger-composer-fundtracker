
/*eslint-disable*/
const BusinessNetworkConnection = require('composer-client').BusinessNetworkConnection;
  const identityService=require('../../Services/IdentityService')
  const authService=require('../../Services/AuthService').default
const self = this;
class FundApproverController {
  
  /**
   * Creates an instance of FundApproverController.
   * @memberof FundApproverController
   */
  constructor() {
    self.bizNetworkConnection = new BusinessNetworkConnection();
  }

  /**
   * Create a new FundApprover Participant
   * if id is available in request set id to requestId
   * if id is abscent set id to 1
   * Issue Identity to User
   * Register user with auth service
   * 
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

      let userIdentity={}
      let user={}

    if (request.input('id')) {
      id = parseInt(request.input("id")) + 1;
    }
  

    await self.bizNetworkConnection.connect('admin@decentralizedgov-network');
    const factory = self.bizNetworkConnection.getBusinessNetwork().getFactory();
    const participantRegistry = await self.bizNetworkConnection.getParticipantRegistry('org.gov.fundtracker.FundTransferApprover');
    const assetRegistry = await self.bizNetworkConnection.getAssetRegistry('org.gov.fundtracker.MMDA');
    const roleRegistry = await self.bizNetworkConnection.getAssetRegistry('org.gov.fundtracker.Role');
    // Serialize Participant to Json
    const serializer = self.bizNetworkConnection.getBusinessNetwork().getSerializer();

    const participantExists = await participantRegistry.exists(id);
       
      const participant = factory.newResource('org.gov.fundtracker', 'FundTransferApprover',id.toString());
      const Role=factory.newRelationship('org.gov.fundtracker','Role',roleId)
        participant.id = id.toString();
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
           //Get MMDA by id
      var mmdaAsset= await assetRegistry.get(mmdaId)
      var mmdaData=serializer.toJSON(mmdaAsset);
        }
       //Add new participant to registry
      await participantRegistry.add(participant);
      // Get Participant with Id
      const newParticipant = await participantRegistry.get(id.toString());
      var  participantData = serializer.toJSON(newParticipant);
    

       // issueIdentity
       userIdentity = await identityService.issueIdentity({
        'class':"org.gov.fundtracker.FundTransferApprover#"+id.toString(),
        firstname:firstname,
        lastname:lastname,
       });

       //Get Role By Id
     var roleAsset= await roleRegistry.get(roleId)
      var roleData=serializer.toJSON(roleAsset);

       if (mmdaData) {
       // register user with auth service
      user=await authService.register({
        firstname:firstname,
        lastname:lastname,
        email:email,
        networkid: userIdentity.userId,
        participantid:id,
        mmda:mmdaData.name,
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



    return response.ok({
      'participant':participantData,
      "useridentity":userIdentity
    });
  }

/**
 * Get All FundApprovers
 * Include MMDA,MDA,ROLE,
 * 
 * @param {any} { response } 
 * @returns response 
 * @memberof FundApproverController
 */
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
/**
 * Get FundApprover By Id
 * 
 * @param {any} {request,response,params,auth} 
 * @returns response
 * @memberof FundApproverController
 */
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

}

module.exports = FundApproverController;
