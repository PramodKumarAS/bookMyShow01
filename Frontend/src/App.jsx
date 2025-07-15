import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Pages/Login';
import Admin from './Pages/Admin';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<div>Hello from /</div>} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
