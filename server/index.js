import express from 'express'
import taskRouter from './routes/task.routes.js'
import connectDB from './db/index.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded())


app.use('/api/task',taskRouter)


async function startServer (){
    
    try{
        await connectDB()
        app.listen(8080,()=>{console.log('listening to port 8080') })
    }
    catch(error){
        throw new error
    }
}

startServer()




