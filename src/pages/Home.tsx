import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Home: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <h1 className="hero-title">
                Secure Cloud File Management
                <span className="highlight"> Made Simple</span>
              </h1>
              <p className="hero-description">
                Store, organize, and access your files from anywhere with our secure, 
                scalable cloud storage solution. Built with AWS S3 for maximum reliability.
              </p>
              <div className="hero-actions">
                {user ? (
                  <Link to="/dashboard" className="btn btn-primary btn-large">
                    Go to Dashboard
                  </Link>
                ) : (
                  <>
                    <Link to="/register" className="btn btn-primary btn-large">
                      Get Started Free
                    </Link>
                    <Link to="/login" className="btn btn-outline btn-large">
                      Sign In
                    </Link>
                  </>
                )}
              </div>
            </div>
            <div className="hero-image">
              <div className="hero-graphic">
                <div className="cloud-icon">☁️</div>
                <div className="file-icons">
                  <div className="file-icon">📄</div>
                  <div className="file-icon">📊</div>
                  <div className="file-icon">🎵</div>
                  <div className="file-icon">🎬</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <h2 className="section-title">Why Choose CloudFile Pro?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🔒</div>
              <h3>Secure Storage</h3>
              <p>Your files are protected with enterprise-grade security and encryption.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3>Lightning Fast</h3>
              <p>Upload and download files at blazing speeds with AWS S3 infrastructure.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📱</div>
              <h3>Access Anywhere</h3>
              <p>Access your files from any device, anywhere in the world.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔄</div>
              <h3>Easy Sharing</h3>
              <p>Share files securely with time-limited download links.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h3>File Management</h3>
              <p>Organize and manage your files with an intuitive interface.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💰</div>
              <h3>Cost Effective</h3>
              <p>Pay only for what you use with transparent pricing.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Get Started?</h2>
            <p>Join thousands of users who trust CloudFile Pro for their file storage needs.</p>
            {!user && (
              <Link to="/register" className="btn btn-primary btn-large">
                Create Your Account
              </Link>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
