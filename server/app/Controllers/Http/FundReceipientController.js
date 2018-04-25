
/*eslint-disable*/
const BusinessNetworkConnection = require('composer-client').BusinessNetworkConnection;

const self = this;
class FundReceipientController {
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
    let id='1'
    let name=request.input('name')
    let receipienttype=request.input('receipienttype')
    let email=request.input('email')
    let mobile=request.input('mobile')
    let accountnumber=request.input('accountnumber')
    let tin=request.input("tin")
    let bank=request.input("bank")
    let participantData = {};



 if (request.input('id')) {
  id=request.input('id')
 }
  

    await self.bizNetworkConnection.connect('admin@decentralizedgov-network');
    const factory = self.bizNetworkConnection.getBusinessNetwork().getFactory();
    const participantRegistry = await self.bizNetworkConnection.getParticipantRegistry('org.gov.fundtracker.FundReceipient');

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
      const participant = factory.newResource('org.gov.fundtracker', 'FundReceipient', idNumber);
      participant.id = idNumber;
      participant.name = name;
      participant.email=email;
      participant.receipienttype=receipienttype
      participant.mobile=mobile;
      participant.accountnumber=accountnumber
      participant.tin=tin
      participant.bank=bank
      // Add Participant To Registry
      await participantRegistry.add(participant);
      const newParticipant = await participantRegistry.get(idNumber);
      participantData = serializer.toJSON(newParticipant);
    } else {
      const participant = factory.newResource('org.gov.fundtracker', 'FundReceipient', id);
      participant.id = id;
        participant.name = name;
      participant.email=email;
      participant.receipienttype=receipienttype
      participant.mobile=mobile;
      participant.accountnumber=accountnumber
      participant.tin=tin
      participant.bank=bank
      await participantRegistry.add(participant);
      // Get Participant with Id
      const newParticipant = await participantRegistry.get(id);
      participantData = serializer.toJSON(newParticipant);
    }

    return response.ok(participantData);
  }


  async all({ response }) {
    await self.bizNetworkConnection.connect('admin@decentralizedgov-network');
    const participantRegistry = await self.bizNetworkConnection.getParticipantRegistry('org.gov.fundtracker.FundReceipient');
    // Serialize Participant to Json
    const serializer = self.bizNetworkConnection.getBusinessNetwork().getSerializer();

    const participant = await participantRegistry.getAll();

    var data={}

    if (participant) {

   data = participant.map(participant => serializer.toJSON(participant));
    }


    return response.ok(data);
  }

  async getById({request,response,params}){
      await self.bizNetworkConnection.connect('admin@decentralizedgov-network');
    const ParticipantRegistry = await self.bizNetworkConnection.getParticipantRegistry('org.gov.fundtracker.MMDA');
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

module.exports =  FundReceipientController;
