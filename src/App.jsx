import githubLogo from "../public/github-white-icon.svg";
import "./App.css";

function App() {
  return (
    <>
      <div>
        <a href="https://github.com/ccodekey" target="_blank">
          <img src={githubLogo} className="logo" alt="Github logo" />
        </a>
      </div>
      <h1>Em andamento</h1>
    </>
  );
}

export default App;
