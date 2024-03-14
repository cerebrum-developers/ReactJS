export const getBasicAuthHeaders = () => {
  let headers = {
    Authorization: `Basic ${btoa(
      import.meta.env.VITE_APP_BASIC_AUTH_USERNAME +
        ":" +
        import.meta.env.VITE_APP_BASIC_AUTH_PASSWORD
    )}`,
  };
  return headers;
};

/**
 * @function getAuthHeaders
 * @desc This handles returns the auth headers array, which can be used in making api requests
 */
 export const getAuthHeaders = () => {
  let authToken = localStorage.getItem("authToken");
  if (authToken) {
    let headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`
    };
    return headers;
  } else {
    return null;
  }
};
