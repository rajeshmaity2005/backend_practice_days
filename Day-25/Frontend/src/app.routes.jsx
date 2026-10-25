import { createBrowserRouter } from 'react-router'
// import Home from './pages/Home'
import Register from './feature/auth/pages/Register'
import Login from './feature/auth/pages/Login'
import Protected from './feature/auth/components/Protected'

const router = createBrowserRouter([
    {
        path:"/",
        element:<Protected><h1>Home</h1></Protected>
    },
    {
        path:"/register",
        element:<Register/>
    },
    {
        path:"/login",
        element:<Login/>
    }
])

export default router