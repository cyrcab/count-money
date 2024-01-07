import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Admin from './Pages/Admin'
import Home from './Pages/Home'
import { useEffect } from 'react'
import api from './axios.config'
import { useDispatch } from 'react-redux'
import { login, logout } from './Context/user.reducer'

const App: React.FC = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    api
      .get('/user/me')
      .then((response) => {
        if (response.data.status === 400) {
          dispatch(logout())
          return
        }
        dispatch(login(response.data.body.user))
      })
      .catch((error) => {
        console.log(error)
        dispatch(logout())
      })
  }, [dispatch])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  )
}
export default App
