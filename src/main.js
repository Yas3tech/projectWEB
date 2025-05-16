import Router from './JS/router.mjs'
import './CSS/style.css'

async function getInfoLanden() { 
  try{ 
      const resultaat = await fetch('https://restcountries.com/v3.1/all') // info ophalen van API database
      const landen = await resultaat.json();
      console.log(landen);
      return landen;
    } catch (error) {
      console.error('Er is een fout opgetreden bij het ophalen van de landen', error);
      return [];
  }
  }
const home = (container) => {
  container.innerHTML = `
  <h1>Home</h1>
  <p>Welkom op de homepage</p>
    <nav>
      <a href="#/contact">Contact</a> <br>
      <a href="#/landen">Landen</a>
    </nav>
  `;
};
async function landen(container) {
  const landen = await getInfoLanden(); // Haal de landen op
  const filterLanden = landen.filter((land, index) => index !== 88);
  container.innerHTML = `
    <h1>Landen</h1>
    <p>Welkom op de landenpagina</p>
    <div class="card-container">
      ${filterLanden.map(land => {
        const naam = land.name.official;
        const hoofdstad = land.capital;
        const geld = land.currencies;
        const continent = land.region;
        const vlag = land.flags.png;

        return `
          <div class="card">
            <img src="${vlag}" alt="Vlag van ${naam}" class="card-flag">
            <h2>${naam}</h2>
            <p><strong>Hoofdstad:</strong> ${hoofdstad}</p>
            <p><strong>Continent:</strong> ${continent}</p>
            <p><strong>Munt:</strong> ${geld}</p>
          </div>
        `;
      }).join('')}
    </div>
    <nav>
      <a href="#/">Terug naar home</a>
      <a href="#/contact">Contact</a>
    </nav>
  `;
}

 
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