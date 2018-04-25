/*eslint-disable*/

const BusinessNetworkConnection = require("composer-client")
  .BusinessNetworkConnection;

const self = this;

class FundSourceController {
  
  /**
   * Creates an instance of FundSourceController.
   * @memberof FundSourceController
   */
  constructor() {
    self.bizNetworkConnection = new BusinessNetworkConnection();
  }
  /**
   * Create a New FundSource
   *
   * @param {request}
   * @param{response}
   * @returns{response}
   */

  async create({ request, response }) {
    let id = "1";
    let name = "hello";
    let allocation = parseFloat(request.input("allocation"));
    let accountnumber = request.input("accountnumber");
    let bank = request.input("bank");
    let mmdaid = request.input("mmdaid");

    if (request.input("id")) {
      id = parseInt(request.input("id")) + 1;
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
    let asset = factory.newResource(
      "org.gov.fundtracker",
      "Fund",
      id.toString()
    );
    const mmda = factory.newRelationship("org.gov.fundtracker", "MMDA", mmdaid);
    asset.id = id.toString();
    asset.name = name;
    asset.allocation = allocation;
    asset.accountnumber = "232323232232323";
    asset.bank = "Central Bank";
    asset.MMDA = mmda;
    await assetRegistry.add(asset);
    //Get Asset with Id
    let newAsset = await assetRegistry.get(id.toString());
    var assetData = serializer.toJSON(newAsset);

    return response.ok(assetData);
  }

  /**
   * Get All FundSource
   *
   * @param {any} { response }
   * @returns
   * @memberof FundSourceController
   */
  async all({ response }) {
    await self.bizNetworkConnection.connect("admin@decentralizedgov-network");
    let assetRegistry = await self.bizNetworkConnection.getAssetRegistry(
      "org.gov.fundtracker.Fund"
    );

    let serializer = self.bizNetworkConnection
      .getBusinessNetwork()
      .getSerializer();

    let funds = await assetRegistry.getAll();

    if (funds) {
      var data = funds.map(funds => {
        return serializer.toJSON(funds);
      });
    }

    return response.ok(data);
  }
}

module.exports = FundSourceController;
