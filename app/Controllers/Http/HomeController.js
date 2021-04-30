'use strict'
const Home = use('App/Models/Home')
const {validate} = use('Validator') 

class HomeController {

    async registro({request, response}){
        const data = await Home.count()
        const id = data + 1

        const rules = {
            nombre: 'required|string',
            apellido: 'required|string',
            email: 'required|string',
            password: 'required|string',
        }

        const validation = await validate(request.all(), rules)
        
        if(validation.fails()){
            return response.status(400).json(validation.messages())
        } else {
            const {nombre,apellido,email,password} = request.only(['nombre','apellido','email','password'])

            
            try {
                const home = await Home.create({
                    'home_id': id,
                    'nombre':nombre,
                    'apellido': apellido,
                    'email': email,
                    'password': password
                })
                
                response.status(201).json(home)
            } catch (error) {
                response.status(400).json(error)
            }
        }
    }


    async login({request, response, auth}){

        const rules = {
            email: 'required|string',
            password: 'required|string',
        }

        const validation = await validate(request.all(), rules)
        

        if(validation.fails()){
            return response.status(400).json(validation.messages())
        } else {
            try {
                const {email, password} = request.only(['email','password'])
                const token = await auth.attempt(email,password)
                const home = await Home.where('email',email).first()

                return response.status(200).json({
                    token: token,
                    home: home
                })
                
            } catch (error) {
                return response.status(400).json({
                    message: error
                })
            }
        
        }
    }


}

module.exports = HomeController
