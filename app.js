const filmDescriptions = [];
const filmCharacters = [];
const filmsForm = document.querySelector('#filmsForm');
const teaserText = document.querySelector('#teaserText');
teaserText.innerHTML = "Kein Film ausgewählt ...";

fetch('https://swapi.dev/api/films/')
  .then(response => response.json())
  .then(data => {
    const films = data.results;
    films.forEach(film => {
      const option = document.createElement("option");
      const filmCharacterItem = {};
      option.value = film.url;
      option.text = film.title;
      filmsForm.appendChild(option);
      filmDescriptions.push(film.opening_crawl);
      filmCharacterItem.title = film.title;
      filmCharacterItem.characters = film.characters;
      filmCharacters.push(filmCharacterItem);
      return film.characters.forEach(item => {
        fetch(item);
      });
    })
  })
  .catch(error => console.error(error));

filmsForm.addEventListener("change", event => {
  const index = event.target.selectedIndex;
  teaserText.innerHTML = filmDescriptions[index-1];
});
