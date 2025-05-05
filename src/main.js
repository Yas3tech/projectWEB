import Router from './JS/router.mjs'
import './CSS/style.css'

async function getInfoLanden() { 
      const resultaat = await fetch('https://restcountries.com/v3.1/all'); // info ophalen van API database
      const landen = await resultaat.json();
      return landen;
  }
const home = (container) => {
  container.innerHTML = `
  <h1>Home</h1>
  <p>Welkom op de homepage</p>
    <nav>
      <a href="#/contact">Contact</a>
      <a href="#/landen">Landen</a>
    </nav>
  `;
};
 const landen = (container) => {
const landen =  getInfoLanden();
  container.innerHTML = `
  <h1>Landen</h1>
  <p>Welkom op de landenpage</p>
  <ul>
  ${landen.map(land => `<li>${land.name.common}</li>`)}
  </ul>
    <nav>
    <a href="#/">Terug naar home</a>
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
  '/landen':landen,
  '/404': notFound
})