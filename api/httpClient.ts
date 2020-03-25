import fetch from "isomorphic-unfetch";
import {getToken} from "./auth";

export interface ApiRequestParams {
  method: "get" | "post";
  url: string;
  data?: Record<string, any>;
  isAuthenticated?: boolean;
  headers?: Record<string, string>;
}

const callApi = async <T>(requestParams: ApiRequestParams): Promise<T> => {
  const { method, url, data, isAuthenticated = true } = requestParams;

  let headers = {
    "Content-Type": "application/json"
  };

  if (isAuthenticated) {
    const token = getToken();
    headers["Authorization"] = `Bearer ${token}`;
  }

  const options = {
    method,
    headers: headers
  };

  let finalUrl = `//sike-api.herokuapp.com${url}`;
  if (method === "get") {
    const queryParams = new URLSearchParams(data);
    finalUrl = `${finalUrl}?${queryParams}`;
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
  }

  if (response && response.status >= 200 && response.status < 300) {
    return responseBody;
  }

  console.log("ERROR");
};

export const httpClient = {
  async get<T>(url, params?, isAuthenticated?): Promise<T> {
    return callApi({
      method: "get",
      url,
      data: params,
      isAuthenticated
    });
  },
  async post<T>(url, params?, isAuthenticated?): Promise<T> {
    return callApi({
      method: "post",
      url,
      data: params,
      isAuthenticated
    });
  }
};
