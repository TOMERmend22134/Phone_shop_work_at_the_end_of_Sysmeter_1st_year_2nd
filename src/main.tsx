import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import './index.css'
import StoreContextProvider from './context/StoreContext';
import './assets/fonts/TT-Fors-Trial-Regular.ttf';
import UserContextProvider from './context/UsersContext';


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <UserContextProvider>
    <StoreContextProvider>
    <RouterProvider router={router} />
    </StoreContextProvider>
    </UserContextProvider>
  </React.StrictMode>,
)