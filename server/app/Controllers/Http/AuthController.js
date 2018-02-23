'use strict'
const User=use('App/Models/User')
class AuthController {
    /**
     * 
     * @param {*} param0 
     */
    async register({request,response}){
        const user = new User()
        user.username = request.input('username')
        user.email = request.input('email')
        user.password = request.input('password')
    
        await user.save()
    
        return response.ok({
          status: 200,
          message: 'User registered'
        })
    
    }
    /**
     * 
     * @param {*} param0 
     */
    async login({ request,response,auth }) {

        const token = await auth.withRefreshToken().attempt(request.input('email'), request.input('password'))
        
        return response.ok({
          status: 200,
          token: token
        })
      }
}

module.exports = AuthController
