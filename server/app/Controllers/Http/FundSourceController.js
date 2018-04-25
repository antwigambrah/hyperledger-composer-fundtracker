/*eslint-disable*/

const BusinessNetworkConnection = require("composer-client").BusinessNetworkConnection;

const self = this;

class FundSourceController {
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
    let id="1"
    let name = "hello"
    let allocation=parseFloat(request.input('allocation'))
    let accountnumber=request.input('accountnumber')
    let bank=request.input('bank')
    let mmdaid=request.input('mmdaid')
    let assetData = {};

    if(request.input('id')){
      id=request.input('id')
    }

    await self.bizNetworkConnection.connect("admin@decentralizedgov-network");
    let factory = self.bizNetworkConnection.getBusinessNetwork().getFactory();
    let assetRegistry = await self.bizNetworkConnection.getAssetRegistry(
      "org.gov.fundtracker.Fund"
    );

    //Serialize Asset to Json
    let serializer = self.bizNetworkConnection
      .getBusinessNetwork()
      .getSerializer();

    let assetExists = await assetRegistry.exists(id);

    //check for initial id
    if (assetExists) {
      //Get Asset with Id
      let existingAsset = await assetRegistry.get(id);
      let data = serializer.toJSON(existingAsset);
      //Convert Asset of type String to integer and increment
      id = parseInt(data.id) + 1;
      //Convert back to String
      let idNumber = id.toString();
      let asset = factory.newResource("org.gov.fundtracker", "Fund", idNumber);

       const mmda= factory.newRelationship('org.gov.fundtracker','MMDA', mmdaid);

      asset.id = idNumber;
      asset.name = name;
      asset.allocation=allocation
      asset.accountnumber='232899797979'
      asset.bank='Central Bank'
      asset.MMDA=mmda
      //Add Asset To Registry
      await assetRegistry.add(asset);
      let newAsset = await assetRegistry.get(idNumber);
      assetData = serializer.toJSON(newAsset);
    } else {
      let asset = factory.newResource("org.gov.fundtracker", "Fund", id);
      const mmda = factory.newRelationship('org.gov.fundtracker','MMDA', mmdaid);
      asset.id = id;
      asset.name = name;
      asset.allocation=allocation
      asset.accountnumber='232323232232323'
      asset.bank='Central Bank'
      asset.MMDA=mmda
      await assetRegistry.add(asset);
      //Get Asset with Id
      let newAsset = await assetRegistry.get(id);
      assetData = serializer.toJSON(newAsset);
    }

    return response.ok(assetData);
  }

 async all({ response }) {
    await self.bizNetworkConnection.connect('admin@decentralizedgov-network');
    let assetRegistry = await self.bizNetworkConnection.getAssetRegistry('org.gov.fundtracker.Fund');

    let serializer = self.bizNetworkConnection.getBusinessNetwork().getSerializer();

    let funds= await assetRegistry.getAll();

    

    let data = {}

    if (funds) {
    	data=funds.map((funds)=>{

    	return serializer.toJSON(funds)
    });
    }

    return response.ok(data)

  }



  async getById({ request, response }) {}

  async getAll({ request, response }) {}
}


module.exports = FundSourceController;
