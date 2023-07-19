import "../styles/Home.css";
import lightLogo from "../data/LightCurrenSeeLogo.svg";
import GithubIcon from "./icons/GithubIcon";
import Loading from "./Loading";

const Home = () => {
  return (
    <div className="home-container">
      <img
        className="logo"
        src={lightLogo}
        alt="The webpage logo - Stacks of various coins"
      />
      <span>CurrenSee</span>
      <p>
        Explore the globe effortlessly, discovering new cultures and staying
        updated on the latest exchange rates
      </p>

      <a className="github-link" href="https://github.com/Avihay2" target="_blank" rel="noopener noreferrer">
        <GithubIcon />
        <span className="creator-span">Built by Avihay Cohen</span>
      </a>
      <Loading />
    </div>
  );
};

export default Home;
