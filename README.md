**Web Advanced Project**

## Projectbeschrijving:

Deze interactieve Single Page Application (SPA) is ontwikkeld voor het vak Advanced Web. De app biedt gebruikers een overzicht van landen wereldwijd, waarbij ze landen kunnen zoeken, filteren, sorteren en persoonlijke favorieten kunnen opslaan. 
De data wordt opgehaald via de gratis REST Countries API (https://restcountries.com/v3.1/all) en wordt gepresenteerd in visueel aantrekkelijke kaarten met uitgebreide informatie per land.
Het project combineert verschillende moderne JavaScript-concepten en technieken die tijdens het vak Web Advanced zijn behandeld.

## Functionaliteiten

| Onderdeel                      | Bestand(en)                         | Regels                                  | Uitleg                                                  |
| ------------------------------ | ----------------------------------- | --------------------------------------- | ------------------------------------------------------- |
| **Router en navigatie**        | `src/JS/router.mjs`                 | 1-26                                    | Router class, hashchange event, route handlers          |
| **Home pagina**                | `src/home.js`                       | 1-14                                    | Home component, statische HTML                          |
| **Landen pagina**              | `src/landen.js`                     | 1-199                                   | Data ophalen, zoeken, filteren, sorteren, tonen kaarten |
| **Favorieten functionaliteit** | `src/landen.js`, `src/favorites.js` | 50-150 (landen.js), 1-58 (favorites.js) | Favorieten opslaan, verwijderen, toggelen en tonen      |
| **Contact pagina**             | `src/contact.js`                    | 1-36                                    | Formulier met validatie en submit event                 |
| **404 pagina**                 | `src/404.js`                        | 1-14                                    | Not found component                                     |
| **Thema wisselen**             | `src/theme.js`                      | 1-20                                    | Thema toggle, localStorage opslaan                      |
| **Observer API (animaties)**   | `src/observerAPI.js`                | 1-16                                    | IntersectionObserver voor kaarten animaties             |
| **CSS Styling**                | `src/CSS/style.css`                 | 1-288                                   | Responsive design, thema styles, animaties, UI styling  |
| **API Data ophalen**           | `src/landen.js`                     | 10-40                                   | Fetch met async/await                                   |
| **Event handlers**             | Meerdere bestanden                  | Verspreid                               | Event listeners voor knoppen, inputs, router, etc.      |

## Installatiehandleiding

1. Clone de repository:  
   ```bash
   git clone https://github.com/jouwgebruikersnaam/jouwrepository.git
   cd jouwrepository
2. Installeer dependencies:
   ```
   npm install
 
3.Voor productie build:
  
   ```bash
npm run build
```
4. Start de ontwikkelserver:

```bash 
npm run dev
```
5. Open de app in je browser:
http://localhost:5173

## Locatie in Code Beschrijving

| Concept          | Locatie in Code                          | Beschrijving                                                       |
|------------------|-----------------------------------------|-------------------------------------------------------------------|
| Constanten       | `landen.js`, `theme.js`                 | Gebruik van `const` voor onveranderlijke waarden zoals API URL, DOM-elementen, etc. |
| Template literals| `landen.js`                            | HTML markup opgebouwd met backticks en `${}`-expressies.          |
| Iteratie (arrays)| `landen.js`                            | Gebruik van `map`, `filter`, `sort` om landen te verwerken.       |
| Arrow functions  | Meerdere bestanden (`landen.js`, `router.mjs`) | Gebruik van korte functie-syntaxis, o.a. voor event handlers en array-methodes. |
| Ternary operator | `landen.js`                            | Voor korte conditionele expressies, bijvoorbeeld bij sorteren en toggles. |
| Callback functions| Event listeners in `landen.js`, `favorites.js` | Functies worden doorgegeven aan event listeners en array-methodes. |
| Promises         | `landen.js`                            | Fetch API werkt met promises voor asynchrone data ophalen.       |
| Async & Await    | `landen.js`                            | Asynchrone functies voor overzichtelijke API-aanroepen.          |
| Observer API     | `observerAPI.js`                      | IntersectionObserver gebruikt om animaties te triggeren wanneer kaarten in beeld komen. |



**Gebruikte API**
REST Countries API
  link: https://restcountries.com/v3.1/all   :Deze API levert uitgebreide informatie over landen wereldwijd.
## Screenshots

### 1. Thema wisselen knop  
![4861c5aa-3452-4fee-9e9d-fe4096f75d0d](https://github.com/user-attachments/assets/b426905b-4894-43da-8565-253567ce6a60)
 
*Beschrijving:* Knop waarmee gebruiker kan schakelen tussen licht en donker thema.

---

### 2. Filter en sorteer opties boven de kaarten  
![ab63152e-aa9a-40ad-ba3c-21c29dfb6109](https://github.com/user-attachments/assets/8312409b-4459-410d-bb9a-a69f50d5c9e2)

*Beschrijving:* Dropdowns voor filteren op continent en sorteren op naam.

---

### 3. Kaarten overzicht landen + favorieten
![e3eddc44-f196-45f1-9a59-1d0378aaf06d](https://github.com/user-attachments/assets/21f42ea7-28a0-402c-974c-e60d4ce0dcdf)

*Beschrijving:* Overzicht van landenkaarten met vlag, details en favorieten knop in licht thema.

---

### 4. Zoekbalk  
![e2ba2b40-9779-4add-9fd2-0d846dda5cea](https://github.com/user-attachments/assets/d8b12097-975c-431e-8b28-1348c84c3924)

*Beschrijving:* Zoekbalk waar gebruiker landnamen kan invoeren om te filteren.

---

### 5. Favorietenpagina  
![3979cbf0-0b98-40ee-b418-516a1da43814](https://github.com/user-attachments/assets/a760254d-2598-4cf5-a4e9-930ba0277a3a)

*Beschrijving:* Overzicht van favorieten met knop om uit favorieten te verwijderen.

---

### 6. Navigatiebalk actief (favorieten pagina)
![67c18b8b-6c86-4421-8539-1d5245ab2320](https://github.com/user-attachments/assets/b7d4e2ad-90f5-4885-add4-869729016f95)

*Beschrijving:* Navigatiebalk met actieve pagina “Favorieten” gemarkeerd.

---

### 7. Landen overzicht donker thema 
![4615dbae-1672-4a72-b698-3fa4b9c26ad7](https://github.com/user-attachments/assets/a8bea6d5-e25a-4b4c-9782-e61d0e7f3139)

*Beschrijving:* Lijst met landen in donker thema, met laadanimatie zichtbaar.

---

### 8. Landen responsive view  
![f755f9a6-d806-45d3-a2fe-5761a704a567](https://github.com/user-attachments/assets/d2a1de59-1ae0-4d16-851f-f7c0f3b0f0e3)

*Beschrijving:* Kaarten overzicht landen op tablet.

---


### 9. knop “Wissel thema”  
![3e78edc0-22ea-4b35-82eb-af49c37fb06d](https://github.com/user-attachments/assets/6ed86dc5-ac5a-49cb-9632-1a36fc17be2f)

*Beschrijving:* Thema wisselknop op home pagina.



## Bronvermelding
REST Countries API: https://restcountries.com/
Font Awesome (voor iconen)
Vite (build tool)
Inspiratie zoekbalk: https://codepen.io/yuhomyan/pen/XWdYJdv
Inspiratie navigatie menu: https://codepen.io/kylelavery88/pen/abbvGRN
chat gpt:(https://chatgpt.com/share/682fa8c7-de48-8004-873e-3417f2865c28)
canvas : https://canvas.ehb.be/courses/39258/pages/module-8-moderne-browser-features-in-javascript#8_3
