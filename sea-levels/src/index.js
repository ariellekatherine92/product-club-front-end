import React from "react";
import ReactDOM from "react-dom";
import { datadogLogs } from "@datadog/browser-logs";
import App from "./components/App";
import "bootstrap/dist/css/bootstrap.min.css";
import { createStore } from "redux";
import allReducers from "./reducers";
import { Provider } from "react-redux";

const store = createStore(
  allReducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

datadogLogs.init({
  clientToken: "pub42e3c3c6475bcab9c69fb502a121ae1b",
  site: "datadoghq.com",
  forwardErrorsToLogs: true,
  sampleRate: 100,
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
