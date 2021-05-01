'use strict'

const {validate} = use('Validator') 

class AuthController {

    async check({response,auth}){
        try {
            await auth.check()

            return response.status(200).json({
                status: true,
                message: "Token valido",
                user: auth.user
            })
            
        } catch (error) {
            return response.status(200).json({
                status: false,
                message: "Token Invalido"
            })
        }
    }
}

module.exports = AuthController
