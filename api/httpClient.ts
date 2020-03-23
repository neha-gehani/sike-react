const callApi = async requestParams => {
 const { method, url, data } = requestParams;

 const options = {
   method,
   headers: {
     "Content-Type": "application/json",
     Authorization: `Bearer ${process.env.TEMP_TOKEN}`
   }
 };

 let finalUrl = process.env.BASE_URL+url;
 if (method === "get") {
   const queryParams = new URLSearchParams(data);
   finalUrl = `${url}?${queryParams}`;
 } else {
   options["body"] = JSON.stringify(data);
 }

 let response;
 let responseBody;

 try {
   response = await fetch(finalUrl, options);
 } catch (err) {
   console.log(err);
 }

 try {
   responseBody = await response.json().then(data => data);
 } catch (err) {
   console.log(err);
   // throw new ApiError(requestParams, {
   //   status: response.status,
   //   message: `Error while parsing API response: ${err.message}`,
   //   code: "INVALID_RESPONSE",
   //   data: null
   // });
 }

 if (response.status >= 200 && response.status < 300) {
   return responseBody;
 }

 console.log("ERROR");
};

export const httpClient = {
 async get(url, params?) {
   return callApi({
     method: "get",
     url,
     data: params
   });
 },
 async post(url, params?) {
   return callApi({
     method: "post",
     url,
     data: params
   });
 }
};
