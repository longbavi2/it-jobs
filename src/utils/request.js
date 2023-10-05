const API_DOMAIN = "http://localhost:8081/v1/api/";

export const get = async (path, options = {}) => {
  const response = await fetch(API_DOMAIN + path, options);
  const result = await response.json();
  return result;
};

export const post = async (path, options = {}) => {
  const response = await fetch(API_DOMAIN + path, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(options),
  });
  const result = await response.json();
  return result;
};

export const del = async (path, options = {}) => {
  const response = await fetch(API_DOMAIN + path, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(options),
  });
  const result = await response.json(options);
  return result;
};

export const patch = async (path, options = {}) => {
  const response = await fetch(API_DOMAIN + path, {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(options),
  });
  const result = await response.json();
  return result;
};
export const put = async (path, options = {}) => {
  const response = await fetch(API_DOMAIN + path, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(options),
  });
  const result = await response.json();
  return result;
};