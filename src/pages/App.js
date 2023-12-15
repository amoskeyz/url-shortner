import { useState, useEffect } from "react";
import Icon from "../assets/images/icon.svg";
import linkIcon from "../assets/images/linkIcon.svg";
import copy from "../assets/images/copy.svg";
import { generateLink } from "../utils";
import InsertLinkIcon from "@mui/icons-material/InsertLink";
import toast from "react-hot-toast";

function App() {
  const [value, setValue] = useState({ url: "" });
  const [loading, setLoading] = useState(false);
  const [refetch, setrefetch] = useState(false);
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState();

  const handleChange = (e) => {
    setValue({ [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    if (!value.url) {
      toast.error("Link is required");
      return;
    } else if (value.url.includes(window.location.origin)) {
      toast.error("invalid link");
      return;
    }
    try {
      const err = new URL(value.url);
      const res = generateLink(value.url);
      setrefetch(!refetch);
    } catch (e) {
      toast.error("invalid link");
    }
  };

  useEffect(() => {
    setItems(JSON.parse(localStorage.getItem("urlData")));
  }, [refetch]);

  const copyUrl = (url) => {
    navigator?.clipboard?.writeText(url);
  };

  const onSearch = (e) => {
    const searchTerm = e.target.value;
    setSearchTerm(searchTerm);
    const filteredItems = JSON.parse(
      window.localStorage.getItem("urlData")
    ).filter((item) => item?.originalUrl.includes(searchTerm.toLowerCase()));
    setItems(filteredItems);
  };

  useEffect(() => {
    if (searchTerm === "") {
      setItems(JSON.parse(window.localStorage.getItem("urlData")));
    }
  }, [searchTerm]);

  return (
    <div className="main">
      <div>
        <p className="app-title">URL Shortner</p>
        <div className="input_container">
          <div className="input-wrap">
            <InsertLinkIcon fontSize="large" />
            <input
              placeholder="https://pasteyoururl.com"
              value={value.url}
              onChange={handleChange}
              name="url"
            />
            <button className="shortn-btn" onClick={handleSubmit} type="button">
              Shorten URL
            </button>
          </div>
        </div>

        {items?.length > 0 ? (
          <div className="container">
            <input
              // className={`border-2 w-full rounded-md h-[40px] px-4 mb-4 text-[12px]`}
              placeholder="Search URL"
              onChange={onSearch}
            />
            <div className="show-results">
              {items?.map((item, index) => (
                <div
                  className={`single-result ${index > 0 ? "top-border" : ""}`}
                  key={index}
                >
                  <div className="result-image">
                    <img src={linkIcon} alt="icon" />
                  </div>
                  <div className="link">
                    <div>Zone Switch - Add Company Header Text</div>
                    <a
                      href="https://mos.lv/zxskkwww"
                      target="_blank"
                      rel="noreferrer"
                    >
                      https://mos.lv/zxskkwww
                    </a>
                  </div>
                  <div className="copy" onClick={() => copyUrl(item.shortUrl)}>
                    <img src={copy} alt="icon" />
                    <span>Copy Link</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default App;
