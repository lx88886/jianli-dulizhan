import React from 'react';
import '../assets/css/pages/yinyue.css';

const Yinyue = () => {
  return (
    <div className="container mt-5">
      <h1 className="section-title">音乐 页面</h1>
      <p className="lead">这是音乐相关内容的独立页面，您可以在这里添加具体内容。</p>
      <div className="card mt-4">
        <div className="card-body">
          <h5 className="card-title">音乐推荐</h5>
          <p className="card-text">这里可以放置音乐推荐、乐理知识、乐器教学等音乐相关的内容和资源。</p>
        </div>
      </div>
    </div>
  );
};

export default Yinyue;