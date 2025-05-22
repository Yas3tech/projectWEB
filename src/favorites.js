// src/JS/favorites.js
import { getInfoLanden, favorites as globalFavorites } from './landen.js';

const favoritesPage = async (container) => {
  const landenData = await getInfoLanden();

  container.innerHTML = `
    <ul class="menu-bar">
      <li><a href="#/">Home</a></li>
      <li><a href="#/landen">Landen</a></li>
      <li><a href="#/favorieten">Favorieten</a></li>
      <li><a href="#/contact">Contact</a></li>
    </ul>

    <h1>Favoriete landen</h1>
    <div id="favorietenCards" class="card-container"></div>
  `;

  const containerCards = container.querySelector('#favorietenCards');

  // Filter landenData op favorieten
  const favorietenLanden = landenData.filter(land =>
    globalFavorites.includes(land.name.official)
  );

  if (favorietenLanden.length === 0) {
    containerCards.innerHTML = `<p>Je hebt nog geen favoriete landen toegevoegd.</p>`;
    return;
  }

  containerCards.innerHTML = favorietenLanden.map(land => {
    const naam = land.name.official;
    const vlag = land.flags.png;

    return `
      <div class="card">
        <img src="${vlag}" alt="Vlag van ${naam}" class="card-flag" />
        <h2>${naam}</h2>
        <button class="remove-fav-btn" data-land="${naam}">Verwijder uit favorieten</button>
      </div>
    `;
  }).join('');

  // Favorieten verwijderen knop
  container.querySelectorAll('.remove-fav-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const landNaam = btn.dataset.land;

      // Verwijder uit favorites
      const index = globalFavorites.indexOf(landNaam);
      if (index > -1) {
        globalFavorites.splice(index, 1);
        localStorage.setItem('favorites', JSON.stringify(globalFavorites));
        // Herlaad favorieten pagina
        favoritesPage(container);
      }
    });
  });
};

export default favoritesPage;
