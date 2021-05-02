'use strict'

const Device = use('App/Models/Device')
const Raspberry = use('App/Models/Raspberry')
const {validate} = use('Validator') 

class DeviceController {


    async register_device({request, response}){
        const data = await Device.count()
        const id = data + 1

        const rules = {
            raspberry_id: 'required|integer',
            nombre: 'required|string',
            dispositivo_id: 'required|string',
            pin: 'required|integer',
        }

        const validation = await validate(request.all(), rules)
        
        if(validation.fails()){
            return response.status(400).json(validation.messages())
        } else {
            const {raspberry_id,nombre,dispositivo_id,pin,modelo} = request.only(['raspberry_id','nombre','dispositivo_id','pin','modelo'])
            const devices = await Device.where('raspberry_id',raspberry_id).fetch()

            for (let i = 0; i < devices.rows.length; i++) {
                if(devices.rows[i].pin == pin){
                    return response.status(400).json({message:"El pin mandado, ya esta siendo utlizado"})
                }
            }
            
            try {
                const device = await Device.create({
                    'dispositivo_id': id,
                    'raspberry_id': raspberry_id,
                    'nombre': nombre,
                    'dispositivo_id': dispositivo_id,
                    'pin': pin,
                    'modelo': String(modelo).toUpperCase(),
                })
                
                response.status(201).json(device)
            } catch (error) {
                response.status(400).json(error)
            } 
        }
    }


    async mostrar_devices({request, response}){

        const rules = {
            raspberry_id: 'required|integer',
        }

        const validation = await validate(request.all(), rules)
        
        if(validation.fails()){
            return response.status(400).json(validation.messages())
        } else {
            try {
                const {raspberry_id} = request.only(['raspberry_id'])

                const devices = await Device.where('raspberry_id',raspberry_id).fetch()
                
                response.status(201).json(devices)
            } catch (error) {
                response.status(400).json(error)
            } 
        }
    }


    async mostrar_devices_type({request, response}){

        const rules = {
            raspberry_id: 'required|integer',
            dispositivo_id: 'required|string'
        }

        const validation = await validate(request.all(), rules)
        
        if(validation.fails()){
            return response.status(400).json(validation.messages())
        } else {
            try {
                const {raspberry_id,dispositivo_id} = request.only(['raspberry_id','dispositivo_id'])

                const devices = await Device.where('raspberry_id',raspberry_id).where('dispositivo_id',dispositivo_id).fetch()
                
                response.status(200).json(devices)
            } catch (error) {
                response.status(400).json(error)
            } 
        }
    }



    async delete_device({request, response}){

        const rules = {
            raspberry_id: 'required|integer',
            dispositivo_id: 'required|integer'
        }

        const validation = await validate(request.all(), rules)
        
        if(validation.fails()){
            return response.status(400).json(validation.messages())
        } else {
            try {
                const {raspberry_id,dispositivo_id} = request.only(['raspberry_id','dispositivo_id'])

                const device = await Device.where('raspberry_id',raspberry_id).where('dispositivo_id',dispositivo_id).first()

                if(device){
                    await device.delete()
                    response.status(200).json(device)
                }else{
                    response.status(400).json({message:"Dispositivo  o raspberry no encontrado"})
                }
                
            } catch (error) {
                response.status(400).json(error)
            } 
        }
    }
}

module.exports = DeviceController
