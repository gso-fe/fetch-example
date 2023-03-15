const filmDescriptions = [];
const filmsForm = document.querySelector('#filmsForm');
const teaserText = document.querySelector('#teaserText');
teaserText.innerHTML = "Kein Film ausgewählt ...";

fetch('https://swapi.dev/api/films/')
  .then(response => response.json())
  .then(data => {
    const films = data.results;
    films.forEach(film => {
      const option = document.createElement("option");
      option.value = film.url;
      option.text = film.title;
      filmsForm.appendChild(option);
      filmDescriptions.push(film.opening_crawl);
    })
  })
  .catch(error => console.error(error));

filmsForm.addEventListener("change", event => {
  const index = event.target.selectedIndex;
  teaserText.innerHTML = filmDescriptions[index-1];
});
