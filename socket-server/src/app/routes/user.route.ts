



import express,{Application, Router} from 'express' 
import { createUser, login_User } from '../controllers/User.controller';





const userRouter = Router();



userRouter.post('/create-user',createUser)
userRouter.post('/login-user',login_User)



export default userRouter;



