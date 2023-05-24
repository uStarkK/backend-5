import { Server } from 'socket.io'
import { ProductManager } from './class.js'
const productsData = new ProductManager("./products.json")

export const startSocket = (httpServer) => {
    const socketServer = new Server(httpServer)

    socketServer.on('connection', (socket) => {
        console.log('Usuario conectado')

        socket.on('product:create', async (newProduct) => {
            console.log("aaaa")
            const product = await productsData.saveProduct(newProduct)
            socketServer.emit('product:created', product)
        })

        socket.on('product:delete', async id => {
            console.log(await productsData.getProductByid(parseInt(id)))
            await productsData.deleteProduct(parseInt(id))
            socketServer.emit('product:deleted', id)
        })
    })

    return socketServer
}
