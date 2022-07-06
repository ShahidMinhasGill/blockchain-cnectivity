import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './Components/Navbar/NavBar';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import LandingPage from './Components/LandingPage/LandingPage';
import Login from './Components/Login/Login';
import SignUp from './Components/SignUp/SignUp';
import Dashboard from './Components/Dashboard/Dashboard';
import { loadWeb3 } from './Components/API/Api'
import { useState } from 'react';

function App() {
  const [isUser, setIsUser] = useState(null);


  return (
    <div className="App">
      {/* <NavBar /> */}
      <BrowserRouter>
        <Routes>
          {
            !isUser && (
              <>
                <Route path='/' element={<LandingPage setIsUser={setIsUser} />} />
              </>
            )
          }
          {
            isUser && (
              <>
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<SignUp />} />
                <Route path='/dashbaord' element={<Dashboard />} />
              </>
            )
          }

          <Route path="*" element={<Navigate to='/' />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
