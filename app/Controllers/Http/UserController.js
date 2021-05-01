'use strict'
const Home = use('App/Models/Home')
const {validate} = use('Validator') 

class UserController {

    async registro_user({request, response}){
        const data = await Home.count()
        const id = data + 1

        const rules = {
            home: 'required|integer',
            nombre: 'required|string',
            apellido: 'required|string',
            email: 'required|string',
            password: 'required|string',
        }

        const validation = await validate(request.all(), rules)
        
        if(validation.fails()){
            return response.status(400).json(validation.messages())
        } else {
            const {home,nombre,apellido,email,password} = request.only(['home','nombre','apellido','email','password'])

            
            try {
                const user = await Home.create({
                    'usuario_id': id,
                    'home': home,
                    'nombre':nombre,
                    'apellido': apellido,
                    'email': email,
                    'password': password
                })
                
                response.status(201).json(user)
            } catch (error) {
                response.status(400).json(error)
            }
        }
    }

}

module.exports = UserController
