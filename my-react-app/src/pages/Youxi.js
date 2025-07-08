import React from 'react';
import '../assets/css/pages/youxi.css';

const Youxi = () => {
  return (
    <div className="container mt-5">
      <h1 className="section-title">游戏 页面</h1>
      <p className="lead">这是游戏相关内容的独立页面，您可以在这里添加具体内容。</p>
      <div className="card mt-4">
        <div className="card-body">
          <h5 className="card-title">游戏攻略</h5>
          <p className="card-text">这里可以放置游戏攻略、游戏评测、游戏开发等游戏相关的内容和资讯。</p>
        </div>
      </div>
    </div>
  );
};

export default Youxi;