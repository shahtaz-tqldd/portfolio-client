import { lazy } from "react";
import ContactMe from "../pages/ContactMe/ContactMe";

const { createBrowserRouter } = require("react-router-dom");
const { default: Main } = require("../layouts/Main");

const Home = lazy(() => import("../pages/Homepage/Homepage"));
const Blogs = lazy(() => import("../pages/Blogs/Blogs"));
const Errorpage = lazy(() => import("../pages/404/Errorpage"));


export const routes = createBrowserRouter([
    {
        path: '/',
        element: <Main />,
        children: [
            {
                path: '/',
                element: <Home/>
            },
            {
                path: '/blogs',
                element: <Blogs/>
            },
            {
                path: '/contact',
                element: <ContactMe/>
            },
            {
                path: '*',
                element: <Errorpage/>
            }
        ]
    }
])