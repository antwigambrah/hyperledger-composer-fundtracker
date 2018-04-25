/*eslint-disable*/

const BusinessNetworkConnection = require("composer-client").BusinessNetworkConnection;
const assetService =require('../../Services/AssetService')
const self = this;

class BudgetController {
  /**
   * Creates an instance of BudgetController.
   * @memberof BudgetController
   */
  constructor() {
    self.bizNetworkConnection = new BusinessNetworkConnection();
  }
  /**
   * Create a New Budget Asset
   * if id is available in request set id to requestId
   * if id is abscent set id to 1
   * @param {request}
   * @param{response}
   * @returns{response}
   */

  async create({ request, response }) {
    let id="1"
    let allocation=parseFloat(request.input('allocation'))
    let mmdaid=request.input('mmda')
    let year= new Date();
    let assetData = {};

    if (request.input("id")) {
      id = parseInt(request.input("id")) + 1;
    }

    await self.bizNetworkConnection.connect("admin@decentralizedgov-network");
    let factory = self.bizNetworkConnection.getBusinessNetwork().getFactory();
    let assetRegistry = await self.bizNetworkConnection.getAssetRegistry(
      "org.gov.fundtracker.Budget"
    );

    //Serialize Asset to Json
    let serializer = self.bizNetworkConnection
      .getBusinessNetwork()
      .getSerializer();


      let asset = factory.newResource("org.gov.fundtracker", "Budget", id.toString());
      const mmda = factory.newRelationship('org.gov.fundtracker','MMDA', mmdaid);
      asset.id = id.toString();
      asset.year=year
      asset.allocation=allocation
      asset.IGF=request.input('igf')
      asset.GOG=request.input('gog')
      asset.CFC=request.input('cfc')
      asset.CIDA=request.input('cida')
      asset.DDF=request.input('ddf')
      asset.UDG=request.input("udg")
      asset.MMDA=mmda
      await assetRegistry.add(asset);
      //Get Asset with Id
      let newAsset = await assetRegistry.get(id);
      assetData = serializer.toJSON(newAsset);
    
    return response.ok(assetData);
  }
/**
 * Get All Budget Asset
 * 
 * @param {response} { response } 
 * @returns  response
 */
async all({ response }) {
  await self.bizNetworkConnection.connect("admin@decentralizedgov-network");
    let budgetRegistry = await self.bizNetworkConnection.getAssetRegistry(
      "org.gov.fundtracker.Budget"
    );
    let mmdaRegistry = await self.bizNetworkConnection.getAssetRegistry(
      "org.gov.fundtracker.MMDA"
    );
    // Serialize project to Json
    let serializer = self.bizNetworkConnection
      .getBusinessNetwork()
      .getSerializer();
    let budgets = await budgetRegistry.getAll();
    let budgetData= budgets.map(budget => {
      return serializer.toJSON(budget);
    });

      const promises=budgetData.map(async (budget)=>{
            if (budget.MMDA) {
               let id = budget.MMDA.split("#").pop();
               const data = await mmdaRegistry.get(id)
               var mmdaData= serializer.toJSON(data);
            }
            return {
               'id':budget.id,
               'allocation':budget.allocation,
               'mmda':mmdaData.name,
                'mmdaid':mmdaData.id,
               'region':mmdaData.Region,
               'igf':budget.IGF,
               'cfc':budget.CFC,
               'cida':budget.CIDA,
               'ddf':budget.DDF,
               'udg':budget.UDG,
               'gog':budget.GOG
          
           
            }
      })

      const results = await Promise.all(promises)
   
    return response.ok(results);

  }

}


module.exports = BudgetController;
