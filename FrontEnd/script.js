const editionBox = document.querySelector(".edition-box");
const liLogin = document.querySelector(".li-login");
const liLogout = document.querySelector(".li-logout");
const editionProjet = document.querySelector(".edition-projet");
const filterBox = document.querySelector(".filter_box");
const btnLogout = document.querySelector(".li-logout");
const btnModif = document.querySelector(".modif-btn");
const body = document.querySelector("body");
//Récup pour la modale
const containerModale = document.createElement("div");
const modale = document.createElement("section");
const cross = document.createElement("i");
const alignCenterModale = document.createElement("div");
const modaleTitle = document.createElement("h1");
const modifGallery = document.createElement("div");
const addBtn = document.createElement("button");
let travauxData = "";

const fetchTravaux = async (callback) => {
  const response = await fetch("http://localhost:5678/api/works");
  travauxData = await response.json();
  callback(travauxData);
};

const displayTravaux = (travaux) => {
  const gallery = document.querySelector(".gallery");
  let galleryHtml = "";
  travaux.forEach((travail) => {
    galleryHtml += `
            <figure>
                <img src="${travail.imageUrl}" alt="${travail.title}" />
                <figcaption>${travail.title}</figcaption>
            </figure>`;
  });
  gallery.innerHTML = galleryHtml;
};

const choixCategorie = (categorie) => {
  if (categorie === "") {
    displayTravaux(travauxData);
  } else {
    const categorieFiltree = travauxData.filter(
      (travail) => travail.category.name === categorie
    );
    displayTravaux(categorieFiltree);
  }
};

const eventListener = (categorie, btnSelector) => {
  const btn = document.querySelector(btnSelector);
  btn.addEventListener("click", (event) => {
    choixCategorie(categorie);
  });
};

fetchTravaux(displayTravaux);
eventListener("Objets", ".btn-objets");
eventListener("Appartements", ".btn-appartements");
eventListener("Hotels & restaurants", ".btn-hotels");
eventListener("", ".btn-tous");

const modeAdmin = () => {
  editionBox.style.height = "59px";
  liLogin.style.display = "none";
  liLogout.style.display = "block";
  editionProjet.style.display = "block";
  filterBox.style.visibility = "hidden";
};

if (localStorage.getItem("Token")) {
  modeAdmin();
  btnLogout.addEventListener("click", () => {
    window.localStorage.removeItem("Token");
    window.location.href = "index.html";
  });
}

let token = localStorage.getItem("Token");

let modifBtnClicked = false;
btnModif.addEventListener("click", () => {
  displayModale();
  if (modifBtnClicked === false) {
    fetchTravaux(displayGallery);
    modifBtnClicked = true;
  }

  containerModale.addEventListener("click", () => {
    containerModale.style.display = "none";
  });

  document.querySelector(".modale").addEventListener("click", (event) => {
    event.stopPropagation();
  });
});

cross.addEventListener("click", () => {
  containerModale.style.display = "none";
});

const displayGallery = (travaux) => {
  travaux.forEach((travail) => {
    console.log(travail);
    const boxImg = document.createElement("div");
    boxImg.classList.add("box-img");
    const img = document.createElement("img");
    img.src = travail.imageUrl;
    img.classList.add("modale-img");
    modifGallery.appendChild(boxImg);
    boxImg.appendChild(img);
    const btnRemove = document.createElement("button");
    btnRemove.dataset.id = travail.id;
    btnRemove.addEventListener("click", () => {
      deleteTravaux(btnRemove.dataset.id);
    });
    btnRemove.classList.add("remove-box");
    btnRemove.dataset.id = travail.id;
    btnRemove.addEventListener("click", (event) => {
      console.log(event);
    });

    boxImg.appendChild(btnRemove);
    const iconRemove = document.createElement("i");
    iconRemove.classList.add("fa-solid", "fa-trash-can", "icon-remove");
    btnRemove.appendChild(iconRemove);
  });
};

const displayModale = () => {
  containerModale.classList.add("modale-container");
  body.appendChild(containerModale);
  containerModale.style.display = "block";

  modale.classList.add("modale");
  containerModale.appendChild(modale);

  cross.classList.add("fa-solid", "fa-xmark", "cross");
  modale.appendChild(cross);

  alignCenterModale.classList.add("modale-aligncenter");
  modale.appendChild(alignCenterModale);

  modaleTitle.classList.add("modale-title");
  modaleTitle.textContent = "Galerie photo";
  alignCenterModale.appendChild(modaleTitle);

  modifGallery.classList.add("gallery-modif");
  alignCenterModale.appendChild(modifGallery);

  addBtn.classList.add("add-btn");
  addBtn.textContent = "Ajouter une photo";
  alignCenterModale.appendChild(addBtn);
};

const deleteTravaux = async (id) => {
  let url = `http://localhost:5678/api/works/${id}`;
  let options = {
    method: "DELETE",
    headers: {
      Authorization: ` ${token}`,
    },
  };
  let response = await fetch(url, options);
  if (!response.ok) {
    throw new Error("La requête n'a pas abouti");
  } else {
    console.log("reussi !");
  }
};
console.log(token);
