/*eslint-disable*/
const User = use('App/Models/User');

class AuthService {
  async register(credentials) {
    const user = new User();
    user.firstname = credentials.firstname;
    user.lastname = credentials.lastname;
    user.email = credentials.email;
    user.role = credentials.role;
    user.networkid = credentials.networkid;
    user.participantid=credentials.participantid;
    user.mmda = credentials.mmda;
    user.password = credentials.password;

    await user.save();
  }


  async logout() {

  }
}

module.exports = new AuthService();
