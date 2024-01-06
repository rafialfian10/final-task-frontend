import App from "./App";
import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import { QueryClient, QueryClientProvider } from "react-query";
import { UserContextProvider } from "./context/userContext";
import { BrowserRouter as Router } from "react-router-dom";

// components redux
import { Provider } from 'react-redux';
import store from "./redux/Store";

// client
const client = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <UserContextProvider>
    <Provider store={store}>
      <QueryClientProvider client={client}>
        <React.StrictMode>
          <Router>
            <App />
          </Router>
        </React.StrictMode>
      </QueryClientProvider>
    </Provider>
  </UserContextProvider>
);

reportWebVitals();
