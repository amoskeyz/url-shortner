import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const Redirect = () => {
  const location = useLocation();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const code = location.pathname.replace("/", "");
    const urlList = localStorage.getItem("urlData");

    if (urlList) {
      const getOriginalLink = JSON.parse(urlList).find(
        (link) => link.code === code
      );

      getOriginalLink
        ? window.location.assign(getOriginalLink.originalUrl)
        : setError(true);
    } else setError(true);
  }, []);

  return <div>{error ? <div>not found</div> : null}</div>;
};

export default Redirect;
