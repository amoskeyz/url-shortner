import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const Redirect = () => {
  const location = useLocation();
  const [error, setError] = useState(false);

  useEffect(() => {
    const code = location.pathname.replace("/", "");
    const urlList = window.localStorage.getItem("urlData");

    if (urlList) {
      const getOriginalLink = JSON.parse(urlList).find(
        (link) => link.code === code
      );

      getOriginalLink
        ? window.location.assign(getOriginalLink.originalUrl)
        : setError(true);
    } else setError(true);
  }, [location.pathname]);

  return (
    <div>
      {error ? (
        <div className="redirect">
          <h3>URL Not Found. Please check URL short code and try again</h3>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Redirect;
