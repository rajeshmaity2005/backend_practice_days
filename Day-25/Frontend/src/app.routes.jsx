import { createBrowserRouter } from 'react-router'
// import Home from './pages/Home'
import Register from './feature/auth/pages/Register'
import Login from './feature/auth/pages/Login'
import Protected from './feature/auth/components/Protected'
import Home from './feature/home/pages/Home'

const router = createBrowserRouter([
    {
        path: "/",
        element: <Protected><Home /></Protected>
    },
    {
        path: "/register",
        element: <Register />
    },
    {
        path: "/login",
        element: <Login />
    }
])

export default router