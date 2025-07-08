import React from 'react';
import '../assets/css/pages/zuoshengyi.css';

const Zuoshengyi = () => {
  return (
    <div className="container mt-5">
      <h1 className="section-title">做生意 页面</h1>
      <p className="lead">这是做生意相关内容的独立页面，您可以在这里添加具体内容。</p>
      <div className="card mt-4">
        <div className="card-body">
          <h5 className="card-title">创业指南</h5>
          <p className="card-text">这里可以放置创业经验、商业模式、市场营销等做生意相关的知识和案例。</p>
        </div>
      </div>
    </div>
  );
};

export default Zuoshengyi;