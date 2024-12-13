import { createBrowserRouter } from "react-router-dom";
import ShoppingCart from "./pages/ShoppingCart/ShoppingCart";
import Home from "./pages/home/home";
import Login from "./pages/Login/login";
import Signup from "./pages/Signup/Signup";
import Profile from "./pages/Profile/profile";
import NotFound from "./pages/notFound";
import Store from "./pages/Store/Store";
import Admin from "./pages/Admin/Admin";
import Item from "./pages/Item/item";
import StoreContextProvider from "./context/StoreContext";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Home/>
    },
    {
        path: '/Signup',
        element:<Signup/>
    },
    {
        path:'/login',
        element: <Login/>
    },
    {
        path:'/profile',
        element: <Profile/>
    },
    {
        path:'/Admin',
        element: <Admin/>
    },
    // {
    //     path:'/Product',
    //     element: <Product/>
    // },
    {
        path:'/ShoppingCart',
        element: <ShoppingCart/>
    },
    {
        path:'/Store',
        element: <Store/>
    },
    {
        path:'/item/:id',
        element: <StoreContextProvider><Item/></StoreContextProvider>
    },
    {
        path:'/*',
        element: <NotFound/>
    }
]);