import { RouterProvider } from 'react-router'
import router from './app.routes'
import "./feature/shared/styles/global.scss"
import { AuthProvider } from './feature/auth/auth.context'



function App() {

  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  )
}

export default App
