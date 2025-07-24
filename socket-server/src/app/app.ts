


import express,{Application} from 'express' 
import cors from 'cors'
import dotenv from 'dotenv'
const App:Application = express();
dotenv.config();


import userRouter from './routes/user.route';
import { createUser } from './controllers/User.controller';

// socket
App.use(express.json());


App.use(cors({
  origin: ['http://localhost:5173'],
  credentials: true
}));




App.use('/api',userRouter)







export default App;