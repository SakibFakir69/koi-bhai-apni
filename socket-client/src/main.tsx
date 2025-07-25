import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Provider } from 'react-redux'
import { store } from './redux/store.ts'
import { RouterProvider } from 'react-router'
import { router } from './routers/router.tsx'


createRoot(document.getElementById('root')!).render(

   <Provider store={store}>
 
     <RouterProvider router={router}/>
   </Provider>

)
