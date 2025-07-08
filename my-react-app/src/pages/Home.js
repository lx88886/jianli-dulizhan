import React, { useState, useEffect } from 'react';
import '../assets/css/pages/home.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Home = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  useEffect(() => {
    // 初始化AOS动画
    if (window.AOS) {
      window.AOS.init({
        duration: 1000,
        once: true
      });
    }

    // FAQ手风琴交互
    const handleFaqClick = (index) => {
      setOpenFaqIndex(openFaqIndex === index ? null : index);
    };

    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach((question, index) => {
      question.addEventListener('click', () => handleFaqClick(index));
    });

    return () => {
      faqQuestions.forEach((question, index) => {
        question.removeEventListener('click', () => handleFaqClick(index));
      });
    };
  }, [openFaqIndex]);

  return (
    <div>
      {/* 技术规格部分 */}
      <section className="specs-section" id="specs">
        <div className="container">
          <h2 className="section-title">技术规格</h2>
          <div className="row">
            <div className="col-md-4" data-aos="fade-up">
              <div className="specs-card">
                <h3 className="specs-title">安全系统</h3>
                <ul className="list-unstyled">
                  <li>• 生物识别技术</li>
                  <li>• 军工级加密</li>
                  <li>• 实时监控系统</li>
                  <li>• 多重验证机制</li>
                </ul>
              </div>
            </div>
            <div className="col-md-4" data-aos="fade-up" data-aos-delay="100">
              <div className="specs-card">
                <h3 className="specs-title">智能功能</h3>
                <ul className="list-unstyled">
                  <li>• AI温度控制</li>
                  <li>• 智能分配系统</li>
                  <li>• 自动消毒功能</li>
                  <li>• 远程监控</li>
                </ul>
              </div>
            </div>
            <div className="col-md-4" data-aos="fade-up" data-aos-delay="200">
              <div className="specs-card">
                <h3 className="specs-title">硬件配置</h3>
                <ul className="list-unstyled">
                  <li>• 航空级铝合金</li>
                  <li>• 防爆玻璃</li>
                  <li>• 太阳能供电</li>
                  <li>• 防水防尘</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 全球网络部分 */}
      <section className="network-section" id="network">
        <div className="container">
          <h2 className="section-title">全球网络</h2>
          <div className="network-map" data-aos="fade-up"></div>
          <div className="row mt-5">
            <div className="col-md-3" data-aos="fade-up">
              <h3>亚洲</h3>
              <p>覆盖主要城市：东京、首尔、新加坡、香港、上海</p>
            </div>
            <div className="col-md-3" data-aos="fade-up" data-aos-delay="100">
              <h3>欧洲</h3>
              <p>覆盖主要城市：伦敦、巴黎、柏林、米兰、阿姆斯特丹</p>
            </div>
            <div className="col-md-3" data-aos="fade-up" data-aos-delay="200">
              <h3>北美</h3>
              <p>覆盖主要城市：纽约、洛杉矶、多伦多、芝加哥、迈阿密</p>
            </div>
            <div className="col-md-3" data-aos="fade-up" data-aos-delay="300">
              <h3>大洋洲</h3>
              <p>覆盖主要城市：悉尼、墨尔本、奥克兰、布里斯班</p>
            </div>
          </div>
        </div>
      </section>

      {/* 客户案例部分 */}
      <section className="cases-section" id="cases">
        <div className="container">
          <h2 className="section-title">成功案例</h2>
          <div className="row">
            <div className="col-md-4" data-aos="fade-up">
              <div className="case-card">
                <img src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" className="case-image" alt="案例1" />
                <div className="case-overlay">
                  <h3>奢侈品电商平台</h3>
                  <p>为全球顶级奢侈品电商提供安全配送解决方案</p>
                </div>
              </div>
            </div>
            <div className="col-md-4" data-aos="fade-up" data-aos-delay="100">
              <div className="case-card">
                <img src="https://images.unsplash.com/photo-1586528116493-ce2b7389bd91?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" className="case-image" alt="案例2" />
                <div className="case-overlay">
                  <h3>国际物流巨头</h3>
                  <p>为全球物流企业提供智能配送网络</p>
                </div>
              </div>
            </div>
            <div className="col-md-4" data-aos="fade-up" data-aos-delay="200">
              <div className="case-card">
                <img src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" className="case-image" alt="案例3" />
                <div className="case-overlay">
                  <h3>高端酒店集团</h3>
                  <p>为五星级酒店提供智能快递服务</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 新闻动态部分 */}
      <section className="news-section" id="news">
        <div className="container">
          <h2 className="section-title">新闻动态</h2>
          <div className="row">
            <div className="col-md-4" data-aos="fade-up">
              <div className="news-card">
                <div className="news-date">2024年3月15日</div>
                <h3>LUXE LOCKER完成一轮融资</h3>
                <p>全球顶级智能快递柜品牌LUXE LOCKER宣布完成10亿美元融资，估值突破100亿美元...</p>
                <a href="#" className="btn btn-custom">阅读更多</a>
              </div>
            </div>
            <div className="col-md-4" data-aos="fade-up" data-aos-delay="100">
              <div className="news-card">
                <div className="news-date">2024年3月10日</div>
                <h3>全球网络扩展计划</h3>
                <p>LUXE LOCKER宣布将在全球新增1000个智能快递柜网点，进一步扩大服务范围...</p>
                <a href="#" className="btn btn-custom">阅读更多</a>
              </div>
            </div>
            <div className="col-md-4" data-aos="fade-up" data-aos-delay="200">
              <div className="news-card">
                <div className="news-date">2024年3月5日</div>
                <h3>技术创新突破</h3>
                <p>LUXE LOCKER推出新一代生物识别技术，安全性能提升300%...</p>
                <a href="#" className="btn btn-custom">阅读更多</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 数据统计部分 */}
      <section className="stats-section" id="stats">
        <div className="container">
          <h2 className="section-title">数据统计</h2>
          <div className="row">
            <div className="col-md-3" data-aos="fade-up">
              <div className="stat-card">
                <div className="stat-number">1000+</div>
                <p>全球网点</p>
              </div>
            </div>
            <div className="col-md-3" data-aos="fade-up" data-aos-delay="100">
              <div className="stat-card">
                <div className="stat-number">99.9%</div>
                <p>安全率</p>
              </div>
            </div>
            <div className="col-md-3" data-aos="fade-up" data-aos-delay="200">
              <div className="stat-card">
                <div className="stat-number">500万+</div>
                <p>服务用户</p>
              </div>
            </div>
            <div className="col-md-3" data-aos="fade-up" data-aos-delay="300">
              <div className="stat-card">
                <div className="stat-number">50+</div>
                <p>覆盖国家</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 常见问题部分 */}
      <section className="faq-section" id="faq">
        <div className="container">
          <h2 className="section-title">常见问题</h2>
          <div className="row">
            <div className="col-md-6" data-aos="fade-up">
              <div className="faq-item">
                <div className="faq-question">如何确保包裹安全？</div>
                <div className="faq-answer">
                  LUXE LOCKER采用多重安全机制，包括生物识别、实时监控、军工级加密等技术，确保您的包裹万无一失。
                </div>
              </div>
            </div>
            <div className="col-md-6" data-aos="fade-up" data-aos-delay="100">
              <div className="faq-item">
                <div className="faq-question">支持哪些支付方式？</div>
                <div className="faq-answer">
                  我们支持全球主流支付方式，包括信用卡、支付宝、微信支付等，确保便捷的支付体验。
                </div>
              </div>
            </div>
            <div className="col-md-6" data-aos="fade-up" data-aos-delay="200">
              <div className="faq-item">
                <div className="faq-question">如何追踪包裹？</div>
                <div className="faq-answer">
                  通过我们的智能APP，您可以实时追踪包裹位置，接收取件通知，确保及时取件。
                </div>
              </div>
            </div>
            <div className="col-md-6" data-aos="fade-up" data-aos-delay="300">
              <div className="faq-item">
                <div className="faq-question">支持哪些尺寸的包裹？</div>
                <div className="faq-answer">
                  我们的智能快递柜支持从标准信件到大型包裹的各种尺寸，满足不同配送需求。
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;