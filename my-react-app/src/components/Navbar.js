import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">LUXE LOCKER</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item"><Link className="nav-link" to="/web3">web.3</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/ai">AI</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/frontend">前端</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/bianshuai">变帅</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/shejiao">社交</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/zuoshengyi">做生意</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/paijian">拍剪</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/yinyue">音乐</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/youxi">游戏</Link></li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;