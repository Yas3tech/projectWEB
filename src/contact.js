const contact = (container) => {
    container.innerHTML = `
      <ul class="menu-bar">
        <li><a href="#/">Home</a></li>
        <li><a href="#/landen">Landen</a></li>
        <li><a href="#/contact">Contact</a></li>
      </ul>
      <h1>Contact</h1>
      <form id="contactForm">
        <label for="naam">Naam:</label>
        <input type="text" id="naam" required />
        <label for="email">Email:</label>
        <input type="email" id="email" required />
        <label for="bericht">Bericht:</label>
        <textarea id="bericht" required></textarea>
        <button type="submit">Verstuur</button>
      </form>
      <p id="status"></p>
    `;
  
    const form = container.querySelector('#contactForm');
    const status = container.querySelector('#status');
  
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (form.checkValidity()) {
        status.textContent = 'Bedankt voor je bericht!';
        form.reset();
      } else {
        status.textContent = 'Vul alle velden correct in.';
      }
    });
  };
  
  export default contact;
  