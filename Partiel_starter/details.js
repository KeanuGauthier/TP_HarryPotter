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
      const dateOfBirth = character.dateOfBirth || "non renseigné";
      const ancestry = character.ancestry || "non renseigné";
      const eyeColour = character.eyeColour || "non renseigné";
      const patronus = character.patronus || "non renseigné";

      let wandText = "non renseigné";
      if (character.wand && (character.wand.wood || character.wand.core)) {
        wandText = `${character.wand.wood || ""} ${character.wand.core || ""}`.trim();
      }

      const titleElement = document.querySelector("main h3");
      if (titleElement) {
        titleElement.textContent = name;
      }

      const imgElement = document.querySelector(".perso__left img");
      if (imgElement) {
        imgElement.src = image;
        imgElement.alt = name;
      }

      const figcaptionElement = document.querySelector(".perso__left figcaption");
      if (figcaptionElement) {
        figcaptionElement.textContent = actor;
      }

      const infoContainer = document.querySelector(".perso__right");
      if (infoContainer) {
        infoContainer.innerHTML = `
          <div>
            <p class="attr">House :</p>
            <p>${house || "non renseignée"}</p>
          </div>
          <div>
            <p class="attr">Date of birth :</p>
            <p>${dateOfBirth}</p>
          </div>
          <div>
            <p class="attr">Ancestry :</p>
            <p>${ancestry}</p>
          </div>
          <div>
            <p class="attr">Eye colour :</p>
            <p>${eyeColour}</p>
          </div>
          <div>
            <p class="attr">Wand :</p>
            <p>${wandText}</p>
          </div>
          <div>
            <p class="attr">Patronus :</p>
            <p>${patronus}</p>
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
