/**
 * @function getAuthHeaders
 * @desc This handles returns the auth headers array, which can be used in making api requests
 */
export const getAuthHeaders = () => {
  let authToken = localStorage.getItem("authToken");
  if (authToken) {
    let headers = {
      "Content-Type": "application/json",
      Authorization: authToken
    };
    return headers;
  } else {
    return null;
  }
};

export const getBasicAuthHeaders = () => {
  const authToken = btoa(
    `${import.meta.env.VITE_APP_BASIC_AUTH_USERNAME}:${
      import.meta.env.VITE_APP_BASIC_AUTH_PASSWORD
    }`
  );

  if (authToken) {
    const headers = {
      Authorization: `Basic ${authToken}`
    };
    return headers;
  }
  return null;
};

export const getAuthHeadersForUploading = () => {
  let authToken = localStorage.getItem("authToken");
  if (authToken) {
    let headers = {
      "Content-Type": "multipart/form-data",
      Authorization: authToken
    };
    return headers;
  } else {
    return null;
  }
};
