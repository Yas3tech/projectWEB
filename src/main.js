import Router from './JS/router.mjs';
import home from './home.js';
import landen from './landen.js';
import contact from './contact.js';
import notFound from './404.js';
import favoritesPage from './favorites.js';
import './CSS/style.css';

const router = new Router({
  '/': home,
  '/landen': landen,
  '/favorieten': favoritesPage,
  '/contact': contact,
  '/404': notFound,
});
