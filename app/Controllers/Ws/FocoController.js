'use strict'

class FocoController {
  constructor ({ socket, request }) {
    this.socket = socket
    this.request = request
  }

  onMessage(data){
    console.log("Chat de focos")
    this.socket.broadcastToAll("message",data)
    console.log(data)
  }
}

module.exports = FocoController
