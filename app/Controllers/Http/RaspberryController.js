'use strict'

const Raspberry = use('App/Models/Raspberry')
const Device = use('App/Models/Device')
const {validate} = use('Validator') 

class RaspberryController {


    async registro_raspberry({request, response}){
        const data = await Raspberry.fetch()
        var mayor = 0
        for (let i = 0; i < data.rows.length; i++) {
            if(data.rows[i].raspberry_id > mayor){
                mayor = data.rows[i].raspberry_id 
            }
        }
        const id = mayor + 1
        
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
                const raspberry = await Raspberry.where('raspberry_id',raspberry_id).where('in_use',false).first()

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


    async pines_raspberry({request,response}){

        const rules = {
            raspberry_id: 'required|integer',
        }

        const validation = await validate(request.all(), rules)
        
        if(validation.fails()){
            return response.status(400).json(validation.messages())
        } else {
            try {
                const {raspberry_id} = request.only(['raspberry_id'])
                var pines = [2,3,4,5,6,7,8,9,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26]
    
                const devices = await Device.where('raspberry_id',raspberry_id).fetch()
                    
                for (let i = 0; i < devices.rows.length; i++) {
                    this.removeItemFromArr(pines,devices.rows[i].pin)
                }
                return response.status(200).json(pines)
            } catch (error) {
                return response.status(400).json(error)
            }
        }
    }

    async removeItemFromArr ( arr, item ) {
        var i = arr.indexOf( item );
        if ( i !== -1 ) {
            await arr.splice( i, 1 );
        }
    }
}

module.exports = RaspberryController
