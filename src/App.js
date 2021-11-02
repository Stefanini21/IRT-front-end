import React, { Component } from "react";
import { Provider, useSelector } from "react-redux";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import { persistor, store } from "./store";
import { PersistGate } from "redux-persist/integration/react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import User from "./components/User";
import Login from "./components/Login";
import Home from "./components/Home";
import Admin from "./components/Admin";

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
