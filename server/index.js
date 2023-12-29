import express from 'express'
import taskRouter from './routes/task.routes.js'
import connectDB from './db/index.js'
import session from "express-session";
import passport from 'passport'
import dotenv from "dotenv";
import userRouter from './routes/user.routes.js'
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config({
    path: "./.env",
});
  

const app = express()

// middlewares
app.use(
    cors({
      origin: process.env.CORS_ORIGIN,
      credentials: true,
    })
);

app.use(express.json())
app.use(express.urlencoded())
app.use(cookieParser());


app.use(
    session({
      secret: process.env.EXPRESS_SESSION_SECRET,
      resave: true,
      saveUninitialized: true,
    })
  ); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
  
// Routes
app.use('/api/v1/user',userRouter)
app.use('/api/v1/task',taskRouter)



//  Server and Db Connection

async function startApp (){
    
    try{
        await connectDB()
        app.listen(process.env.PORT,()=>{console.log('listening to port 8080') })
    }
    catch(error){
        throw new error
    }
}


startApp()




