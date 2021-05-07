'use strict'

/*
|--------------------------------------------------------------------------
| Websocket
|--------------------------------------------------------------------------
|
| This file is used to register websocket channels and start the Ws server.
| Learn more about same in the official documentation.
| https://adonisjs.com/docs/websocket
|
| For middleware, do check `wsKernel.js` file.
|
*/

const Ws = use('Ws')

//Channel Focos
Ws.channel('wsfoco','FocoController')

//Channel Humedad
Ws.channel('wshumedad','FocoController')

//Channel Temperatura
Ws.channel('wstemperatura','FocoController')

//Channel Cochera
Ws.channel('wscochera','FocoController')


