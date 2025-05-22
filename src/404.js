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
  
  export default notFound;
  