export const generateRandomString = () =>
  Math.random().toString(36).slice(2, 7);

export const generateLink = (originalUrl) => {
  //get data if exist
  let data = localStorage.getItem("urlData");
  const getCode = Math.random().toString(36).slice(2, 7);

  // console.log(data, "data")
  if (data) {
    data = JSON.parse(data);
    data.push({
      id: data?.length + 1,
      originalUrl,
      shortUrl: `${window.origin}/${getCode}`,
      code: getCode,
    });
    localStorage.setItem("urlData", JSON.stringify(data));
  } else {
    data = [
      {
        id: 1,
        originalUrl,
        shortUrl: `${window.origin}/${getCode}`,
        code: getCode,
      },
    ];
    localStorage.setItem("urlData", JSON.stringify(data));
  }

  return data;
};

// export const urlRegex = new RegExp(
//   "^(https?:\\/\\/)?" + // protocol
//     "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
//     "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR IP (v4) address
//     "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
//     "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
//     "(\\#[-a-z\\d_]*)?$", // fragment locator
//   "i"
// );
