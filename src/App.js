import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Home from './views/Home';
import Navbar from './components/Navbar';
import ErrorPage from './views/ErrorPage';
import Signup from './views/auth/Signup';
import Login from './views/auth/Login';
import PrivateView from './views/PrivateView';
import IsPrivate from './components/IsPrivate';
import HomeShoes from './views/shoes/Home'
import OneShoe from './views/shoes/OneShoe'
import AllComments from './views/comments/Comments'

function App() {
  return (
    <div className="App">
      <Toaster/>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/private" element={<IsPrivate><PrivateView/></IsPrivate>}/>
        <Route path="*" element={<ErrorPage />} />
        <Route path="/shoes" element={<HomeShoes />} />
        <Route path="/shoes/:id" element={<OneShoe />} />
        <Route path="/comments/:id" element={<AllComments />} />


      </Routes>
    </div>
  );
}

export default App;
