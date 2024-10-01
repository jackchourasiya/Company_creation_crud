import logo from './logo.svg';
import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom'; 
import Login from './components/Login';
import Navcomponent from './components/Nav';
import AdminDahboard from './components/AdminDahboard';
import Addcompany from './components/Addcompany';
import Editcompany from './components/Editcompany';
import ProtectedRoute from './components/ProtectedRoute';
function App() {
  return (
    <div className="App">

          <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />}></Route>
              <Route path="/AdminDahboard" element={<ProtectedRoute><AdminDahboard /></ProtectedRoute>} />
              <Route path="/Addcompany" element={<ProtectedRoute><Addcompany /></ProtectedRoute>} />
              <Route path="/editcompany/:id" element={<ProtectedRoute><Editcompany /></ProtectedRoute>} />
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
