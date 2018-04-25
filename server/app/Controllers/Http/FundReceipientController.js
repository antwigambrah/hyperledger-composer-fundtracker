
/*eslint-disable*/
const BusinessNetworkConnection = require('composer-client').BusinessNetworkConnection;

const self = this;
class FundReceipientController {
  constructor() {
    self.bizNetworkConnection = new BusinessNetworkConnection();
  }
  /**
   * Create a New FundReceipient 
   * 
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

    if (request.input("id")) {
      id = parseInt(request.input("id")) + 1;
    }

  

    await self.bizNetworkConnection.connect('admin@decentralizedgov-network');
    const factory = self.bizNetworkConnection.getBusinessNetwork().getFactory();
    const participantRegistry = await self.bizNetworkConnection.getParticipantRegistry('org.gov.fundtracker.FundReceipient');

    // Serialize Participant to Json
    const serializer = self.bizNetworkConnection.getBusinessNetwork().getSerializer()

      const participant = factory.newResource('org.gov.fundtracker', 'FundReceipient', id.toString());
      participant.id = id.toString();
      participant.name = name;
      participant.email=email;
      participant.receipienttype=receipienttype
      participant.mobile=mobile;
      participant.accountnumber=accountnumber
      participant.tin=tin
      participant.bank=bank
      await participantRegistry.add(participant);
      // Get Participant with Id
      const newParticipant = await participantRegistry.get(id.toString());
      participantData = serializer.toJSON(newParticipant);
   
    return response.ok(participantData);
  }

/**
 * Get All FundReceipient
 * 
 * @param {any} { response } 
 * @returns 
 * @memberof FundReceipientController
 */
async all({ response }) {
    await self.bizNetworkConnection.connect('admin@decentralizedgov-network');
    const participantRegistry = await self.bizNetworkConnection.getParticipantRegistry('org.gov.fundtracker.FundReceipient');
    // Serialize Participant to Json
    const serializer = self.bizNetworkConnection.getBusinessNetwork().getSerializer();

    const participant = await participantRegistry.getAll();
    if (participant) {

   var data = participant.map(participant => serializer.toJSON(participant));
    }
    return response.ok(data);
  }
/**
 * Get FundReceipient By Id
 * 
 * @param {any} {request,response,params} 
 * @returns response
 * @memberof FundReceipientController
 */
async getById({request,response,params}){
      await self.bizNetworkConnection.connect('admin@decentralizedgov-network');
    const ParticipantRegistry = await self.bizNetworkConnection.getParticipantRegistry('org.gov.fundtracker.MMDA');
    // Serialize Participant to Json
    const serializer = self.bizNetworkConnection.getBusinessNetwork().getSerializer();

    const newParticipant = await ParticipantRegistry.get(params.id);

    const data= serializer.toJSON(newParticipant)

    return response.ok(data)

  }

}

module.exports =  FundReceipientController;
