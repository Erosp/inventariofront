import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import * as bootstrap from 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <PayPalScriptProvider options={{
      "client-id": "Adzh-j5un9wfBKE43Q5rlWNzHLZxOkQO5KvJUNUwGnUtXr9CPebBfDFR-Cx3_-oeNSsXJSBFk-AWaTM5"
    }}>
      <App />
    </PayPalScriptProvider>
  </React.StrictMode>
);
