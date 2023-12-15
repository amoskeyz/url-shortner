import { useState, useEffect } from "react";
import Icon from "../assets/images/icon.svg";
import linkIcon from "../assets/images/linkIcon.svg";
import copy from "../assets/images/copy.svg";
import { generateLink, deleteLink, editLink } from "../utils";
import InsertLinkIcon from "@mui/icons-material/InsertLink";
import toast from "react-hot-toast";
import deleteIcon from "../assets/images/delete.svg";
import editIcon from "../assets/images/edit.svg";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

function App() {
  const [value, setValue] = useState({ url: "", id: "" });
  const [loading, setLoading] = useState(false);
  const [refetch, setrefetch] = useState(false);
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState();

  const handleChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
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

  const handleDelete = (id) => {
    console.log(id);
    const isDelete = deleteLink(id);
    if (isDelete) setrefetch(!refetch);
    else {
      toast.error("Link Not Found");
    }
  };

  const handleEdit = () => {
    const isEdit = editLink(value);
    if (isEdit) {
      setrefetch(!refetch);
      toast.success("Link updated successfully");
      setValue({ url: "" });
      setrefetch(!refetch);
    } else  {
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
                    {/* <div>Zone Switch - Add Company Header Text</div> */}
                    <a
                      href={item.shortUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
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
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default App;
