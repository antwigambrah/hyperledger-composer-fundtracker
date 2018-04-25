/*eslint-disable*/
const BusinessNetworkConnection = require("composer-client")
.BusinessNetworkConnection;
const assetService =require('../Services/AssetService')
const uuid=require('uuid/v4')
var self=this;
class HistorianService {
    /**
     * Creates an instance of HistorianService.
     * @memberof HistorianService
     */
    constructor(){
        self.bizNetworkConnection = new BusinessNetworkConnection(); 
    }
/**
 * Create New Historian
 * 
 * @param {any} historian 
 * @returns 
 * @memberof HistorianService
 */
async create(historian){
    let id = uuid();
    await self.bizNetworkConnection.connect("admin@decentralizedgov-network");
    const assetRegistry = await self.bizNetworkConnection.getAssetRegistry(
      'org.gov.fundtracker.Historian'
    );
    const serializer = self.bizNetworkConnection.getBusinessNetwork().getSerializer();
    const factory = self.bizNetworkConnection.getBusinessNetwork().getFactory();
    let now=new Date();
      
    const asset = factory.newResource("org.gov.fundtracker", "Historian", id);

    asset.id = id;
    asset.transactionInvoked=historian.transactionInvoked



 if (historian.controller==true) {
    asset.initial=historian.initial
    asset.change=historian.change
    asset.projectintial=historian.projectinitial
    asset.projectChange=historian.projectChange
 } else{
    if(historian.initial!=''){
        asset.initial=historian.initial
        asset.change=historian.change
    }else if(historian.projectinitial!=''){
        asset.projectintial=historian.projectinitial
        asset.projectChange=historian.projectChange
    }
 }
  
    asset.timestamp=now
    asset.projectid=historian.projectid
    asset.Participant=historian.Participant


    await assetRegistry.add(asset);
    // Get Asset with Id
    const newAsset = await assetRegistry.get(id);
    let assetData = serializer.toJSON(newAsset);

    return assetData
}
/**
 * Get Historian By Id
 * 
 * @param {any} id 
 * @returns 
 * @memberof HistorianService
 */
async getById (id){
    await self.bizNetworkConnection.connect("admin@decentralizedgov-network");
    let assetRegistry = await self.bizNetworkConnection.getAssetRegistry('org.gov.fundtracker.Historian');
    const serializer = self.bizNetworkConnection.getBusinessNetwork().getSerializer();
    const factory = self.bizNetworkConnection.getBusinessNetwork().getFactory();
    let assets = await assetRegistry.getAll();
    if (assets) {
      var data= assets.map(asset => serializer.toJSON(asset)).filter(historian=> historian.projectid==id);
    }

    return data;
}
/**
 * Update Historian By Id
 * 
 * @param {any} id 
 * @memberof HistorianService
 */
async update(id){
    let historian=this.getById(id);
    await self.bizNetworkConnection.connect("admin@decentralizedgov-network");
    const assetRegistry = await self.bizNetworkConnection.getAssetRegistry(
      'org.gov.fundtracker.Historian'
    );
    const asset = await assetRegistry.get(historian.id);
}

}
module.exports = new HistorianService();
