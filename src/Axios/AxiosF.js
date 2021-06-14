import axios from "axios";
import Store from "../Redux/Store";

const Axios = axios.create({
  baseURL: "http://demo.exits.in/PROJECT/api/"
  // baseURL: "http://kranos.in/api/"
});

Axios.interceptors.request.use(
  config => {
    const state = Store.getState();
    config.headers["Content-Type"] = "application/x-www-form-urlencoded";
    // config.headers["Authorization"] = "Bearer " + state.authToken;
    // config.headers["X-CodePen"] = "https://codepen.io/teroauralinna/full/vPvKWe";

    return config;
  },
  error => {
    // Do something with request error
    return Promise.reject(error);
  }
);
// { type: SET_BEARER_TOKEN, payload }
export default Axios;
