import { lazy } from "react";
import PrivateRoute from "./PrivateRoute";

const { createBrowserRouter } = require("react-router-dom");
const { default: Main } = require("../layouts/Main");

const Home = lazy(() => import("../pages/Homepage/Homepage"));
const Blogs = lazy(() => import("../pages/Blogs/Blogs"));
const BlogDetails = lazy(() => import("../pages/Blogs/BlogDetails"));
const ContactMe = lazy(() => import("../pages/ContactMe/ContactMe"));
const Login = lazy(() => import("../pages/Login/Login"));

const Profile = lazy(() => import("../pages/Profile/Profile"));
const BlogDashboard = lazy(() => import("../pages/Profile/blogs/BlogDashboard"));
const ProfileLayout = lazy(() => import("../pages/Profile/ProfileLayout"));
const ProjectDashboard = lazy(() => import("../pages/Profile/projects/ProjectDashboard"));
const SkillDashboard = lazy(() => import("../pages/Profile/skills/SkillDashboard"));

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
                element: <BlogDetails />,
                loader: async({params})=> await fetch(`https://portfolio-backend-sepia-seven.vercel.app/blogs/${params.title}`)
            },
            {
                path: '/contact',
                element: <ContactMe/>
            },
            {
                path: '/login',
                element: <Login/>
            },
            {
                path: '/dashboard',
                element: <PrivateRoute><ProfileLayout /></PrivateRoute>,
                children: [
                    {
                        path: '/dashboard',
                        element: <Profile/>
                    },
                    {
                        path: '/dashboard/blogs',
                        element: <BlogDashboard/>
                    },
                    {
                        path: '/dashboard/projects',
                        element: <ProjectDashboard/>
                    },
                    {
                        path: '/dashboard/skills',
                        element: <SkillDashboard/>
                    },
                ]
            },
            {
                path: '*',
                element: <Errorpage/>
            }
        ]
    },
])