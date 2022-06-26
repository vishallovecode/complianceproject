import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./Router.js";
import { store } from "./redux";


export default function App() {
  return (
    <div className="App">
      <Provider store={store}>
          <BrowserRouter>
            <AppRouter />
          </BrowserRouter>
      </Provider>
    </div>
  );
}
