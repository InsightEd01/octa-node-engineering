import React, { useState, useEffect } from 'react';
import { SubscriberAnalytics as AnalyticsData } from '../types/newsletter';
import { newsletterService } from '../services/newsletterService';

const SubscriberAnalytics: React.FC = () => {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {
    try {
      setLoading(true);
      const data = await newsletterService.getAnalytics();
      setAnalytics(data);
    } catch (error) {
      console.error('Failed to load analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatGrowthRate = (rate: number) => {
    const sign = rate >= 0 ? '+' : '';
    return `${sign}${rate.toFixed(1)}%`;
  };

  const getGrowthClass = (rate: number) => {
    if (rate > 0) return 'growth-positive';
    if (rate < 0) return 'growth-negative';
    return 'growth-neutral';
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading analytics...</p>
      </div>
    );
  }

  if (!analytics) {
    return (
      <div className="error-state">
        <p>Failed to load analytics data</p>
      </div>
    );
  }

  return (
    <div className="subscriber-analytics">
      {/* Key Metrics */}
      <div className="analytics-grid">
        <div className="metric-card">
          <div className="metric-header">
            <h3>Total Subscribers</h3>
            <span className="metric-icon">👥</span>
          </div>
          <div className="metric-value">{analytics.total}</div>
          <div className="metric-details">
            <span className="metric-detail success">{analytics.active} Active</span>
            <span className="metric-detail warning">{analytics.unsubscribed} Unsubscribed</span>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-header">
            <h3>This Month</h3>
            <span className="metric-icon">📈</span>
          </div>
          <div className="metric-value">{analytics.thisMonth}</div>
          <div className="metric-details">
            <span className={`metric-detail ${getGrowthClass(analytics.growthRate)}`}>
              {formatGrowthRate(analytics.growthRate)} vs last month
            </span>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-header">
            <h3>This Week</h3>
            <span className="metric-icon">📊</span>
          </div>
          <div className="metric-value">{analytics.thisWeek}</div>
          <div className="metric-details">
            <span className="metric-detail">New subscriptions</span>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-header">
            <h3>Active Rate</h3>
            <span className="metric-icon">✅</span>
          </div>
          <div className="metric-value">
            {((analytics.active / analytics.total) * 100).toFixed(1)}%
          </div>
          <div className="metric-details">
            <span className="metric-detail">Subscriber retention</span>
          </div>
        </div>
      </div>

      {/* Top Sources */}
      <div className="analytics-section">
        <h3>Top Subscription Sources</h3>
        <div className="sources-chart">
          {analytics.topSources.map((source) => (
            <div key={source.source} className="source-item">
              <div className="source-info">
                <span className="source-name">
                  {source.source.charAt(0).toUpperCase() + source.source.slice(1).replace('-', ' ')}
                </span>
                <span className="source-count">{source.count} subscribers</span>
              </div>
              <div className="source-bar">
                <div 
                  className="source-fill"
                  style={{ width: `${source.percentage}%` }}
                ></div>
              </div>
              <span className="source-percentage">{source.percentage.toFixed(1)}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Subscription Trend */}
      <div className="analytics-section">
        <h3>30-Day Subscription Trend</h3>
        <div className="trend-chart">
          <div className="chart-container">
            {analytics.subscriptionTrend.slice(-14).map((day) => {
              const maxValue = Math.max(
                ...analytics.subscriptionTrend.map(d => Math.max(d.subscriptions, d.unsubscriptions))
              );
              const subHeight = maxValue > 0 ? (day.subscriptions / maxValue) * 100 : 0;
              const unsubHeight = maxValue > 0 ? (day.unsubscriptions / maxValue) * 100 : 0;

              return (
                <div key={day.date} className="chart-bar">
                  <div className="bar-container">
                    <div 
                      className="bar-subscriptions"
                      style={{ height: `${subHeight}%` }}
                      title={`${day.subscriptions} subscriptions`}
                    ></div>
                    <div 
                      className="bar-unsubscriptions"
                      style={{ height: `${unsubHeight}%` }}
                      title={`${day.unsubscriptions} unsubscriptions`}
                    ></div>
                  </div>
                  <div className="bar-label">
                    {new Date(day.date).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="chart-legend">
            <div className="legend-item">
              <div className="legend-color subscriptions"></div>
              <span>Subscriptions</span>
            </div>
            <div className="legend-item">
              <div className="legend-color unsubscriptions"></div>
              <span>Unsubscriptions</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="analytics-section">
        <h3>Quick Statistics</h3>
        <div className="quick-stats">
          <div className="stat-item">
            <span className="stat-label">Average daily subscriptions</span>
            <span className="stat-value">
              {(analytics.subscriptionTrend.reduce((sum, day) => sum + day.subscriptions, 0) / 30).toFixed(1)}
            </span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Average daily unsubscriptions</span>
            <span className="stat-value">
              {(analytics.subscriptionTrend.reduce((sum, day) => sum + day.unsubscriptions, 0) / 30).toFixed(1)}
            </span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Net growth (30 days)</span>
            <span className="stat-value">
              {analytics.subscriptionTrend.reduce((sum, day) => sum + day.subscriptions - day.unsubscriptions, 0)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriberAnalytics;