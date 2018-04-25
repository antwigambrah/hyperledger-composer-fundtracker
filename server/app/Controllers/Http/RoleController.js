
/*eslint-disable*/
const BusinessNetworkConnection = require('composer-client').BusinessNetworkConnection;

const self = this;
class RoleController {
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
      if (request.input("id")) {
        id = parseInt(request.input("id")) + 1;
      }

    await self.bizNetworkConnection.connect('admin@decentralizedgov-network');
    const factory = self.bizNetworkConnection.getBusinessNetwork().getFactory();
    const assetRegistry = await self.bizNetworkConnection.getAssetRegistry('org.gov.fundtracker.Role');

    // Serialize Asset to Json
    const serializer = self.bizNetworkConnection.getBusinessNetwork().getSerializer();

 
      const asset = factory.newResource('org.gov.fundtracker', 'Role', id.toString());
      asset.id = id.toString();
      asset.name = name;
   
      await assetRegistry.add(asset);
      // Get Asset with Id
      const newAsset = await assetRegistry.get(id.toString());
          var  assetData = serializer.toJSON(newAsset);
  

    return response.ok(assetData);
  }

/**
 * Get All Roles
 * 
 * @param {any} { response } 
 * @returns 
 * @memberof RoleController
 */
async all({ response }) {
    await self.bizNetworkConnection.connect('admin@decentralizedgov-network');
    const assetRegistry = await self.bizNetworkConnection.getAssetRegistry('org.gov.fundtracker.Role');

    // Serialize Asset to Jsons
    const serializer = self.bizNetworkConnection.getBusinessNetwork().getSerializer();
    const roles = await assetRegistry.getAll();

      if (roles) {
     var data = roles.map(role=> serializer.toJSON(role));
      }
    return response.ok(data);
  }
/**
 * Get Role By Id
 * 
 * @param {any} {request,response,params} 
 * @returns 
 * @memberof RoleController
 */
async getById({request,response,params}){
      await self.bizNetworkConnection.connect('admin@decentralizedgov-network');
    const assetRegistry = await self.bizNetworkConnection.getAssetRegistry('org.gov.fundtracker.Role');
    // Serialize Asset to Json
    const serializer = self.bizNetworkConnection.getBusinessNetwork().getSerializer();

    const newAsset = await assetRegistry.get(params.id);

    const data= serializer.toJSON(newAsset)

    return response.ok(data)

  }
  

}

module.exports = RoleController;
