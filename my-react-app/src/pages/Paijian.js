import React from 'react';
import '../assets/css/pages/paijian.css';

const Paijian = () => {
  return (
    <div className="container mt-5">
      <h1 className="section-title">拍剪 页面</h1>
      <p className="lead">这是拍摄剪辑相关内容的独立页面，您可以在这里添加具体内容。</p>
      <div className="card mt-4">
        <div className="card-body">
          <h5 className="card-title">视频制作技巧</h5>
          <p className="card-text">这里可以放置拍摄技巧、剪辑软件教程、视频创意等拍剪相关的知识和案例。</p>
        </div>
      </div>
    </div>
  );
};

export default Paijian;