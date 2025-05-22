import { toggleTheme } from './theme.js';
import { observeCards } from './observerAPI.js';

// Interne opslag favorieten
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

// Favorieten ophalen
export function getFavorites() {
  return [...favorites];
}

// Favoriet toevoegen
export function addFavorite(landNaam) {
  if (!favorites.includes(landNaam)) {
    favorites.push(landNaam);
    saveFavorites();
  }
}

// Favoriet verwijderen
export function removeFavorite(landNaam) {
  favorites = favorites.filter(f => f !== landNaam);
  saveFavorites();
}

// Favorieten opslaan in localStorage
function saveFavorites() {
  localStorage.setItem('favorites', JSON.stringify(favorites));
}

// Data ophalen van API
export async function getInfoLanden() {
  try {
    const res = await fetch('https://restcountries.com/v3.1/all');
    return await res.json();
  } catch (error) {
    console.error('Fout bij ophalen landen:', error);
    return [];
  }
}

// Favoriet toggle functie met visuele feedback animatie
export function toggleFavorite(landNaam, refresh) {
  if (favorites.includes(landNaam)) {
    removeFavorite(landNaam);
  } else {
    addFavorite(landNaam);
  }

  const btn = document.querySelector(`.fav-btn[data-land="${landNaam}"] i`);
  if (btn) {
    btn.classList.add('animate-pulse');
    btn.addEventListener('animationend', () => {
      btn.classList.remove('animate-pulse');
    }, { once: true });
  }

  refresh();
}

// Kaarten tonen
function toonLanden(lijst, container, refresh) {
  container.innerHTML = lijst.map(land => {
    const naam = land.name.official;
    const hoofdstad = Array.isArray(land.capital) ? land.capital[0] : (land.capital || 'Onbekend');
    const continent = land.region || 'Onbekend';
    const vlag = land.flags.png;
    const bevolking = land.population ? land.population.toLocaleString() : 'Onbekend';
    const oppervlakte = land.area ? land.area.toLocaleString() + ' km²' : 'Onbekend';
    const talen = land.languages ? Object.values(land.languages).join(', ') : 'Onbekend';

    let munt = 'Onbekend';
    if (land.currencies && Object.keys(land.currencies).length > 0) {
      const key = Object.keys(land.currencies)[0];
      const cur = land.currencies[key];
      munt = `${cur.name} (${cur.symbol || ''})`;
    }

    const isFavoriet = favorites.includes(naam);

    return `
      <div class="card">
        <img src="${vlag}" alt="Vlag van ${naam}" class="card-flag" />
        <h2>${naam}</h2>
        <p>Hoofdstad: ${hoofdstad}</p>
        <p>Continent: ${continent}</p>
        <p>Bevolking: ${bevolking}</p>
        <p>Oppervlakte: ${oppervlakte}</p>
        <p>Talen: ${talen}</p>
        <p>Munt: ${munt}</p>
        <button class="fav-btn" data-land="${naam}" aria-label="Favoriet toggle">
          <i class="fas fa-star ${isFavoriet ? 'favoriet' : 'niet-favoriet'}"></i>
        </button>
      </div>
    `;
  }).join('');

  // Favorieten knop eventlisteners
  container.querySelectorAll('.fav-btn').forEach(btn => {
    btn.addEventListener('click', () => toggleFavorite(btn.dataset.land, refresh));
  });

  // Observer toepassen voor animatie
  observeCards(container);
}

export async function landen(container) {
  const landenData = await getInfoLanden();

  container.innerHTML = `
    <button id="themeToggleBtn" aria-label="Thema wisselen" class="btn-theme">
      Wissel thema
    </button>

    <ul class="menu-bar">
      <li><a href="#/">Home</a></li>
      <li><a href="#/landen">Landen</a></li>
      <li><a href="#/favorieten">Favorieten</a></li>
      <li><a href="#/contact">Contact</a></li>
    </ul>

    <h1>Landen</h1>
      <h2 class="search-title">Zoek een land op de balk hieronder:</h2>
    <div class="search-container">
      <input type="text" placeholder="Zoek een land..." id="searchInput" class="search-input" />
      <a href="#/landen" class="search-btn" aria-label="Zoek"><i class="fas fa-search"></i></a>
    </div>

    <div class="filter-sort-container">
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

      <div class="sort-container">
        <label for="sortOrder">Sorteer op naam:</label>
        <select id="sortOrder">
          <option value="asc">A-Z</option>
          <option value="desc">Z-A</option>
        </select>
      </div>
    </div>

    <div id="landenCards" class="card-container"></div>
  `;

  const btnTheme = container.querySelector('#themeToggleBtn');
  btnTheme.addEventListener('click', () => toggleTheme());

  const containerCards = container.querySelector('#landenCards');
  const zoekInput = container.querySelector('#searchInput');
  const continentFilter = container.querySelector('#continentFilter');
  const sortOrder = container.querySelector('#sortOrder');

  function filterEnToonLanden() {
    const zoekTerm = zoekInput.value.toLowerCase();
    const geselecteerdContinent = continentFilter.value;
    const geselecteerdeSortering = sortOrder.value;

    let gefilterd = landenData.filter(land => {
      const naam = (land.name?.official || '').toLowerCase();
      const continent = land.region || 'Onbekend';

      const naamMatch = naam.includes(zoekTerm);
      const continentMatch = geselecteerdContinent === 'alle' || continent === geselecteerdContinent;

      return naamMatch && continentMatch;
    });

    gefilterd.sort((a, b) => {
      const naamA = a.name?.official || '';
      const naamB = b.name?.official || '';
      return geselecteerdeSortering === 'asc'
        ? naamA.localeCompare(naamB)
        : naamB.localeCompare(naamA);
    });

    if (gefilterd.length === 0) {
        containerCards.innerHTML = `<p>Geen landen gevonden.</p>`;
      } else {
        toonLanden(gefilterd, containerCards, filterEnToonLanden);
      }
  }

  zoekInput.addEventListener('input', filterEnToonLanden);
  continentFilter.addEventListener('change', filterEnToonLanden);
  sortOrder.addEventListener('change', filterEnToonLanden);

  filterEnToonLanden();
}

export default landen;
