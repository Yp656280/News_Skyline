let baseurl = "http://localhost:4000/";

let GetData = async (url, data) => {
  try {
    //console.log("Loading")
    let apiurl = "";
    if (data) {
      apiurl = baseurl + url + "?" + data;
    } else {
      apiurl = baseurl + url;
    }

    //console.log(apiurl);
    // console.log("GetData");
    // console.log("apiurl",apiurl);

    // myHeaders.append("Authorization", "Basic dGVzdDp0ZXN0");

    var requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
    };

    let response = await fetch(apiurl, requestOptions);
    //console.log("response",response);
    return response.json();
  } catch (error) {
    console.log(error);
  }
};

let PostData = async (url, data) => {
  try {
    let apiurl = baseurl + url;
    //  console.log(apiurl);

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let keyValue = null;

    if (keyValue !== null) {
      var utf8 = require("utf8");
      var base64 = require("base-64");
      var bytes = utf8.encode(keyValue);
      var encoded = base64.encode(bytes);
      myHeaders.append("Authorization", "Basic " + encoded);
    }

    var postRequestOptions = {
      method: "POST",
      headers: myHeaders,
      body: data,
      redirect: "follow",
    };

    let response = await fetch(apiurl, postRequestOptions);
    return response.json();
  } catch (error) {
    throw error;
  }
};

module.exports = { GetData, PostData };
