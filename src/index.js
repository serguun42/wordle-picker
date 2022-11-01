import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Message from './components/Message';
import ScrollToTop from './util/scroll-to-top';
import dispatcher from './util/dispatcher';
import store from './store';
import { checkSystemOnMediaChange } from './store/theme';
import './util/set-primary';
import './util/cache';
import './index.css';

/** @param {import("./store/theme").ThemeObject} */
function ApplyThemeClassToBody(theme) {
  if (theme.isDark) document.body.classList.add('is-dark');
  else document.body.classList.remove('is-dark');
}

dispatcher.link('themeChanged', ApplyThemeClassToBody);
ApplyThemeClassToBody(store.getState().theme);

window
  .matchMedia?.('(prefers-color-scheme: dark)')
  ?.addEventListener('change', () => store.dispatch(checkSystemOnMediaChange()));

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <ScrollToTop />
      <Routes>
        <Route element={<App />}>
          <Route path="/">
            <Route index element={<Home />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
    <Message />
  </Provider>
);
