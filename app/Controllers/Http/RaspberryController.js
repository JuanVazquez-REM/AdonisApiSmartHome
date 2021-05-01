'use strict'

const Raspberry = use('App/Models/Raspberry')
const {validate} = use('Validator') 

class RaspberryController {


    async registro_raspberry({request, response}){
        const data = await Raspberry.count()
        const id = data + 1

        const rules = {
            home_id: 'required|integer',
            nombre: 'required|string',
            modelo: 'required|string',
        }

        const validation = await validate(request.all(), rules)
        
        if(validation.fails()){
            return response.status(400).json(validation.messages())
        } else {
            const {home_id,nombre,modelo} = request.only(['home_id','nombre','modelo'])

            
            try {
                const raspberry = await Raspberry.create({
                    'raspberry_id': id,
                    'home_id': home_id,
                    'nombre': nombre,
                    'modelo': String(modelo).toUpperCase(),
                    'in_use': true
                })
                
                response.status(201).json(raspberry)
            } catch (error) {
                response.status(400).json(error)
            }
        }
    }


    async registro_raspberry_existente({request, response}){

        const rules = {
            raspberry_id: 'required|integer',
            home_id: 'required|integer',
            nombre: 'required|string',
        }

        const validation = await validate(request.all(), rules)
        
        if(validation.fails()){
            return response.status(400).json(validation.messages())
        } else {
            const {raspberry_id,home_id,nombre} = request.only(['raspberry_id','home_id','nombre'])

            
            try {
                const raspberry = await Raspberry.where('raspberry_id',raspberry_id).first()

                if(raspberry){
                    raspberry.home_id = home_id
                    raspberry.nombre = nombre
                    raspberry.in_use = true
                    raspberry.save()

                    response.status(200).json(raspberry)
                }else{
                    response.status(400).json({message: "No se encontro la raspberry"})
                }
                
            } catch (error) {
                response.status(400).json(error)
            }
        }
    }


    async eliminar_raspberry_home({request, response}){

        const rules = {
            home_id: 'required|integer',
            raspberry_id: 'required|integer',
        }

        const validation = await validate(request.all(), rules)
        
        if(validation.fails()){
            return response.status(400).json(validation.messages())
        } else {
            const {home_id,raspberry_id} = request.only(['home_id','raspberry_id'])

            try {
                const raspberry = await Raspberry.where('raspberry_id',raspberry_id).where('home_id',home_id).first()
                
                if(raspberry){
                    raspberry.home_id = null
                    raspberry.nombre = null
                    raspberry.in_use = false
                    await raspberry.save()

                    response.status(200).json(raspberry)

                }else{
                    response.status(400).json({message: "No se encontro la raspberry"})
                }
                
            } catch (error) {
                response.status(400).json(error)
            }
        }
    }



    async eliminar_raspberry({request, response}){

        const rules = {
            raspberry_id: 'required|integer',
        }

        const validation = await validate(request.all(), rules)
        
        if(validation.fails()){
            return response.status(400).json(validation.messages())
        } else {
            const {raspberry_id} = request.only(['raspberry_id'])

            try {
                const raspberry = await Raspberry.where('raspberry_id',raspberry_id).first()
                
                if(raspberry){
                    raspberry.delete()
                    response.status(200).json(raspberry)
                }else{
                    response.status(400).json({message: "No se encontro la raspberry"})
                }
                
            } catch (error) {
                response.status(400).json(error)
            }
        }
    }
}

module.exports = RaspberryController
