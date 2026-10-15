import { createBrowserRouter } from "react-router"
import Login from "./features/auth/pages/Login"
import Register from "./features/auth/pages/Register"
import Feed from "./features/posts/pages/Feed"
import CreatePost from "./features/posts/pages/CreatePost"
import Layout from "./features/shared/Layout"
import Posts from "./features/posts/pages/Posts"

export const router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <Feed />
            },
            {
                path: "/create-post",
                element: <CreatePost />
            },
            {
                path: "/all-posts",
                element: <Posts />
            }
        ]

    },

    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/register",
        element: <Register />
    }

])