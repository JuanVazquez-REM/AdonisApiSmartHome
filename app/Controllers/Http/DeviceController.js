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
            tipo: 'required|string',
            pin: 'required|integer',
        }

        const validation = await validate(request.all(), rules)
        
        if(validation.fails()){
            return response.status(400).json(validation.messages())
        } else {
            const {raspberry_id,nombre,tipo,pin,modelo} = request.only(['raspberry_id','nombre','tipo','pin','modelo'])
            const devices = await Device.where('raspberry_id',raspberry_id).fetch()

            for (let i = 0; i < devices.rows.length; i++) {
                if(devices.rows[i].pin == pin){
                    return response.status(400).json({message:"El pin mandado, ya esta siendo utlizado"})
                }
            }
            
            try {
                const device = await Device.create({
                    'tipo': id,
                    'raspberry_id': raspberry_id,
                    'nombre': nombre,
                    'tipo': tipo,
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
            tipo: 'required|string'
        }

        const validation = await validate(request.all(), rules)
        
        if(validation.fails()){
            return response.status(400).json(validation.messages())
        } else {
            try {
                const {raspberry_id,tipo} = request.only(['raspberry_id','tipo'])

                const devices = await Device.where('raspberry_id',raspberry_id).where('tipo',tipo).fetch()
                
                response.status(200).json(devices)
            } catch (error) {
                response.status(400).json(error)
            } 
        }
    }



    async delete_device({request, response}){

        const rules = {
            raspberry_id: 'required|integer',
            tipo: 'required|integer'
        }

        const validation = await validate(request.all(), rules)
        
        if(validation.fails()){
            return response.status(400).json(validation.messages())
        } else {
            try {
                const {raspberry_id,tipo} = request.only(['raspberry_id','tipo'])

                const device = await Device.where('raspberry_id',raspberry_id).where('tipo',tipo).first()

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
