import { Routes, Route } from 'react-router-dom'
import { NotFound404 } from './pages/404/NotFound404'
import { Login } from './pages/Login/Login'
import { Register } from './pages/Register/Register'
import { HomeContact } from './pages/HomeContact/HomeContact'

const RoutesList = () => {
  return (
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/login' element={<Login />} />
      <Route path='/contact' element={<HomeContact />} />
      <Route path='/register' element={<Register />} />
      <Route path='*' element={<NotFound404 />} />
    </Routes>
  )
}

export { RoutesList }
