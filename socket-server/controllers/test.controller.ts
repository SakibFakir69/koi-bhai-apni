import { RequestHandler,Request,Response } from "express"



export const Test:RequestHandler = async(req:Request, res:Response)=>{

  try{

    console.log(req.method);
    res.send('<h1>Running</h1>')

  }catch(error:any){

    res.json({
        success:false,
        message:"failed to fetch data",
        error:error.message
    })
  }





}