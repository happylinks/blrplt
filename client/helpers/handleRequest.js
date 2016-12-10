import qs from 'qs';

async function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(response.statusText);
  const json = await response.json();
  error.response = json;
  throw error;
}

function parseJSON(response) {
  return response.json();
}

export function handleRequest(url, options = {}) {
  if (options.query) {
    const query = qs.stringify(options.query);
    url = `${url}?${query}`;
  }
  return fetch(url, options)
    .then(checkStatus)
    .then(parseJSON);
}
