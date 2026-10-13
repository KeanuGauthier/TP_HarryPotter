fetch("https://hp-api.onrender.com/api/characters")
  .then((response) => response.json())
  .then((data) => {
    const charactersContainer = document.querySelector(".characters");
    const defaultImage = "./images/troll.jpg";
    const first20Characters = data.slice(0, 20);

    function displayCharacters(list) {
      charactersContainer.innerHTML = "";

      list.forEach((character) => {
        const name = character.name || "non renseigné";
        const house = character.house || "non renseignée";
        const image = character.image || defaultImage;

        const isHarry = character.name === "Harry Potter";
        const imageTag = `<img src="${image}" alt="${name}" />`;
        const imageContent = isHarry
          ? `<a href="details.html">${imageTag}</a>`
          : imageTag;

        charactersContainer.innerHTML += `
          <div class="${house}">
            ${imageContent}
            <p>${name}</p>
          </div>
        `;
      });
    }

    displayCharacters(first20Characters);

    const houseImages = document.querySelectorAll(".houses img");

    houseImages.forEach((img) => {
      img.addEventListener("click", () => {
        const houseName = img.alt;

        const filteredCharacters = first20Characters.filter(
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
