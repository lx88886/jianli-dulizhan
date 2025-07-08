import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Navbar from './components/Navbar';
import './assets/css/styles.css';

// 导入页面组件
import Home from './pages/Home';
import Web3 from './pages/Web3';
import AI from './pages/AI';
import Frontend from './pages/Frontend';
import Bianshuai from './pages/Bianshuai';
import Shejiao from './pages/Shejiao';
import Zuoshengyi from './pages/Zuoshengyi';
import Paijian from './pages/Paijian';
import Yinyue from './pages/Yinyue';
import Youxi from './pages/Youxi';

function App() {
  useEffect(() => {
    // 初始化AOS动画
    AOS.init({
      duration: 1000,
      once: true
    });
  }, []);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/web3" element={<Web3 />} />
        <Route path="/ai" element={<AI />} />
        <Route path="/frontend" element={<Frontend />} />
        <Route path="/bianshuai" element={<Bianshuai />} />
        <Route path="/shejiao" element={<Shejiao />} />
        <Route path="/zuoshengyi" element={<Zuoshengyi />} />
        <Route path="/paijian" element={<Paijian />} />
        <Route path="/yinyue" element={<Yinyue />} />
        <Route path="/youxi" element={<Youxi />} />
      </Routes>
    </Router>
  );
}

export default App;
