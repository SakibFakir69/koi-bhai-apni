


import { io } from "socket.io-client"
import tokendFinder from "./FindUserToken"


export const SocketConnection = ()=>{
    const token = tokendFinder();
    if(!token){

    }

    const socket= io("http://localhost:5000",{
        auth:{
            userId:token
        }
    })

    return socket;


}