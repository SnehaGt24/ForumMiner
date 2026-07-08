import { useEffect, useState } from "react";
import API from "../services/api";
import "../styles/analytics.css";
import AnalyticsCharts from "./AnalyticsCharts";

function AnalyticsPanel() {
  const [stats, setStats] = useState(null);

 useEffect(() => {
  fetchAnalytics();

  const interval = setInterval(() => {
    fetchAnalytics();
  }, 30000);

  return () => clearInterval(interval);
}, []);

  const fetchAnalytics = async () => {
    try {
      const res = await API.get("/analytics");
      setStats(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  if (!stats) {
    return <div className="analytics-panel">Loading analytics...</div>;
  }

  return (
    <div className="analytics-panel">
      <p className="analytics-updated">
        <h2 className="analytics-title">
  Lead Intelligence
</h2>
  Last updated: {new Date().toLocaleTimeString()}
</p>


      <div className="analytics-grid">

        <div className="analytics-card">
          <h3>Total Posts</h3>
          <p>{stats.totalPosts}</p>
        </div>

        <div className="analytics-card">
          <h3>🔥 High Intent</h3>
          <p>{stats.highIntentPosts}</p>
        </div>

        <div className="analytics-card">
          <h3>🌐 Reddit</h3>
          <p>{stats.redditPosts}</p>
        </div>

        <div className="analytics-card">
          <h3>📝 Forum</h3>
          <p>{stats.forumPosts}</p>
        </div>

        <div className="analytics-card">
          <h3>😊 Positive</h3>
          <p>
  {stats.positivePosts}
  <span className="analytics-percent">
    {" "}
    (
    {stats.totalPosts
      ? Math.round(
          (stats.positivePosts / stats.totalPosts) * 100
        )
      : 0}
    %)
  </span>
</p>
        </div>

        <div className="analytics-card">
          <h3>😐 Neutral</h3>
          <p>{stats.neutralPosts}
            <span className="analytics-percent">
    {" "}
    (
    {stats.totalPosts
      ? Math.round(
          (stats.neutralPosts / stats.totalPosts) * 100
        )
      : 0}
    %)
  </span>
</p>
        </div>

        <div className="analytics-card">
          <h3>☹ Negative</h3>
          <p>{stats.negativePosts}
            <span className="analytics-percent">
    {" "}
    (
    {stats.totalPosts
      ? Math.round(
          (stats.negativePosts / stats.totalPosts) * 100
        )
      : 0}
    %)
  </span>
</p>
        </div>
<div className="analytics-card">
  <h3>🎯 Conversion Leads</h3>
  <p>{stats.highIntentPosts}</p>
</div>
      </div>

      <hr className="analytics-divider" />
      <h3 className="section-title">
📌 Top Subreddits
</h3>

      <ul className="subreddit-list">
  {stats.topSubreddits?.length ? (
    stats.topSubreddits.map((sub) => (
      <li key={sub._id}>
        <span>r/{sub._id}</span>
        <strong>{sub.count} posts</strong>
      </li>
    ))
  ) : (
    <li>No subreddit data available.</li>
  )}
</ul>

<hr className="analytics-divider" />
<h3 className="section-title">
🔥 Trending Keywords
</h3>

<ul className="keyword-list">
{(stats.trendingKeywords || []).map((item) => (    <li key={item.keyword}>
      #{item.keyword}
      <strong>{item.count}</strong>
    </li>
  ))}
</ul>

<hr className="analytics-divider" />
<h3 className="section-title">
🏆 Top Competitors</h3>

<ul className="competitor-list">
{(stats.competitorStats || []).map((item) => (    <li key={item._id}>
      {item._id}
      <strong>{item.count}</strong>
    </li>
  ))}
</ul>

<h3>🔥 Trending Technologies</h3>

<ul className="keyword-list">
  {(stats.trendingKeywords || []).map((item) => (
    <li key={item.keyword}>
      #{item.keyword}
      <strong>{item.count}</strong>
    </li>
  ))}
</ul> 
<AnalyticsCharts stats={stats} />
    </div>
  );
}

export default AnalyticsPanel;