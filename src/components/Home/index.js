import { useState, useEffect } from "react";
import linkIcon from "../../assets/images/linkIcon.svg";
import copy from "../../assets/images/copy.svg";
import { generateLink, deleteLink, editLink } from "../../utils";
import InsertLinkIcon from "@mui/icons-material/InsertLink";
import toast from "react-hot-toast";
import deleteIcon from "../../assets/images/delete.svg";
import editIcon from "../../assets/images/edit.svg";

function App() {
  const [value, setValue] = useState({ url: "", id: "" });
  const [refetch, setrefetch] = useState(false);
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState();

  //Handle Url Input Changes
  const handleChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  //Submit Request to be saved in local storage
  const handleSubmit = (e) => {
    if (!value.url) {
      toast.error("Link is required");
      return;
    } else if (value.url.includes(window.location.origin)) {
      // Return Error if Origin URl is Supplied
      toast.error("invalid link");
      return;
    }
    try {
      //Validates URL
      new URL(value.url);
      const res = generateLink(value.url);
      setrefetch(!refetch);

      if (res.success) {
        toast.success("successfully generated link");
        setValue({ url: "" });
      } else {
        toast.error("Link already exists");
      }
    } catch (e) {
      console.log(e);
      toast.error("invalid link");
    }
  };

  useEffect(() => {
    setItems(JSON.parse(localStorage.getItem("urlData")));
  }, [refetch]);

  //Copy URl to Clipboard
  const copyUrl = (url) => {
    navigator?.clipboard?.writeText(url);
  };

  //Filter List of URL entries
  const onSearch = (e) => {
    const searchTerm = e.target.value;
    setSearchTerm(searchTerm);
    if (e.target.value.length > 2) {
      const filteredItems = JSON.parse(
        window.localStorage.getItem("urlData")
      ).filter((item) => item?.originalUrl.includes(searchTerm.toLowerCase()));
      setItems(filteredItems);
    }
  };

  useEffect(() => {
    if (searchTerm === "") {
      setItems(JSON.parse(window.localStorage.getItem("urlData")));
    }
  }, [searchTerm]);

  //Delete URL in local storage
  const handleDelete = (id) => {
    const isDelete = deleteLink(id);
    if (isDelete) setrefetch(!refetch);
    else {
      toast.error("Link Not Found");
    }
  };

  //Update original URL in local storage
  const handleEdit = () => {
    const isEdit = editLink(value);
    if (isEdit) {
      toast.success("Link updated successfully");
      setValue({ url: "" });
      setrefetch(!refetch);
    } else {
      toast.error("Link Already Exists");
    }
  };

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
            <button
              className="shortn-btn"
              onClick={value.id ? handleEdit : handleSubmit}
              type="button"
            >
              {value.id ? "Edit URL" : "Shorten URL"}
            </button>
          </div>
        </div>
        <div>
          {JSON.parse(window.localStorage.getItem("urlData")).length > 0 && (
            <input
              placeholder="Search URL"
              onChange={onSearch}
              className="search"
            />
          )}
          <div className="container">
            {items?.length > 0 ? (
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
                      <a href={item.shortUrl} target="_blank" rel="noreferrer">
                        {item.shortUrl}
                      </a>
                      <div className="originalUrl">{`Site URL: ${item.originalUrl}`}</div>
                    </div>
                    <div>
                      <div
                        className="copy"
                        onClick={() => copyUrl(item.shortUrl)}
                      >
                        <img src={copy} alt="icon" />
                        <span>Copy Link</span>
                      </div>
                      <div className="link-actions">
                        <div
                          className="delelte-btn"
                          onClick={() =>
                            setValue({ id: item.id, url: item.originalUrl })
                          }
                        >
                          <img src={editIcon} alt="edit-icon" />
                        </div>
                        <div
                          className="delelte-btn"
                          onClick={() => handleDelete(item.id)}
                        >
                          <img src={deleteIcon} alt="delete-icon" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="show-results space-top">
                <p className="not-found">No URL created Yet. </p>
              </div>
            )}
            {searchTerm && items?.length === 0 ? (
              <div className="show-results">
                <p className="not-found">Not Found</p>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
