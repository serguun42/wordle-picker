import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import NotFound from './pages/NotFound';
import Footer from './components/Footer';
import Message from './components/Message';
import ScrollToTop from './util/scroll-to-top';
import dispatcher from './util/dispatcher';
import store from './store';
import { checkSystemOnMediaChange } from './store/theme';
import { getWords } from './store/words';
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

window.addEventListener('load', () => store.dispatch(getWords()));

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <div id="app">
        <ScrollToTop />
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="/about" element={<About />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
      <Message />
    </BrowserRouter>
  </Provider>
);
