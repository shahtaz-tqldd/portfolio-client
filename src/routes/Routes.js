import { lazy } from "react";

const { createBrowserRouter } = require("react-router-dom");
const { default: Main } = require("../layouts/Main");

const Home = lazy(() => import("../pages/Homepage/Homepage"));
const Blogs = lazy(() => import("../pages/Blogs/Blogs"));
const BlogDetails = lazy(() => import("../pages/Blogs/BlogDetails"));
const ContactMe = lazy(() => import("../pages/ContactMe/ContactMe"));
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
                path: '/blogs/:title',
                element: <BlogDetails/>
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