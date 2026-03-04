import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import './Dashboard.css';

const Dashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  const orders = user?.orders || [];
  const totalSpent = orders.reduce((sum, o) => sum + (o.total || 0), 0);

  return (
    <div className="dashboard-page">
      <div className="container">

        {/* ── Hero banner: low contrast text on coloured bg ── */}
        <div class="dashboard-hero">
          <span class="dashboard-hero-label">Members Area</span>
          <h1 class="dashboard-hero-title">Welcome back, {user?.name}!</h1>
          <p class="dashboard-hero-sub">Your personal account dashboard</p>
        </div>

        {/* ── Stat cards: missing ARIA labels on icon buttons ── */}
        <div className="dashboard-stats">
          <div className="stat-card">
            {/* img with empty alt on a meaningful graphic */}
            <img src="https://via.placeholder.com/48/4f46e5/ffffff?text=📦" alt="" />
            <div className="stat-info">
              <p className="stat-value">{orders.length}</p>
              <p className="stat-label">Total Orders</p>
            </div>
          </div>

          <div className="stat-card">
            <img src="https://via.placeholder.com/48/0891b2/ffffff?text=$" alt="" />
            <div className="stat-info">
              <p className="stat-value">${totalSpent.toFixed(2)}</p>
              <p className="stat-label">Total Spent</p>
            </div>
          </div>

          <div className="stat-card">
            <img src="https://via.placeholder.com/48/059669/ffffff?text=★" alt="" />
            <div className="stat-info">
              <p className="stat-value">Gold</p>
              <p className="stat-label">Member Tier</p>
            </div>
          </div>

          <div className="stat-card">
            {/* button with no accessible label */}
            <button className="stat-alert-btn" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
              <img src="https://via.placeholder.com/48/dc2626/ffffff?text=!" alt="" />
            </button>
            <div className="stat-info">
              <p className="stat-value" style={{ color: '#dc2626' }}>3</p>
              <p className="stat-label">Alerts</p>
            </div>
          </div>
        </div>

        {/* ── Tabs: no role="tablist", no aria-selected ── */}
        <div className="dashboard-tabs">
          <div
            className={`dashboard-tab ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >Overview</div>
          <div
            className={`dashboard-tab ${activeTab === 'orders' ? 'active' : ''}`}
            onClick={() => setActiveTab('orders')}
          >Order History</div>
          <div
            className={`dashboard-tab ${activeTab === 'account' ? 'active' : ''}`}
            onClick={() => setActiveTab('account')}
          >Account Settings</div>
        </div>

        {activeTab === 'overview' && (
          <div className="dashboard-panel">
            <div className="dashboard-two-col">

              {/* Activity feed: list items with no semantic meaning */}
              <div className="dashboard-card">
                <div className="card-heading">Recent Activity</div>
                <div className="activity-list">
                  {[
                    { icon: '🛍️', text: 'Placed order #1042', time: '2 days ago' },
                    { icon: '📦', text: 'Order #1041 shipped', time: '5 days ago' },
                    { icon: '⭐', text: 'Left a review', time: '1 week ago' },
                    { icon: '🔒', text: 'Password updated', time: '2 weeks ago' },
                  ].map((item, i) => (
                    <div key={i} className="activity-item">
                      {/* icon image with no alt */}
                      <img src={`https://via.placeholder.com/32/6366f1/ffffff?text=${i + 1}`} />
                      <div>
                        <p className="activity-text">{item.text}</p>
                        <p className="activity-time">{item.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* "Chart" section: decorative bar chart with no data description */}
              <div className="dashboard-card">
                <div className="card-heading">Spending This Year</div>
                {/* No title, no aria-label, no summary — chart is purely visual */}
                <div className="fake-chart" role="img">
                  {[40, 70, 55, 90, 30, 75, 60, 85, 45, 95, 50, 80].map((h, i) => (
                    <div key={i} className="bar-wrap">
                      <div className="chart-bar" style={{ height: `${h}%` }} />
                      <span className="bar-label">{['J','F','M','A','M','J','J','A','S','O','N','D'][i]}</span>
                    </div>
                  ))}
                </div>
                {/* Low contrast caption */}
                <p style={{ fontSize: '11px', color: '#c4c4c4', marginTop: '0.5rem' }}>
                  Monthly spend in USD
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="dashboard-panel">
            {orders.length === 0 ? (
              <div className="empty-orders">
                <img src="https://via.placeholder.com/80/e5e7eb/9ca3af?text=?" alt="" />
                <p>No orders yet. <a href="/products">Start shopping</a>.</p>
              </div>
            ) : (
              /* Table with no <thead>, no scope on th, no caption */
              <table className="orders-table">
                <tr>
                  <th>Order ID</th>
                  <th>Date</th>
                  <th>Items</th>
                  <th>Total</th>
                  <th>Status</th>
                </tr>
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td>#{order.id}</td>
                    <td>{new Date(order.date).toLocaleDateString()}</td>
                    <td>{order.items?.length || 0} items</td>
                    <td>${order.total?.toFixed(2)}</td>
                    {/* Status badge: colour alone conveys meaning */}
                    <td>
                      <span style={{
                        background: '#16a34a',
                        color: '#fff',
                        padding: '2px 8px',
                        borderRadius: '999px',
                        fontSize: '12px'
                      }}>Delivered</span>
                    </td>
                  </tr>
                ))}
              </table>
            )}
          </div>
        )}

        {activeTab === 'account' && (
          <div className="dashboard-panel">
            <div className="dashboard-card account-card">
              <div className="card-heading">Account Details</div>

              {/* Form inputs missing labels — associated only by placeholder */}
              <div className="account-form">
                <input
                  type="text"
                  defaultValue={user?.name}
                  placeholder="Full Name"
                  className="account-input"
                />
                <input
                  type="email"
                  defaultValue={user?.email}
                  placeholder="Email Address"
                  className="account-input"
                />
                <input
                  type="text"
                  defaultValue="+1 555 000 0000"
                  placeholder="Phone Number"
                  className="account-input"
                />

                {/* Notification toggles: no label association */}
                <div className="card-heading" style={{ marginTop: '1.5rem' }}>Notifications</div>
                <div className="toggle-row">
                  <span>Email promotions</span>
                  <input type="checkbox" defaultChecked />
                </div>
                <div className="toggle-row">
                  <span>Order updates</span>
                  <input type="checkbox" defaultChecked />
                </div>
                <div className="toggle-row">
                  <span>Security alerts</span>
                  <input type="checkbox" />
                </div>

                {/* Submit button with vague text */}
                <button className="btn btn-primary" style={{ marginTop: '1rem' }}>
                  Click here
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Dashboard;
