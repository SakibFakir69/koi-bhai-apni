


import express,{Application} from 'express' 
import cors from 'cors'
import dotenv from 'dotenv'
const App:Application = express();
dotenv.config();


import firstRouter from '../../routes/first.route';

// socket



App.use(cors({
  origin: ['http://localhost:5173'],
  credentials: true
}));


App.use('/api', firstRouter);









export default App;