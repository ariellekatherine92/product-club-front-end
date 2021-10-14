import React from 'react';
import ReactDOM from 'react-dom';
import { datadogLogs } from '@datadog/browser-logs';
import App from './components/App';
import "bootstrap/dist/css/bootstrap.min.css";

datadogLogs.init({
  clientToken: 'pub42e3c3c6475bcab9c69fb502a121ae1b',
  site: 'datadoghq.com',
  forwardErrorsToLogs: true,
  sampleRate: 100,
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);


