import express from 'express'
import "dotenv/config";
import cors from "cors"
import http from "http"
import { connectDB } from './lib/db.js';
import userRouter from './routes/userRoutes.js';
import messageRouter from './routes/messageRoutes.js';
import {Server} from "socket.io"


//create express and server

const app=express()

const server=http.createServer(app)// as socket.io support the http server


//initialize socket io
export const io= new Server(server,{
    cors:{origin: process.env.CORS_ORIGIN} 
})

console.log("socket initialised");


//store online users
export const userSocketMap={}; //{userid:socketid}

//socket.io connection handler
io.on("connection",(socket)=>{
const userId= socket.handshake.query.userId;
console.log("user connected",userId);

if(userId) userSocketMap[userId]=socket.id;

//emit online users to all connected client
io.emit("getOnlineUsers",Object.keys(userSocketMap));

socket.on("disconnect",()=>{
    console.log("User Disconnected",userId);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers",Object.keys(userSocketMap))
})

})



//middleware

app.use(express.json({limit:"10mb"})) //limit to add the image upto 4mb

app.use(cors()); //allows all the urls to connect with the backened

//routes
app.use("/api/status",(req,res)=>{
res.send("server is live");
})



app.use("/api/auth",userRouter)
app.use("/api/messages",messageRouter)

//mogodb call

await connectDB();

const PORT=process.env.PORT || 5000;

server.listen(PORT,()=>console.log("server running on port :"+ PORT))



