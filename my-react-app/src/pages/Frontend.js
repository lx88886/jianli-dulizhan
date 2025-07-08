import React from 'react';
import '../assets/css/pages/frontend.css';

const Frontend = () => {
  return (
    <div className="container mt-5">
      <h1 className="section-title">前端 页面</h1>
      <p className="lead">这是前端开发相关内容的独立页面，您可以在这里添加具体内容。</p>
      <div className="card mt-4">
        <div className="card-body">
          <h5 className="card-title">前端技术栈</h5>
          <p className="card-text">这里可以放置HTML、CSS、JavaScript、React等前端技术的介绍和案例。</p>
        </div>
      </div>
    </div>
  );
};

export default Frontend;