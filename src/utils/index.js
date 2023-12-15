//short Url code generator
export const generateRandomString = () =>
  Math.random().toString(36).slice(2, 7);

export const generateLink = (originalUrl) => {
  //get data if exist
  let data = localStorage.getItem("urlData");
  const getCode = Math.random().toString(36).slice(2, 7); // genrate shortlink code


  if (data) {
    data = JSON.parse(data);
    const getLink = data.find((url) => url.originalUrl === originalUrl); // check if url exists 
    if (getLink) {
      return {
        success: false,
      };
    }

    // update array data
    data.push({
      id: data?.length + 1,
      originalUrl,
      shortUrl: `${window.origin}/${getCode}`,
      code: getCode,
    });

    // push new data to local storage
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

    // push new data to local storage
    window.localStorage.setItem("urlData", JSON.stringify(data));
  }

  return { success: true, data };
};

export const deleteLink = (id) => {
  try {
    const data = JSON.parse(localStorage.getItem("urlData"));

     // check if link exists
    const getlink = data.find((link) => link.id === id);
    if (getlink) {

      //filter out link to be deleted from array
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

export const editLink = ({ id, url }) => {
  try {
    let data = JSON.parse(localStorage.getItem("urlData"));

    // check if link exists
    const getLink = data.find((item) => item.originalUrl === url);
    if (getLink) {
      return false
    }

    //get link index in array
    const getlink = data.findIndex((link) => link.id === id);
    if (getlink > -1) {

      //update original url
      data[getlink].originalUrl = url;

      //push update link to local storage
      window.localStorage.setItem("urlData", JSON.stringify(data));
      return true;
    }
    return false;
  } catch (e) {
    return false;
  }
};
