fetch("https://hp-api.onrender.com/api/characters")
  .then((response) => response.json())
  .then((data) => {
    const charactersContainer = document.querySelector(".characters");
    if (!charactersContainer) return;

    const defaultImage = "./images/troll.jpg";
    const allCharacters = data;

    function displayCharacters(list) {
      charactersContainer.innerHTML = "";

      list.forEach((character) => {
        const name = character.name || "non renseigné";
        const house = character.house || "non renseignée";
        const image = character.image || defaultImage;
        const id = character.id;

        charactersContainer.innerHTML += `
          <div class="${house}">
            <a href="details.html?id=${id}">
              <img src="${image}" alt="${name}" />
            </a>
            <p>${name}</p>
          </div>
        `;
      });
    }

    displayCharacters(allCharacters);

    const houseImages = document.querySelectorAll(".houses img");

    houseImages.forEach((img) => {
      img.addEventListener("click", () => {
        const houseName = img.alt;

        const filteredCharacters = allCharacters.filter(
          (character) => character.house === houseName
        );

        filteredCharacters.sort((a, b) => a.name.localeCompare(b.name));

        displayCharacters(filteredCharacters);
      });
    });
  })
  .catch((error) => {
    console.error("Erreur lors de la récupération des personnages :", error);
  });

const menuButton = document.querySelector(".header__left img");
const menuList = document.querySelector(".header__left ul");

if (menuButton && menuList) {
  menuButton.addEventListener("click", () => {
    menuList.classList.toggle("open");
  });
}
