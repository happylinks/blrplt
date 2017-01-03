import qs from 'qs';

async function checkStatus(response, options) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(response.statusText);
  if (!options.text) {
    const json = await response.json();
    error.response = json;
  }
  // } else {
  //   const json = await response.json();
  //   error.response = json;
  // }
  throw error;
}

function parseJSON(response) {
  return response.json();
}

function parseText(response) {
  return response.text();
}

export function handleRequest(url, options = {}) {
  if (options.query) {
    const query = qs.stringify(options.query);
    url = `${url}?${query}`;
  }
  if (!options.headers) {
    options.headers = {};
  }

  // Important for authentication cookie.
  if (!options.noCredentials) {
    options.credentials = 'include';
  }

  if (options.text) {
    return fetch(url, options)
      .then(res => checkStatus(res, options))
      .then(parseText);
  }
  return fetch(url, options)
    .then(checkStatus)
    .then(parseJSON);
}

function formEncoded(data) {
  const params = Object.keys(data).map((key) =>
    `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`
  ).join('&');
  return params;
}

export function post(url, data, options = {}) {
  let body;
  const headers = {
    ...options.headers,
    Accept: 'application/json',
  };
  delete options.headers;

  switch (options.type) {
    default:
    case 'json': {
      headers['Content-Type'] = 'application/json';
      body = JSON.stringify(data);
      break;
    }
    case 'form': {
      headers['Content-Type'] = 'application/x-www-form-urlencoded';
      body = formEncoded(data);
      break;
    }
  }

  return handleRequest(url, {
    method: 'POST',
    headers,
    body,
    ...options,
  });
}
