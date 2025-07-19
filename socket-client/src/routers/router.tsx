import { createBrowserRouter } from "react-router";
import App from "../App";
import SignUp from "../auth/SignUp";


export const router = createBrowserRouter(
    [

        {
            path:'',
            element:<App/>,
            
        },
        {
            path:'/auth/signup',
            element:<SignUp/>
        }
    ]
)


