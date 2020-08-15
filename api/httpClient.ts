import fetch from "isomorphic-unfetch";
import { getToken, deleteToken } from "./auth";

export interface ApiRequestParams {
  method: "get" | "post";
  url: string;
  data?: Record<string, any>;
  isAuthenticated?: boolean;
  headers?: Record<string, string>;
}
export interface ApiErrorResponse {
  status: number;
  message: string;
  code: string;
  data: any;
}

export class ApiError extends Error {
  public readonly request: ApiRequestParams;
  public readonly response: ApiErrorResponse;

  public constructor(request: ApiRequestParams, response: ApiErrorResponse) {
    super("API Request Failed");
    this.request = request;
    this.response = response;
  }
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

  let protocol = "http:";
  if (process.browser) {
    protocol = window.location.protocol;
  }
  let finalUrl = `https://kia-api.alzionlabs.com${url}`; // TODO: get from central config thing. maybe a .env?
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
    throw new ApiError(requestParams, {
      status: 0,
      message: err.message + ". Please try again.",
      code: "HTTP_CALL_FAILED",
      data: null
    });
  }

  try {
    responseBody = await response.json().then(data => data);
  } catch (err) {
    console.log(err);
    throw new ApiError(requestParams, {
      status: response.status,
      message: `Error while parsing API response: ${err.message}`,
      code: "INVALID_RESPONSE",
      data: null
    });
  }

  if (response && response.status >= 200 && response.status < 300) {
    return responseBody;
  }

  if (response.status === 401) {
    deleteToken();
    return responseBody;
  }

  throw new ApiError(requestParams, {
    status: response.status,
    message: responseBody.message,
    code: responseBody.code,
    data: responseBody.data
  });
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
