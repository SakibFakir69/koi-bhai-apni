
import express,{Application} from 'express' 
import { Test } from "../controllers/test.controller";
const firstRouter = express.Router();






firstRouter.get('/',Test);



export default firstRouter;