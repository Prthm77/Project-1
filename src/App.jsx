import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
import Navbar1 from './component/Navbar/Navbar'
import Login from './component/Login/Login';
import SignUp from './component/SignUp/SignUp';
import ProductListing from './component/Product/ProductListing';
import Home from './component/Home/Home';
import ViewProduct from './component/Product/ViewProduct';
import Profile from './component/Profile/Profile';

function App() {


  return (
    <>
    <Router>
      <Navbar1 />
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/product" element={<ProductListing />} />
        <Route path="/view/:id" element={<ViewProduct/>}/>
        <Route path="/profile" element={<Profile/>}/>
      </Routes> 
    </Router>
   
    </>
  )
}

export default App
