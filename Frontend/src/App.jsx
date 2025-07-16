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
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='/user' element={<ProtectedRoute><Home/></ProtectedRoute>}></Route>
          <Route path="/home" element={<ProtectedRoute><Admin/></ProtectedRoute>} />
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/register' element={<Register/>}></Route>
          <Route path="/partner" element={<ProtectedRoute><Partner /></ProtectedRoute>} />
          <Route path="/movie/:id" element={<ProtectedRoute><SingleMovie /></ProtectedRoute>} />
          <Route path="/book-show/:id" element={<ProtectedRoute><BookShow /></ProtectedRoute>} />
          <Route path='/forget' element={<Forget/>} />
          <Route path='/reset' element={<Reset />} />
          <Route path='/profile' element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}

export default App