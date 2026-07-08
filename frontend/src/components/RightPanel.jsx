import "../styles/rightpanel.css";

function RightPanel({ posts }) {
  return (
    <aside className="right-panel">

      {/* TRENDING */}
      <div className="panel-card">

        <h3>🔥 Trending Topics</h3>

        <div className="trend"># React</div>
        <div className="trend"># NodeJS</div>
        <div className="trend"># MongoDB</div>
        <div className="trend"># Express</div>
        <div className="trend"># JavaScript</div>

      </div>

      {/* STATS */}
      <div className="panel-card">

        <h3>📊 Statistics</h3>

        <p>📝 Posts: {posts?.length || 0}</p>
        <p>👥 Users: 12</p>
        <p>💬 Comments: 53</p>

      </div>

    </aside>
  );
}

export default RightPanel;