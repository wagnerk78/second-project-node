const { request, response } = require('express')
const express = require('express')
const uuid = require('uuid')
const port = 3000

const app = express()
app.use(express.json())


const orders = []

const checkUserId = (request, response, next) =>{
    const { id } = request.params

    const index = orders.findIndex(user => user.id === id)

    if (index < 0){
        return response.status(404).json({mensage: "Order not found. "})
    }

    request.userIndex = index
    request.userId = id

    next()

}

app.get('/order', (request, response) => {
    return response.json(orders)
})

app.post('/order', (request, response) => {
    const { order, clientName, price, status } = request.body

    const newOrder = {id:uuid.v4(), order, clientName, price, status}

    orders.push(newOrder)

    return response.status(201).json(newOrder)
})

app.put('/order/:id',checkUserId, (request, response) => {
   
    const { order, clientName, price, status } = request.body
    const id = request.userId
    const index = request.userIndex

    const changeOrder = {id, order, clientName, price, status }

     orders[index] = changeOrder

    return response.json(changeOrder)
})

app.delete('/order/:id', checkUserId, (request, response) => {
   
    const index = request.userIndex

    orders.splice(index,1)

    return response.status(204).json()
})

app.get('/order/:id',checkUserId, (request, response) => {
   
    const index = request.userIndex

    const consult = orders[index]

    return response.json(consult)
})

app.patch('/order/:id', checkUserId, (request, response) => {
   
    const index = request.userIndex

    const changeStatus = orders[index]
    changeStatus.status = "Pronto"
    orders[index]=changeStatus

    return response.json(changeStatus)
})


app.listen(port, () => {
    console.log(`🚀Server start on port ${port}`)
})