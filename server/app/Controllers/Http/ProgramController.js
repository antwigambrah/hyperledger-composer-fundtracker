/*eslint-disable*/
const BusinessNetworkConnection = require("composer-client")
  .BusinessNetworkConnection;

const self = this;
class ProgramController {
  /**
   * Creates an instance of ProgramController.
   * @memberof ProgramController
   */
  constructor() {
    self.bizNetworkConnection = new BusinessNetworkConnection();
  }

  /**
   * Create a New Program
   * @param {request}
   * @param{response}
   * @returns{response}
   */

  async create({ request, response }) {
    let id = "1";
    let name = request.input("name");
    let allocation = request.input("allocation");
    let assetData = {};

    if (request.input("id")) {
      id = parseInt(request.input("id")) + 1;
    }

    await self.bizNetworkConnection.connect("admin@decentralizedgov-network");
    const factory = self.bizNetworkConnection.getBusinessNetwork().getFactory();
    const assetRegistry = await self.bizNetworkConnection.getAssetRegistry(
      "org.gov.fundtracker.Program"
    );

    // Serialize Asset to Json
    const serializer = self.bizNetworkConnection
      .getBusinessNetwork()
      .getSerializer();

    const asset = factory.newResource("org.gov.fundtracker", "Program", id.toString());
    asset.id = id.toString();
    asset.name = name;

    await assetRegistry.add(asset);
    // Get Asset with Id
    const newAsset = await assetRegistry.get(id.toString());
    assetData = serializer.toJSON(newAsset);

    return response.ok(assetData);
  }

  /**
   * Get All Program
   * 
   * @param {any} { response } 
   * @returns 
   * @memberof ProgramController
   */
  async all({ response }) {
    await self.bizNetworkConnection.connect("admin@decentralizedgov-network");
    const assetRegistry = await self.bizNetworkConnection.getAssetRegistry(
      "org.gov.fundtracker.Program"
    );
    // Serialize Asset to Json
    const serializer = self.bizNetworkConnection
      .getBusinessNetwork()
      .getSerializer();

    const mmdas = await assetRegistry.getAll();

    if (mmdas) {
      var data = mmdas.map(mmda => serializer.toJSON(mmda));
    }

    return response.ok(data);
  }
/**
 * Get Program By Id
 * 
 * @param {any} { request, response, params } 
 * @returns 
 * @memberof ProgramController
 */
async getById({ request, response, params }) {
    await self.bizNetworkConnection.connect("admin@decentralizedgov-network");
    const assetRegistry = await self.bizNetworkConnection.getAssetRegistry(
      "org.gov.fundtracker.Program"
    );
    // Serialize Asset to Json
    const serializer = self.bizNetworkConnection
      .getBusinessNetwork()
      .getSerializer();

    const newAsset = await assetRegistry.get(params.id);
    const data = serializer.toJSON(newAsset);
    return response.ok(data);
  }
}

module.exports = ProgramController;
