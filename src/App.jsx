
import './App.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';


import Login from './Components/Login';
import 'bootstrap/dist/css/bootstrap.css';
import Index from './Components/Home/Index';
// Put any other imports below so that CSS from your
// components takes precedence over default styles.
import React from 'react'
function App() {
  return (
    <div className="App">
        
                
        <Router>
          <Routes>
            <Route path='/' element={<Login />}></Route>
            <Route path='/index' element={<Index />}></Route>
          </Routes>
        </Router>
    </div>
  );
}

export default App;
