import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const features = [
    {
      icon: '🏦',
      title: 'Secure Banking',
      description: 'Your financial data is protected with bank-level security and encryption.'
    },
    {
      icon: '📱',
      title: 'Mobile Friendly',
      description: 'Access your accounts from any device with our responsive design.'
    },
    {
      icon: '⚡',
      title: 'Fast & Efficient',
      description: 'Quick transactions and real-time updates for all your banking needs.'
    },
    {
      icon: '🔒',
      title: 'Privacy First',
      description: 'Your personal information is kept confidential and secure.'
    },
    {
      icon: '📊',
      title: 'Smart Analytics',
      description: 'Get insights into your spending patterns and financial health.'
    },
    {
      icon: '🌍',
      title: 'Global Access',
      description: 'Manage your accounts from anywhere in the world, 24/7.'
    }
  ];

  const benefits = [
    'Real-time transaction monitoring',
    'Secure multi-factor authentication',
    'Instant fund transfers',
    'Comprehensive financial reports',
    '24/7 customer support',
    'Mobile banking capabilities'
  ];

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              Modern Banking for the <span className="text-primary">Digital Age</span>
            </h1>
            <p className="hero-description">
              Experience the future of banking with our secure, fast, and user-friendly platform. 
              Manage your accounts, track transactions, and stay in control of your finances.
            </p>
            <div className="hero-actions">
              <Link to="/register" className="hero-btn hero-btn-primary">
                <span>🚀</span>
                Get Started
              </Link>
              <Link to="/login" className="hero-btn hero-btn-secondary">
                <span>🔐</span>
                Sign In
              </Link>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-card">
              <div className="hero-icon">💳</div>
              <h3>Smart Banking</h3>
              <p>Manage your finances with ease</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="features-container">
          <div className="section-header">
            <h2>Why Choose Our Platform?</h2>
            <p>Discover the features that make us the preferred choice for modern banking</p>
          </div>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">
                  <span>{feature.icon}</span>
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="benefits-section">
        <div className="benefits-container">
          <div className="benefits-content">
            <div className="benefits-text">
              <h2>Everything You Need for Modern Banking</h2>
              <p>
                Our platform provides all the tools and features you need to manage your finances 
                effectively. From secure transactions to detailed analytics, we've got you covered.
              </p>
              <div className="benefits-list">
                {benefits.map((benefit, index) => (
                  <div key={index} className="benefit-item">
                    <span className="benefit-icon">✅</span>
                    {benefit}
                  </div>
                ))}
              </div>
            </div>
            <div className="stats-card">
              <div className="stat-item">
                <h3>10K+</h3>
                <p>Active Users</p>
              </div>
              <div className="stat-item">
                <h3>99.9%</h3>
                <p>Uptime</p>
              </div>
              <div className="stat-item">
                <h3>24/7</h3>
                <p>Support</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-container">
          <div className="cta-content">
            <h2>Ready to Get Started?</h2>
            <p>
              Join thousands of users who trust our platform for their banking needs. 
              Create your account today and experience the future of banking.
            </p>
            <div className="cta-actions">
              <Link to="/register" className="hero-btn hero-btn-primary">
                <span>🚀</span>
                Create Account
              </Link>
              <Link to="/login" className="hero-btn hero-btn-secondary">
                <span>🔐</span>
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;