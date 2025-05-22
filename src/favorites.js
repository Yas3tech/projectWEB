import { getInfoLanden, getFavorites, removeFavorite } from './landen.js';
import { observeCards } from './observerAPI.js';

const favoritesPage = async (container) => {
  const landenData = await getInfoLanden();
  const favorites = getFavorites();

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
    favorites.includes(land.name.official)
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

  // Observer toepassen zodat kaarten zichtbaar worden met animatie
  observeCards(containerCards);

  // Favorieten verwijderen knop
  container.querySelectorAll('.remove-fav-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const landNaam = btn.dataset.land;
      removeFavorite(landNaam);
      favoritesPage(container);
    });
  });
};

export default favoritesPage;
