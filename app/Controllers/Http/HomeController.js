'use strict'
const Home = use('App/Models/Home')
const {validate} = use('Validator') 
const Raspberry = use('App/Models/Raspberry')

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

                if(token){
                    const home = await Home.where('email',email).first()

                    return response.status(200).json({
                        token: token,
                        home: home
                    })
                }else{
                    return response.status(400).json({message: "ta mal"})
                }
                
                
            } catch (error) {
                return response.status(400).json({
                    message: error
                })
            }
        
        }
    }


    async mostrar_user({request, response}){

        const rules = {
            home: 'required|integer'
        }

        const validation = await validate(request.all(), rules)
        

        if(validation.fails()){
            return response.status(400).json(validation.messages())
        } else {
            try {
                const {home} = request.only(['home'])
                console.log(home)
                const users = await Home.where('home',home).fetch()

                return response.status(200).json(users)
                
            } catch (error) {
                return response.status(400).json(error)
            }
        
        }
    }



    async mostrar_raspberries({request, response}){

        const rules = {
            home_id: 'integer'
        }

        const validation = await validate(request.all(), rules)

        if(validation.fails()){
            return response.status(400).json(validation.messages())
        } else {
            try {
                const {home_id} = request.only(['home_id'])
                
                const raspberries = await Raspberry.where('home_id',home_id).fetch()

                return response.status(200).json(raspberries)
                
            } catch (error) {
                return response.status(400).json(error)
            }
        
        }
    }


    async eliminar_user({request, response}){

        const rules = {
            home: 'required|integer',
            usuario_id: 'required|integer'
        }

        const validation = await validate(request.all(), rules)
        

        if(validation.fails()){
            return response.status(400).json(validation.messages())
        } else {
            try {
                const {home,usuario_id} = request.only(['home','usuario_id'])

                const user = await Home.where('home',home).where('usuario_id',usuario_id).first()
                

                if(user){
                    await user.delete()
                    return response.status(200).json(user)   
                }else{
                    return response.status(400).json({message:false})   
                }     
                
            } catch (error) {
                return response.status(400).json(error)
            }
        
        }
    }


}

module.exports = HomeController
