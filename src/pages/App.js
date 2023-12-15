// import logo from './logo.svg';
// import './App.css';
import Icon from "../assets/images/icon.svg";
import linkIcon from "../assets/images/linkIcon.svg";
import copy from "../assets/images/copy.svg";

function App() {
  return (
    <div className="main">
      <div>
        <p className="app-title">URL Shortner</p>
        <div className="input_container">
          <div className="input-wrap">
            <img src={Icon} alt="icon" />
            <input placeholder="https://pasteyoururl.com" />
            <button className="shortn-btn">Shorten</button>
          </div>
        </div>
        <div className="show-results">
          <div className="single-result">
            <div className="result-image">
              <img src={linkIcon} alt="icon"/>
            </div>
            <div className="link">
              <div>Zone Switch - Add Company Header Text</div>
              <a href="https://mos.lv/zxskkwww" target="_blank" rel="noreferrer">
                https://mos.lv/zxskkwww
              </a>
            </div>
            <div className="copy">
              <img src={copy} alt="icon"/>
              <span>Copy Link</span>
            </div>
          </div>
          <div className="single-result">
            <div className="result-image">
              <img src={linkIcon} alt="icon"/>
            </div>
            <div className="link">
              <div>Zone Switch - Add Company Header Text</div>
              <a href="https://mos.lv/zxskkwww" target="_blank" rel="noreferrer">
                https://mos.lv/zxskkwww
              </a>
            </div>
            <div className="copy">
              <img src={copy} alt="icon"/>
              <span>Copy Link</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
