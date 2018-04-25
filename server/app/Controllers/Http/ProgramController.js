
/*eslint-disable*/
const BusinessNetworkConnection = require('composer-client').BusinessNetworkConnection;

const self = this;
class ProgramController {
  constructor() {
    self.bizNetworkConnection = new BusinessNetworkConnection();
  }
  /**
   * Create a New Asset Resource
   * @param {request}
   * @param{response}
   * @returns{response}
   */

  async create({ request, response }) {
    let id='1';
    let name=request.input('name')
    let allocation=request.input('allocation')
      let assetData = {};

    if (request.input('id')) {
      id=request.input('id');
    }
  

    await self.bizNetworkConnection.connect('admin@decentralizedgov-network');
    const factory = self.bizNetworkConnection.getBusinessNetwork().getFactory();
    const assetRegistry = await self.bizNetworkConnection.getAssetRegistry('org.gov.fundtracker.Program');

    // Serialize Asset to Json
    const serializer = self.bizNetworkConnection.getBusinessNetwork().getSerializer();

    const assetExists = await assetRegistry.exists(id);

    // check for initial id
    if (assetExists) {
      // Get Asset with Id
      const existingAsset = await assetRegistry.get(id);
      const data = serializer.toJSON(existingAsset);
      // Convert Asset of type String to integer and increment
      id = parseInt(data.id) + 1;
      // Convert back to String
      const idNumber = id.toString();
      const asset = factory.newResource('org.gov.fundtracker', 'Program', idNumber);
      asset.id = idNumber;
      asset.name = name;
     
      // Add Asset To Registry
      await assetRegistry.add(asset);
      const newAsset = await assetRegistry.get(idNumber);
      assetData = serializer.toJSON(newAsset);
    } else {
      const asset = factory.newResource('org.gov.fundtracker', 'Program', id);
      asset.id = id;
      asset.name = name;
   
      await assetRegistry.add(asset);
      // Get Asset with Id
      const newAsset = await assetRegistry.get(id);
      assetData = serializer.toJSON(newAsset);
    }

    return response.ok(assetData);
  }


  async all({ response }) {
    await self.bizNetworkConnection.connect('admin@decentralizedgov-network');
    const assetRegistry = await self.bizNetworkConnection.getAssetRegistry('org.gov.fundtracker.Program');
    // Serialize Asset to Json
    const serializer = self.bizNetworkConnection.getBusinessNetwork().getSerializer();

    const mmdas = await assetRegistry.getAll();

    var data={}
    
      if (mmdas) {
     data = mmdas.map(mmda => serializer.toJSON(mmda));

      }


    return response.ok(data);
  }

  async getById({request,response,params}){
      await self.bizNetworkConnection.connect('admin@decentralizedgov-network');
    const assetRegistry = await self.bizNetworkConnection.getAssetRegistry('org.gov.fundtracker.Program');
    // Serialize Asset to Json
    const serializer = self.bizNetworkConnection.getBusinessNetwork().getSerializer();

    const newAsset = await assetRegistry.get(params.id);

    const data= serializer.toJSON(newAsset)

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

module.exports = ProgramController;
