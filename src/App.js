import './App.css';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';

import AnimatedRoutes from './components/AnimatedRoutes';

function App() {
  return (
    <div className="App dark:bg-slate-900 pt-2 pb-2">
      <Toaster/>
      <Navbar />
      <AnimatedRoutes />
    </div>
  );
}

export default App;
