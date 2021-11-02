import React, { Component } from "react";
import { Provider, useSelector } from "react-redux";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import { persistor, store } from "./store/store";
import { PersistGate } from "redux-persist/integration/react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./Login";

const App = () => {

  return (
    <Provider store={store}>
      <Router>
        <PersistGate persistor={persistor}>
          <div>
            <Header />
              <Login />
            <Footer />
          </div>
        </PersistGate>
      </Router>
    </Provider>
  );
};

export default App;
