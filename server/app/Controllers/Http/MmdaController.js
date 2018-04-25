/*eslint-disable*/
const BusinessNetworkConnection = require("composer-client").BusinessNetworkConnection;
const assetService = require("../../Services/AssetService");
const self = this;

class MmdaController {
  /**
   * Creates an instance of MmdaController.
   * @memberof MmdaController
   */
  constructor() {
    self.bizNetworkConnection = new BusinessNetworkConnection();
    self.networknamespace='org.gov.fundtracker.MMDA'
  }
  /**
   * Create a New MMDA Asset
   * if id is available in request set id to requestId
   * if id is abscent set id to 1
   * @param {request} request
   * @param{response} response
   * @returns{response} response
   */
  async create({ request, response }) {
    let id = "1";
    let name = request.input("name");
    let region = request.input("region");
    let assetData = {};

    if (request.input("id")) {
      id = request.input("id");
    }

    const asset = await assetService.createAsset({
      id:id,
      $class:self.networknamespace,
      name:name.trim(),
      Region:region.trim()
    })

    return response.ok(asset);
  }

  /**
   * Get All MMDA 
   * 
   * @param {response} { response } 
   * @returns response
   */
  async all({ response }) {
    let mmdas= await assetService.all(self.networknamespace);
    return response.ok(mmdas);
  }
/**
 * Get MMDA by Id
 * 
 * @param {request,response,params} { request, response, params } 
 * @returns response
 */
async getById({ request, response, params }) {
    let mmda= await assetService.getById(self.networknamespace,params.id);
    return response.ok(mmda);
  }

}

module.exports = MmdaController;
