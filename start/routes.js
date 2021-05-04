'use strict'
const Route = use('Route')

Route.get('/', () => 'Hola estas en AdonisApiSmarHome, Jienjenido :)')

/* Home */

//Registro Home
Route.post('/register','HomeController.registro')

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
Route.post('/register/user','UserController.registro_user')






/* Auth */

//Checa el token
Route.get('/check','AuthController.check')






/* Raspberry */

//Registro Raspberry
Route.post('/register/raspberry','RaspberryController.registro_raspberry')

//Registro Raspberry existente
Route.post('/register/raspberry/existing','RaspberryController.registro_raspberry_existente')

//Muestra los pines disponibles de una raspberry 
Route.post('/pines/raspberry','RaspberryController.pines_raspberry')

//Eliminar una raspberry de una casa
Route.post('/delete/raspberry/home','RaspberryController.eliminar_raspberry_home')

//Eliminar una raspberry por completo
Route.post('/delete/raspberry','RaspberryController.eliminar_raspberry')



/* Dispositivos */

//Registro de dispositivo
Route.post('/register/device','DeviceController.register_device')

//Mostrar todos los dispositivos de una raspberry
Route.post('/show/devices','DeviceController.mostrar_devices')

//Mostrar los dispositivos de un tipo en espesifico de una raspberry
Route.post('/show/devices/type','DeviceController.mostrar_devices_type')

//Eliminar un dispositivo
Route.post('/delete/device','DeviceController.delete_device')




//Rutas de la API, atasquense inches puercos 
//Registro Home -- /register
//Login Home y Usuarios -- /login
//Muestra todos los usuarios de una casa -- /show/users
//Muestra todas las raspberries de una casa -- /show/raspberries
//Elimina el usuario de una casa -- /delete/user
//Registro usuario -- /register/user
//Checa el token -- /check
//Registro Raspberry -- /register/raspberry
//Registro Raspberry existente -- /register/raspberry/existing
//Eliminar una raspberry de una casa -- /delete/raspberry/home
//Eliminar una raspberry por completo -- /delete/raspberry
//Registro de dispositivo -- /register/device
//Mostrar todos los dispositivos de una raspberry -- /show/devices
//Mostrar los dispositivos de un tipo en espesifico de una raspberry -- /show/devices/type
//Muestra los pines disponibles de una raspberry  -- /pines/raspberry







Route.group(() => {
}).middleware(['auth'])