/*eslint-disable*/

const BusinessNetworkConnection = require("composer-client")
  .BusinessNetworkConnection;

const User = use("App/Models/User");

class AuthController {
  /**
   * Register a New User
   *
   * @param {any} { request, response }
   * @returns response
   * @memberof AuthController
   */
  async register({ request, response }) {
    const user = new User();
    user.username = request.input("username");
    user.email = request.input("email");
    user.password = request.input("password");
    user.role = request.input("role");

    await user.save();

    return response.ok({
      status: 200,
      message: "User registered"
    });
  }

  /**
   * Login User
   * Generate bearer token for user
   *
   * @param {any} { request, response, auth }
   * @returns response
   * @memberof AuthController
   */
  async login({ request, response, auth }) {
    const user = new User();

    const token = await auth
      .withRefreshToken()
      .attempt(request.input("id"), request.input("password"));
    let userData = await User.query().where("networkid", request.input("id"));

    return response.ok({
      status: 200,
      token: token,
      user: userData
    });
  }
}

module.exports = AuthController;
