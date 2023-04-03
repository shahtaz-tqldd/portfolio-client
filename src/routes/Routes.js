import { lazy } from "react";
import PrivateRoute from "./PrivateRoute";

const { createBrowserRouter } = require("react-router-dom");
const { default: Main } = require("../layouts/Main");

const Home = lazy(() => import("../pages/Homepage/Homepage"));
const Blogs = lazy(() => import("../pages/Blogs/Blogs"));
const BlogDetails = lazy(() => import("../pages/Blogs/BlogDetails"));
const Login = lazy(() => import("../pages/Login/Login"));
const Projects = lazy(() => import("../pages/Projects/ProjectPage.js"));
const Resource = lazy(() => import("../pages/ResourcePage/Resources.js"));

const Dashboard = lazy(() => import("../pages/Profile/Dashboard"));
const BlogDashboard = lazy(() => import("../pages/Profile/blogs/BlogDashboard"));
const DashboardLayout = lazy(() => import("../layouts/DashboardLayout"));
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
                element: <Home />
            },
            {
                path: '/blogs',
                element: <Blogs />
            },
            {
                path: '/projects',
                element: <Projects />
            },
            {
                path: '/resource',
                element: <Resource />
            },
            {
                path: '/blogs/:title',
                element: <BlogDetails />,
                loader: async ({ params }) => await fetch(`https://portfolio-backend-sepia-seven.vercel.app/blogs/${params.title}`)
            },
            {
                path: '/dashboard',
                element: <PrivateRoute><DashboardLayout /></PrivateRoute>,
                children: [
                    {
                        path: '/dashboard',
                        element: <Dashboard />
                    },
                    {
                        path: '/dashboard/blogs',
                        element: <BlogDashboard />
                    },
                    {
                        path: '/dashboard/projects',
                        element: <ProjectDashboard />
                    },
                    {
                        path: '/dashboard/skills',
                        element: <SkillDashboard />
                    },
                ]
            },
        ]
    },
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '*',
        element: <Errorpage />
    },
])