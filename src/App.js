import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Search from './pages/Search';

import NotFound from "./components/NotFound";

import './App.scss';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/search" element={<Search />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
