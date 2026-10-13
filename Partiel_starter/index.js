fetch("https://hp-api.onrender.com/api/characters")
  .then((response) => response.json())
  .then((data) => {

    const charactersContainer = document.querySelector(".characters");

    charactersContainer.innerHTML = "";

    const first20Characters = data.slice(0, 20);

    const defaultImage = "./images/troll.jpg";

    first20Characters.forEach((character) => {
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
  })
  .catch((error) => {
    console.error("Erreur lors de la récupération des personnages :", error);
  });
