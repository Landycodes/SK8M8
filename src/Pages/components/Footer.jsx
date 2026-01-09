import GithubIcon from "../../assets/github.png";
import InstagramIcon from "../../assets/instagram.png";
import YoutubeIcon from "../../assets/youtube.png";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-actions">
        <button
          className="donate-btn"
          onClick={() =>
            window.open(
              "https://buy.stripe.com/6oUdRa1lu6W46FNar9cEw00",
              "_blank",
            )
          }
        >
          Buy Me a Board
        </button>
        <button
          className="report-btn"
          onClick={() =>
            (window.location.href =
              "mailto:landryandrewsk8@gmail.com?subject=Sk8M8 Bug Report")
          }
        >
          Report a Problem
        </button>
      </div>

      <div className="footer-social">
        <a
          href="https://github.com/landycodes"
          target="_blank"
          rel="noreferrer"
        >
          <img className="footer-img" src={GithubIcon} alt="github" />
        </a>
        <a
          href="https://instagram.com/heeyyybuddy"
          target="_blank"
          rel="noreferrer"
        >
          <img className="footer-img" src={InstagramIcon} alt="instagram" />
        </a>
        <a
          href="https://youtube.com/@landysk8s"
          target="_blank"
          rel="noreferrer"
        >
          <img className="footer-img" src={YoutubeIcon} alt="youtube" />
        </a>
      </div>
    </footer>
  );
}
