const params = new URLSearchParams(window.location.search);
const characterId = params.get("id");

if (characterId) {
  fetch(`https://hp-api.onrender.com/api/character/${characterId}`)
    .then((response) => response.json())
    .then((data) => {
      const character = data[0];
      if (!character) return;

      const defaultImage = "./images/troll.jpg";
      const name = character.name || "non renseigné";
      const actor = character.actor || "non renseigné";
      const house = character.house || "";
      const image = character.image || defaultImage;
      const gender = character.gender || "non renseigné";
      const eyeColour = character.eyeColour || "non renseigné";
      const hairColour = character.hairColour || "non renseigné";
      const dateOfBirth = character.dateOfBirth || "non renseigné";
      const patronus = character.patronus || "non renseigné";
      const isAlive = character.alive;

      let alternateNamesText = "non renseigné";
      if (character.alternate_names && character.alternate_names.length > 0) {
        alternateNamesText = character.alternate_names.join(", ");
      }

      const titleElement = document.querySelector("main h3");
      if (titleElement) {
        titleElement.textContent = name;
      }

      const imgElement = document.querySelector(".perso__left img");
      if (imgElement) {
        imgElement.src = image;
        imgElement.alt = name;
        if (!isAlive) {
          imgElement.style.filter = "grayscale(100%)";
        }
      }

      const figcaptionElement = document.querySelector(".perso__left figcaption");
      if (figcaptionElement) {
        figcaptionElement.textContent = actor;
      }

      const infoContainer = document.querySelector(".perso__right");
      if (infoContainer) {
        infoContainer.innerHTML = `
          <div>
            <p class="attr">Gender :</p>
            <p>${gender}</p>
          </div>
          <div>
            <p class="attr">Eye :</p>
            <p>${eyeColour}</p>
          </div>
          <div>
            <p class="attr">Hair :</p>
            <p>${hairColour}</p>
          </div>
          <div>
            <p class="attr">Date of Birth :</p>
            <p>${dateOfBirth}</p>
          </div>
          <div>
            <p class="attr">Patronus :</p>
            <p>${patronus}</p>
          </div>
          <div>
            <p class="attr">Nicknames :</p>
            <p>${alternateNamesText}</p>
          </div>
        `;
      }

      const houseLogoElement = document.querySelector(".house__perso img");
      if (houseLogoElement) {
        if (house) {
          houseLogoElement.src = `./images/logo/${house}.png`;
          houseLogoElement.alt = house;
        } else {
          houseLogoElement.style.display = "none";
        }
      }
    })
    .catch((error) => {
      console.error("Erreur lors de la récupération du personnage :", error);
    });
}
