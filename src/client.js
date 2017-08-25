import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import App from '@components/App';
import configureStore from '@stores';

import 'font-awesome/css/font-awesome.css';
import 'es6-promise/auto';

if (!document.body.animate) {
  const script = document.createElement('script');
  script.src = 'https://cdnjs.cloudflare.com/ajax/libs/web-animations/2.3.1/web-animations-next.min.js';
  document.head.appendChild(script);
}

window.addEventListener('beforeunload', event => {
  const dialogText = 'Do you really want to unload?';
  event.returnValue = dialogText;
  return dialogText;
});

const store = configureStore();

ReactDOM.render(
  <AppContainer>
    <Provider store={store}>
      <App />
    </Provider>
  </AppContainer>,
  document.getElementById('app')
);

if (module.hot) {
  module.hot.accept('./components/App', () => {
    const NextApp = require('./components/App').default; // eslint-disable-line global-require

    ReactDOM.render(
      <AppContainer>
        <Provider store={store}>
          <NextApp />
        </Provider>
      </AppContainer>,
      document.getElementById('app')
    );
  });
}
