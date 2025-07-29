import { createBrowserRouter } from "react-router";
import App from "../App";
import SignUp from "../auth/SignUp";
import SignIn from "../auth/SignIn";


export const router = createBrowserRouter(
    [

        {
            path:'',
            element:<App/>,
            
        },

        
        {
            path:'/auth/signup',
            element:<SignUp/>
        },
        {
            path:'/auth/signin',
            element:<SignIn/>
        }
    ]
)


