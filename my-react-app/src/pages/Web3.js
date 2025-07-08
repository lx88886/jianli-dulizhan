import React, { useState } from 'react';
import '../assets/css/pages/web3.css';

const Web3 = () => {
  const [count, setCount] = useState(0);
  return (
    <div className="container mt-5">
      <h1 className="section-title">web.3 页面</h1>
      <p className="lead">这是web.3相关内容的独立页面，您可以在这里添加具体内容。</p>
      <div className="card mt-4">
        <div className="card-body">
          <h5 className="card-title">web.3 服务介绍</h5>
          <p className="card-text">这里可以放置web.3相关的服务描述、产品信息或案例展示。</p>
        </div>
      </div>

      {/* React组件容器 - 从原始web3.html迁移 */}
      <div className="react-component p-4 border rounded shadow-sm mt-5">
        <h3 className="mb-3">React 组件示例</h3>
        <p>这是一个使用React构建的交互式组件</p>
        <div className="d-flex align-items-center gap-3 mt-3">
          <button 
            className="btn btn-primary"
            onClick={() => setCount(count + 1)}
          >
            点击计数
          </button>
          <span>当前计数: {count}</span>
        </div>
      </div>
    </div>
  );
};

export default Web3;