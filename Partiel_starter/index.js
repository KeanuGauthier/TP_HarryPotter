fetch("https://hp-api.onrender.com/api/characters")
  .then((response) => response.json())
  .then((data) => {
    const charactersContainer = document.querySelector(".characters");
    if (!charactersContainer) return;

    const defaultImage = "./images/troll.jpg";
    const allCharacters = data;
    let currentCharacters = [...allCharacters];

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

    displayCharacters(currentCharacters);

    const houseImages = document.querySelectorAll(".houses img");

    houseImages.forEach((img) => {
      img.addEventListener("click", () => {
        const houseName = img.alt;

        currentCharacters = allCharacters.filter(
          (character) => character.house === houseName
        );

        currentCharacters.sort((a, b) => a.name.localeCompare(b.name));

        displayCharacters(currentCharacters);
      });
    });

    const sortNameBtn = document.querySelector("#sort-name");
    const sortAgeBtn = document.querySelector("#sort-age");
    const sortAliveBtn = document.querySelector("#sort-alive");

    if (sortNameBtn) {
      sortNameBtn.addEventListener("click", () => {
        currentCharacters.sort((a, b) => a.name.localeCompare(b.name));
        displayCharacters(currentCharacters);
      });
    }

    if (sortAgeBtn) {
      sortAgeBtn.addEventListener("click", () => {
        currentCharacters.sort((a, b) => {
          const ageA = a.yearOfBirth ? 2026 - a.yearOfBirth : 0;
          const ageB = b.yearOfBirth ? 2026 - b.yearOfBirth : 0;
          return ageB - ageA;
        });
        displayCharacters(currentCharacters);
      });
    }

    if (sortAliveBtn) {
      sortAliveBtn.addEventListener("click", () => {
        currentCharacters.sort((a, b) => {
          return (b.alive === true ? 1 : 0) - (a.alive === true ? 1 : 0);
        });
        displayCharacters(currentCharacters);
      });
    }

    const searchInput = document.querySelector("#search-input");

    if (searchInput) {
      searchInput.addEventListener("input", () => {
        const searchText = searchInput.value.toLowerCase();

        const filteredByName = currentCharacters.filter((character) =>
          character.name.toLowerCase().includes(searchText)
        );

        displayCharacters(filteredByName);
      });
    }
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
