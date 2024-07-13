"use client";
import secureLocalStorage from "react-secure-storage";
export const http_common = async (method, url, body, _customHeaders) => {
  try {
    const token = localStorage.getItem("token");
    const refresh_token = secureLocalStorage.getItem("refresh_token");
    var customHeaders = {
      Cookie: `access_token=${token}; refresh_token=${refresh_token}`,
      ..._customHeaders,
    };
    const headers = new Headers({
      "Content-Type": "application/json",
      Authorization: token ? `bearer ${token}` : "",
      ...customHeaders,
    });

    const opts = {
      method,
      mode: "cors",
      credentials: "include",
      redirect: "follow",
      cache: "no-cache",
      headers,
    };
    if (body) {
      opts.body = JSON.stringify(body);
    }
    const resp = await fetch(url, opts);
    if (resp.status == 401) {
      secureLocalStorage.clear();
      localStorage.clear();
      localStorage.setItem("session", "true");
      // if (typeof window !== "undefined") window.location.reload();
      if (typeof window !== "undefined") window.location.replace("/auth/signin");
      ;

      return;
    }
    try {
      let res = await resp.json();

     
      return res;
    } catch (err) {
      console.error("http_common: not json:", err);
      return null;
    }
  } catch (e) {
    console.log("Error here", e);
    return null;
  }
};

export const http_get = async (url) => {
  return http_common("GET", url);
};

export const http_post = async (url, body, _customHeaders) => {
  return http_common("POST", url, body, _customHeaders);
};

export const http_put = async (url, body) => {
  return http_common("PUT", url, body, null);
};

export const http_delete = async (url, body) => {
  return http_common("DELETE", url, body);
};
