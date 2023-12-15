import { useRouteLoaderData } from "react-router-dom";

export const generateRandomString = () =>
  Math.random().toString(36).slice(2, 7);

export const generateLink = (originalUrl) => {
  //get data if exist
  let data = localStorage.getItem("urlData");
  const getCode = Math.random().toString(36).slice(2, 7);

  // console.log(data, "data")
  if (data) {
    data = JSON.parse(data);
    const getLink = data.find((url) => url.originalUrl === originalUrl);
    if (getLink) {
      return {
        success: false,
      };
    }
    data.push({
      id: data?.length + 1,
      originalUrl,
      shortUrl: `${window.origin}/${getCode}`,
      code: getCode,
    });
    window.localStorage.setItem("urlData", JSON.stringify(data));
  } else {
    data = [
      {
        id: 1,
        originalUrl,
        shortUrl: `${window.origin}/${getCode}`,
        code: getCode,
      },
    ];
    window.localStorage.setItem("urlData", JSON.stringify(data));
  }

  return { success: true, data };
};

export const deleteLink = (id) => {
  try {
    const data = JSON.parse(localStorage.getItem("urlData"));
    const getlink = data.find((link) => link.id === id);
    if (getlink) {
      window.localStorage.setItem(
        "urlData",
        JSON.stringify(data.filter((link) => link.id !== id))
      );
      return true;
    }
    return false;
  } catch (e) {
    return false;
  }
};
