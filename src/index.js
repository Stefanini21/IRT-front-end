import React from "react";
import ReactDOM from "react-dom";
import { Provider, useDispatch } from "react-redux";
import { persistor, store } from "./store";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();
