import { Route, Routes } from 'react-router-dom';
import Home from './Pages/Home/Home';
import Header from './Pages/SharedPages/Header'
import Login from './Pages/Authentication/Login'
import SignUp from './Pages/Authentication/SignUp'
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
      </Routes>


      <Toaster />
    </div>
  );
}

export default App;
