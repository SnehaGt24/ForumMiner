
import {
  Chart as ChartJS,
  ArcElement,
 CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";

import "../styles/analyticsCharts.css";

import {
  Pie,
  Bar,
  Line,
} from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  LineElement,
PointElement
);

function AnalyticsCharts({ stats }) {
  const sourceData = {
    labels: ["Reddit", "Forum"],
    datasets: [
      {
        data: [stats.redditPosts, stats.forumPosts],
        backgroundColor: [
          "#FF5700",
          "#2563eb",
        ],
      },
    ],
  };

  const sentimentData = {
    labels: ["Positive", "Neutral", "Negative"],
    datasets: [
      {
        label: "Posts",
        data: [
          stats.positivePosts,
          stats.neutralPosts,
          stats.negativePosts,
        ],
        backgroundColor: [
          "#22c55e",
          "#f59e0b",
          "#ef4444",
        ],
      },
    ],
  };

  const subredditData = {
    labels: stats.topSubreddits.map(
      (s) => `r/${s._id}`
    ),
    datasets: [
      {
        label: "Posts",
        data: stats.topSubreddits.map(
          (s) => s.count
        ),
        backgroundColor: "#2563eb",
      },
    ],
  };

const timelineData = {
  labels: (stats.intentTimeline || []).map(
    (d) => `${d._id.day}/${d._id.month}`
  ),

  datasets: [
    {
      label: "Average Intent Score",
      data: (stats.intentTimeline || []).map(
        (d) => d.averageIntent
      ),
      borderColor: "#2563eb",
      backgroundColor: "#2563eb",
      tension: 0.3,
    },
  ],
};

  return (
    <div className="charts-container">

<div className="chart-card">
  <h3>Posts by Source</h3>

  <div className="chart-wrapper">
    <Pie
      data={sourceData}
      options={{
        responsive: true,
        maintainAspectRatio: false,
      }}
    />
  </div>
</div>

<div className="chart-card">
  <h3>Sentiment Distribution</h3>

  <div className="chart-wrapper">
    <Bar
      data={sentimentData}
      options={{
        responsive: true,
        maintainAspectRatio: false,
      }}
    />
  </div>
</div>

<div className="chart-card">
  <h3>Top Subreddits</h3>

  <div className="chart-wrapper">
    <Bar
      data={subredditData}
      options={{
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
          },
        },
        scales: {
          x: {
            ticks: {
              maxRotation: 0,
              minRotation: 0,
            },
          },
        },
      }}
    />
  </div>
</div>

<div className="chart-card">
  <h3>📈 Intent Trend</h3>

  <div className="chart-wrapper">
    <Line
      data={timelineData}
      options={{
        responsive: true,
        maintainAspectRatio: false,
      }}
    />
  </div>
</div>
    </div>
  );
}

export default AnalyticsCharts;