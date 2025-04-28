import Router from './JS/router.mjs'
import './CSS/style.css'
 
const home = (container) => {
  container.innerHTML = `
  <h1>Home</h1>
  <p>Welkom op de homepage</p>
    <nav>
      <a href="#/contact">Contact</a>
    </nav>
  `;
};
 
const contact = (container) => {
  container.innerHTML = `
  <h1>Contact</h1>
  <p>Neem contact met ons op!</p>
  <nav>
    <a href="#/">Terug naar home</a>
  </nav>
  `;
};
 
const notFound = (container) => {
  container.innerHTML = `
  <h1>404 - Pagina niet gevonden</h1>
  <p>Sorry, de pagina die je zoekt bestaat niet.</p>
  <nav>
    <a href="#/">Terug naar home</a>
  `;
};
 
const router = new Router({
  '/': home,
  '/contact': contact,
  '/404': notFound
})