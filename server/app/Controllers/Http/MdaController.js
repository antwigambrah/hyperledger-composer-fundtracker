/*eslint-disable*/

const BusinessNetworkConnection = require("composer-client")
  .BusinessNetworkConnection;
const assetService = require("../../Services/AssetService");
const self = this;

class MdaController {
  /**
   * Creates an instance of MdaController.
   * @memberof MdaController
   */
  constructor() {
    self.bizNetworkConnection = new BusinessNetworkConnection();
    self.networknamespace='org.gov.fundtracker.MDA'
  }

  /**
   * Create a New Mda Asset
   *  if id is available in request set id to requestId
   * if id is abscent set id to 1
   * @param {request} request
   * @param{response} response
   * @returns{response} response
   */

  async create({ request, response }) {
    let id = "1";
    let name = request.input("name");
    let assetData = {};
    if (request.input("id")) {
      id = request.input("id");
    }
    const asset = await assetService.createAsset({
      id: id,
      $class:self.networknamespace,
      name: request.input("name").trim()
    });

    return response.ok(asset);
  }
/**
 * Get All Mda
 * 
 * @param {response} { response } 
 * @returns {response} {response}
 */
async all({ response }) {
      let mdas= await assetService.all(self.networknamespace);
      return response.ok(mdas);
  }

  async getById({ request, response ,params}) {
    let mda= await assetService.getById(self.networknamespace,params.id);
    return response.ok(mda);
  }


}

module.exports = MdaController;
