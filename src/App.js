import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Search from './pages/Search';

import './App.scss';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/search" element={<Search />} />
    </Routes>
  );
}

export default App;
