import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Search from './pages/Search';
import Manager from './pages/Manager';
import AddManager from './pages/AddManager';
import Rate from './pages/Rate';

/**
 * The main router for multi-page React app
 */
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />}/>
          <Route path="/signup" element={<Signup />}/>
          <Route path="/search" element={<Search />}/>
          <Route path="/manager" element={<Manager/>}/>
          <Route path="/add-manager" element={<AddManager/>}/>
          <Route path="/rate" element={<Rate />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
