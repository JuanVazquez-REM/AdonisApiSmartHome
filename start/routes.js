'use strict'
const Route = use('Route')

Route.get('/', () => 'Hello Adonis y gracias aws-cambiando respuesta de ruta')

//Registro Home
Route.post('/registro','HomeController.registro')
//Login Home
Route.post('/login','HomeController.login')




Route.group(() => {
}).middleware(['auth'])