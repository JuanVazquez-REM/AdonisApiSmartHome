'use strict'
const Route = use('Route')

Route.get('/', () => 'Hola estas en AdonisApiSmarHome, Jienjenido :)')

/* Home */

//Registro Home
Route.post('/registro','HomeController.registro')

//Login Home y Usuarios
Route.post('/login','HomeController.login')

//Muestra todos los usuarios de una casa
Route.post('/show/users','HomeController.mostrar_user')

//Muestra todas las raspberries de una casa
Route.post('/show/raspberries','HomeController.mostrar_raspberries')

//Elimina el usuario de una casa
Route.post('/delete/user','HomeController.eliminar_user')







/* User */

//Registro usuario
Route.post('/registro/user','UserController.registro_user')






/* Auth */

//Checa el token
Route.post('/check','AuthController.check')






/* Raspberry */

//Registro Raspberry
Route.post('/registro/raspberry','RaspberryController.registro_raspberry')

//Registro Raspberry existente
Route.post('/registro/raspberry/existente','RaspberryController.registro_raspberry_existente')

//Eliminar una raspberry de una casa
Route.post('/eliminar/raspberry/home','RaspberryController.eliminar_raspberry_home')

//Eliminar una raspberry por completo
Route.post('/eliminar/raspberry','RaspberryController.eliminar_raspberry')






//Routes
//Registro Home
//Login Home y Usuarios
//Muestra todos los usuarios de una casa
//Muestra todas las raspberries de una casa
//Elimina el usuario de una casa
//Registro usuario
//Checa el token
//Registro Raspberry
//Registro Raspberry existente
//Eliminar una raspberry de una casa
//Eliminar una raspberry por completo







Route.group(() => {
}).middleware(['auth'])