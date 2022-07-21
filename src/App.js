import { Route, Routes } from 'react-router-dom';
import Home from './Pages/Home/Home';
import Header from './Pages/SharedPages/Header'
import Login from './Pages/Authentication/Login'
import SignUp from './Pages/Authentication/SignUp'
import { Toaster } from 'react-hot-toast';
import Dashboard from './Pages/Dashboard/Dashboard';
import AddProduct from './Pages/Dashboard/AddProduct';
import UpdateProduct from './Pages/Dashboard/UpdateProduct';
import MyProfile from './Pages/Profile/MyProfile'
function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/products/:id" element={<UpdateProduct />}></Route>
        <Route path="/add-product" element={<AddProduct />}></Route>
        <Route path='/my-profile' element={<MyProfile></MyProfile>}></Route>
      </Routes>


      <Toaster />
    </div>
  );
}

export default App;
