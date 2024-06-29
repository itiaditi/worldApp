import React, { useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import CountryDetail from './Pages/CountryDetail';
import Navbar from './Components/Navbar';
import FavoritePage from './Pages/FavoritePage';
import SignUp from './Components/Signup';
import Login from './Components/Login';

function App() {
  return (<>
    <Navbar/>
    
      {/* <Routes> */}
        
          {/* <Route path="/" exact element={<HomePage/>} />
          <Route path="/favorites" element={<FavoritesPage/>} />
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/register" element={<RegisterPage/>} /> */}
           <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/countries/:countryCode' element={<CountryDetail/>} />
          <Route path="/favorite" element={<FavoritePage/>}/>
          <Route path="/signup" element={<SignUp/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path='*' element={<h2>404 Page not found</h2>} />
        </Routes>
        
      {/* </Routes> */}

    </>
  );
}

export default App;
