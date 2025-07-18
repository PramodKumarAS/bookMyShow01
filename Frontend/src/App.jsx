import './App.css'
import {BrowserRouter,Routes,Route,Link} from 'react-router-dom'
import Home from './Pages/Home'
import Register from './Pages/Register'
import Login from './Pages/Login'
import {Provider} from 'react-redux'
import store from './Redux/store'
import ProtectedRoute from './Pages/ProtectedRoute'
import Admin from './Pages/Admin'
import Partner from './Pages/Partner'
import SingleMovie from './Pages/SingleMovie'
import BookShow from './Pages/BookShow'
import Forget from './Pages/Forget'
import Reset from './Pages/Reset'
import Profile from './Pages/Profile'

function App() {

  return (
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login/>}></Route>
        </Routes>
      </BrowserRouter>
  )
}

export default App