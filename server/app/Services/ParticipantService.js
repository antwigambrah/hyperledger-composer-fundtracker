/*eslint-disable*/
const BusinessNetworkConnection = require("composer-client")
  .BusinessNetworkConnection;
  const identityService=require('../Services/IdentityService')
  const authService=require('../Services/AuthService')
var self=this;
class ParticipantService {
  constructor() {
    self.bizNetworkConnection = new BusinessNetworkConnection();
  }

  async createParticipant(participant){
     let id='1'

    if (participant.id!='') {
      id=participant.id
    }
    let userIdentity={}
    await self.bizNetworkConnection.connect('admin@decentralizedgov-network');

    const factory = self.bizNetworkConnection.getBusinessNetwork().getFactory();
    const participantRegistry = await self.bizNetworkConnection.getParticipantRegistry('org.gov.fundtracker.FundTransferApprover');


    // Serialize Asset to Json
    const serializer = self.bizNetworkConnection
      .getBusinessNetwork()
      .getSerializer();

    const participantExists = await participantRegistry.exists(id);


    if (participantExists) {
      const existingparticipant = await participantRegistry.get(id);
      const data = serializer.toJSON(existingparticipant);

      id = parseInt(data.id) + 1;

      const participantId = id.toString();
      participant.id=participantId

      const participantregistry = await participantRegistry.get(participantId);
      let participantData = serializer.toJSON(participantregistry);
      // issueIdentity
       userIdentity = await identityService.issueIdentity(participantData);

      // register user with auth service
      await self.authService.register({
        firstname:participant.firstname,
        lastname:participant.lastname,
        email:participant.email,
        networkid: userIdentity.userId,
        role:participant.Role,
        password: userIdentity.userSecret,
      });
    } else {
 
      const participantregistry = await participantRegistry.get(id);

       let participantData = serializer.toJSON(participantregistry);
    userIdentity = await identityService.issueIdentity(participantData);
      // register user with auth service
      await authService.register({
        firstname:participant.firstname,
        lastname:participant.lastname,
        email:participant.email,
        networkid: userIdentity.userId,
        role:participant.role,
        password: userIdentity.userSecret
      });
    }

return userIdentity;
  }

async getById(participant,id){
  await self.bizNetworkConnection.connect("admin@decentralizedgov-network");
  let participantRegistry = await self.bizNetworkConnection.getParticipantRegistry(participant);
  const data= await participantRegistry.get(id);
  const serializer = self.bizNetworkConnection.getBusinessNetwork().getSerializer();
  if (data) {
      var assetData = serializer.toJSON(data);
  }
  return  assetData;
}
}

module.exports = new ParticipantService();
