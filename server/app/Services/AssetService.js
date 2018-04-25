/*eslint-disable*/
const BusinessNetworkConnection = require("composer-client")
  .BusinessNetworkConnection;

const self = this;
class AssetService {
  /**
   * Creates an instance of AssetService.
   * @memberof AssetService
   */
  constructor() {
    self.bizNetworkConnection = new BusinessNetworkConnection();
  
  }
  
/**
 * Create a New Composer Asset
 * if asset exists increase id by one 
 * if asset does not exist add to registry 
 * @param {any} asset 
 * @returns asset
 * @memberof AssetService
 */
async createAsset(asset) {
    let id = asset.id;
    let assetData = {};
    await self.bizNetworkConnection.connect("admin@decentralizedgov-network");
    const assetRegistry = await self.bizNetworkConnection.getAssetRegistry(
      asset.$class
    );
    const serializer = self.bizNetworkConnection.getBusinessNetwork().getSerializer();
    const factory = self.bizNetworkConnection.getBusinessNetwork().getFactory();

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
      asset.id = idNumber;
      // Add Asset To Registry
      const approverResource = [asset];
      await assetRegistry.addAll([serializer.fromJSON(approverResource[0])]);

      const newAsset = await assetRegistry.get(idNumber);
      assetData = serializer.toJSON(newAsset);
    } else {
      // Add Asset To Registry
      const approverResource = [asset];
      await assetRegistry.addAll([serializer.fromJSON(approverResource[0])]);

      // Get Asset with Id
      const newAsset = await assetRegistry.get(id);
      assetData = serializer.toJSON(newAsset);
    }
    return assetData;
  }
  
/**
 *Get All Asset From Registry 
 *
 * @param {any} asset 
 * @returns  asset
 */
async all(asset) {
    await self.bizNetworkConnection.connect("admin@decentralizedgov-network");
    let assetRegistry = await self.bizNetworkConnection.getAssetRegistry(asset);
    const serializer = self.bizNetworkConnection.getBusinessNetwork().getSerializer();
    const factory = self.bizNetworkConnection.getBusinessNetwork().getFactory();
    let assets = await assetRegistry.getAll();
    if (assets) {
      var data= assets.map(asset => serializer.toJSON(asset));
    }

    return data;
  }
  /**
   * Get Asset By Id from Registry
   * 
   * @param {any} asset 
   * @param {any} id 
   * @returns 
   * @memberof AssetService
   */
  async getById(asset,id) {
    await self.bizNetworkConnection.connect("admin@decentralizedgov-network");
    let assetRegistry = await self.bizNetworkConnection.getAssetRegistry(asset);
    const data= await assetRegistry.get(id);
    const serializer = self.bizNetworkConnection.getBusinessNetwork().getSerializer();
    if (data) {
        var assetData = serializer.toJSON(data);
    }
    return  assetData;
  }

}

module.exports = new AssetService();
