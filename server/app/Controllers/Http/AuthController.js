'use strict'
const User=use('App/Models/User')
class AuthController {
    /**
     * 
     * @param {*} param0 
     */
    register({request,response}){
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
}

module.exports = AuthController
