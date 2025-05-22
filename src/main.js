import Router from './JS/router.mjs'
import './CSS/style.css'

// REGIO API
async function getInfoLanden() {
  try {
    const resultaat = await fetch('https://restcountries.com/v3.1/all')
    const landen = await resultaat.json()
    console.log(landen);
    return landen
  } catch (error) {
    console.error('Er is een fout opgetreden bij het ophalen van de landen', error)
    return []
  }
}
// EINDE API

// REGIO HOME
const home = (container) => {
  container.innerHTML = `
     <ul class="menu-bar">
      <li><a href="#/">Home</a></li>
      <li><a href="#/landen">Landen</a></li>
      <li><a href="#/contact">Contact</a></li>
    </ul>
       <h1>Home</h1>
    <p>Welkom op de homepage</p>
  `
}
// EINDE HOME

// REGIO INFOLANDEN LADEN
async function landen(container) {
  const landenData = await getInfoLanden()

  container.innerHTML = `
  <h1>Landen</h1>
    <ul class="menu-bar">
      <li><a href="#/">Home</a></li>
      <li><a href="#/landen">Landen</a></li>
      <li><a href="#/contact">Contact</a></li>
    </ul>
    
    <div class="search-container">
      <input type="text" placeholder="Zoek een land..." class="search-input" id="searchInput" />
      <a href="#" class="search-btn"><i class="fas fa-search"></i></a>
    </div>
 <div class="filter-container">
    <label for="continentFilter">Filter op continent:</label>
    <select id="continentFilter">
      <option value="alle">Alle continenten</option>
      <option value="Africa">Afrika</option>
      <option value="Americas">Amerika</option>
      <option value="Asia">Azië</option>
      <option value="Europe">Europa</option>
      <option value="Oceania">Oceanië</option>
    </select>
</div>
    <div id="landenCards" class="card-container"></div>
  `
  // EINDE FILTER CONTINENT
  // REGIO LANDEN IN KAART WEERGEVEN
  const containerCards = document.getElementById('landenCards')
  const renderLanden = (lijst) => {
    containerCards.innerHTML = lijst.map(land => {
      const naam = land.name.official
      const hoofdstad = land.capital
      const continent = land.region
      const vlag = land.flags.png

      let geldInfo = 'Onbekend'
      if (land.currencies && Object.keys(land.currencies).length > 0) {
        const eersteKey = Object.keys(land.currencies)[0]
        const currency = land.currencies[eersteKey]
        const naam = currency.name || 'Onbekend'
        const symbool = currency.symbol || ''
        geldInfo = `${naam} (${symbool})`
      }

      return `
        <div class="card">
          <img src="${vlag}" alt="Vlag van ${naam}" class="card-flag">
          <h2>${naam}</h2>
          <p><strong>Hoofdstad:</strong> ${hoofdstad}</p>
          <p><strong>Continent:</strong> ${continent}</p>
          <p><strong>Munt:</strong> ${geldInfo}</p>
        </div>
      `
    }).join('')
  }

  renderLanden(landenData)

  // REGIO GECOMBINEERDE ZOEK + FILTER
const zoekInput = document.getElementById('searchInput')
const continentFilter = document.getElementById('continentFilter')
function filterEnToonLanden() {
  const zoekTerm = zoekInput.value.toLowerCase()
  const geselecteerdContinent = continentFilter.value

  const gefilterd = landenData.filter(land => {
    const naam = (land.name?.official || '').toLowerCase()
    const continent = land.region || 'Onbekend'

    const naamMatch = naam.includes(zoekTerm)
    const continentMatch = geselecteerdContinent === 'alle' || continent === geselecteerdContinent

    return naamMatch && continentMatch
  })
  renderLanden(gefilterd)
}

zoekInput.addEventListener('input', filterEnToonLanden)
continentFilter.addEventListener('change', filterEnToonLanden)
}
// EINDE ZOEK + FILTER

// REGIO CONTACT
const contact = (container) => {
  container.innerHTML = `
   <ul class="menu-bar">
      <li><a href="#/">Home</a></li>
      <li><a href="#/landen">Landen</a></li>
      <li><a href="#/contact">Contact</a></li>
    </ul>  
  <h1>Contact</h1>
    <p>Neem contact met ons op!</p>
  `
}
// EINDE CONTACT

// REGIO 404 ERROR
const notFound = (container) => {
  container.innerHTML = `
   <ul class="menu-bar">
      <li><a href="#/">Home</a></li>
      <li><a href="#/landen">Landen</a></li>
      <li><a href="#/contact">Contact</a></li>
    </ul>
    <h1>404 - Pagina niet gevonden</h1>
    <p>Sorry, de pagina die je zoekt bestaat niet.</p>
  `;
};
// EINDE 404 ERROR

// REGIO ROUTER
const router = new Router({
  '/': home,
  '/contact': contact,
  '/landen':landen,
  '/404': notFound
})
// EINDE ROUTER