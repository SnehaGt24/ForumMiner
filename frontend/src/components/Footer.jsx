import "../styles/footer.css";
function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">

        <h3>ForumMiner</h3>

        <p>
          Helping businesses discover buying intent from
          Reddit and online communities.
        </p>

        <div className="footer-links">
          <span>React</span>
          <span>Express</span>
          <span>MongoDB</span>
          <span>OpenAI</span>
        </div>

        <small>
          © 2026 ForumMiner. All rights reserved.
        </small>

      </div>
    </footer>
  );
}

export default Footer;