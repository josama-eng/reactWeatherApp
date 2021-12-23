import { API_KEY } from "../constants/api-key";
import { BASE_PATH_URL } from "../constants/url";

export const fetchInstance = (queryString, optionalConfig) => {
  const localUrl = `${BASE_PATH_URL}key=${API_KEY}&q=${queryString}&days=10&aqi=no&alerts=no`;

  const defaultConfig = {
    method: "GET", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "X-Api-Key": API_KEY,
    },
  };

  const updatedConfig = {
    ...defaultConfig,
    ...optionalConfig,
  };

  return fetch(localUrl, updatedConfig);
};
