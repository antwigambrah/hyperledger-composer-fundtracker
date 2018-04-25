/*eslint-disable*/

const BusinessNetworkConnection = require("composer-client")
  .BusinessNetworkConnection;

const User = use("App/Models/User");

class AuthController {
  constructor(){

  }
  async register({ request, response }) {
    const user = new User();
    user.username = request.input("username");
    user.email = request.input("email");
    user.password = request.input("password");
    user.role=request.input('role')

    await user.save();

    return response.ok({
      status: 200,
      message: "User registered"
    });
  }

  async login({ request, response, auth }) {

     const user = new User();

    const token = await auth
      .withRefreshToken().attempt(request.input("id"), request.input("password"));
      let userData= await User.query().where('networkid', request.input('id'))

    return response.ok({
      status: 200,
      "token":token,
      'user':userData,
    
     
    });
  }

  async network({ request, response }) {

  const bizNetworkConnection = new BusinessNetworkConnection();
    await bizNetworkConnection.connect("admin@decentralizedgov-network");
    const factory = bizNetworkConnection.getBusinessNetwork().getFactory();
    // const owner = factory.newResource(
    //   "org.gov.fundtracker",
    //   "MMDA",
    //   "singo@carge-network"
    // );

    // owner.MMDAid = "singo@carge-network";
    // owner.Name = "singo@gmail.com";
    // owner.Region = "Kumasi";

    const driverRegistry = await bizNetworkConnection.getParticipantRegistry(
      "org.gov.fundtracker.MMDA"
    );

    // await driverRegistry.add(owner);

    const driver = await driverRegistry.get("singo@carge-network");
    const serializer = bizNetworkConnection
      .getBusinessNetwork()
      .getSerializer();

    const data = serializer.toJSON(driver);

    return response.ok({
      data
    });
  }

  async issueIdentity({ request, response }) {
    const businessNetworkConnection = new BusinessNetworkConnection();

    await businessNetworkConnection.connect("admin@decentralizedgov-network");
    const result = await businessNetworkConnection.issueIdentity(
      "org.gov.fundtracker.MMDA#bingo@carge-network",
      "bingo"
    );
    const serializer = businessNetworkConnection
      .getBusinessNetwork()
      .getSerializer(); 
    return response.ok({
      userId: result.userID,
      secret: result.userSecret
    });
  }
}

module.exports = AuthController;
