import { RouterProvider } from 'react-router'
import router from './app.routes'
import "./feature/shared/styles/global.scss"
import { AuthProvider } from './feature/auth/auth.context'
import { SongContextProvider } from './feature/home/song.context'



function App() {

  return (
    <AuthProvider>
      <SongContextProvider>
        <RouterProvider router={router} />
      </SongContextProvider>
    </AuthProvider>
  )
}

export default App
