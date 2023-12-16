const editionBox = document.querySelector(".edition-box");
const liLogin = document.querySelector(".li-login");
const liLogout = document.querySelector(".li-logout");
const editionProjet = document.querySelector(".edition-projet");
const filterBox = document.querySelector(".filter_box");
const btnLogout = document.querySelector(".li-logout");
const btnModif = document.querySelector(".modif-btn");
const body = document.querySelector("body");
//Récup pour la modaleGallery
const containerModale = document.createElement("div");
const modale = document.createElement("section");
const cross = document.createElement("i");
const alignCenterModale = document.createElement("div");
const modaleTitle = document.createElement("h1");
const modifGallery = document.createElement("div");
const addBtn = document.createElement("button");

//Récup modale ajout photos
const containerModaleAdd = document.createElement("div");
const modaleAdd = document.createElement("section");
const crossAddModale = document.createElement("i");
const arrowLeftModale = document.createElement("i");
const alignModaleAdd = document.createElement("div");
const modaleAddTitle = document.createElement("h1");
const addPictureContainer = document.createElement("div");
const iconPicture = document.createElement("i");
const selectPictureLabel = document.createElement("label");
const selectPictureBtn = document.createElement("input");
const infoPicture = document.createElement("p");
const infoForm = document.createElement("form");
const titleForm = document.createElement("div");
const labelTitle = document.createElement("label");
const inputTitle = document.createElement("input");
const categoryForm = document.createElement("div");
const categoryLabel = document.createElement("label");
const categoryInput = document.createElement("select");
const option1 = document.createElement("option");
const option2 = document.createElement("option");
const option3 = document.createElement("option");
const option4 = document.createElement("option");
const validBtn = document.createElement("button");

let travauxData = "";

const fetchTravaux = async () => {
  const response = await fetch("http://localhost:5678/api/works");
  travauxData = await response.json();
  displayTravaux(travauxData);
};

/*
const init = async () => {
    let works = getWorks();

}

init();

const getWorks = async () => {
    const response = await fetch("http://localhost:5678/api/works");
    return await response.json();
};
*/

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

fetchTravaux();
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

let auth = JSON.parse(localStorage.getItem("auth")) ?? false;

if (auth) {
  modeAdmin();
  btnLogout.addEventListener("click", () => {
    window.localStorage.removeItem("auth");
    window.location.href = "index.html";
  });
}

let modifBtnClicked = false;
btnModif.addEventListener("click", () => {
  displayModale();

  if (modifBtnClicked === false) {
    //fetchTravaux(displayGallery);
    displayGallery(travauxData);
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
    const boxImg = document.createElement("div");
    boxImg.classList.add("box-img");
    const img = document.createElement("img");
    img.src = travail.imageUrl;
    img.classList.add("modale-img");
    modifGallery.appendChild(boxImg);
    boxImg.appendChild(img);
    const btnRemove = document.createElement("button");
    btnRemove.type = "button";
    btnRemove.classList.add("remove-box");
    btnRemove.dataset.id = travail.id;
    btnRemove.addEventListener("click", (event) => {
      event.preventDefault();
      deleteTravaux(btnRemove.dataset.id);
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
  addBtn.addEventListener("click", () => {
    containerModale.style.display = "none";
    addModale();
  });
};

const deleteTravaux = async (id) => {
  let response = await fetch(`http://localhost:5678/api/works/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${auth.token}`,
    },
  });

  if (!response.ok) {
    throw new Error("La requête n'a pas abouti");
  } else {
    console.log("reussi !");
  }
};

const addModale = () => {
  containerModaleAdd.classList.add("modale-add-container");
  body.appendChild(containerModaleAdd);
  containerModaleAdd.style.display = "block";
  containerModaleAdd.addEventListener("click", () => {
    containerModaleAdd.style.display = "none";
  });

  modaleAdd.classList.add("modale-add");
  containerModaleAdd.appendChild(modaleAdd);
  modaleAdd.addEventListener("click", (event) => {
    event.stopPropagation();
  });

  crossAddModale.classList.add("fa-solid", "fa-xmark", "cross");
  modaleAdd.appendChild(crossAddModale);
  crossAddModale.addEventListener("click", () => {
    containerModaleAdd.style.display = "none";
  });

  arrowLeftModale.classList.add(
    "fa-solid",
    "fa-arrow-left",
    "arrow-left-modale"
  );
  arrowLeftModale.addEventListener("click", () => {
    displayModale();
    containerModaleAdd.style.display = "none";
    const previewImg = document.querySelector(".preview-image");
    previewImg.style.display = "none";
  });
  modaleAdd.appendChild(arrowLeftModale);

  alignModaleAdd.classList.add("modale-add-aligncenter");
  modaleAdd.appendChild(alignModaleAdd);

  modaleAddTitle.classList.add("modale-title", "modale-add-title");
  modaleAddTitle.textContent = "Ajout photo";
  alignModaleAdd.appendChild(modaleAddTitle);

  addPictureContainer.classList.add("add-picture-container");
  alignModaleAdd.appendChild(addPictureContainer);

  iconPicture.classList.add("fa-regular", "fa-image");
  addPictureContainer.appendChild(iconPicture);

  selectPictureLabel.setAttribute("for", "select-picture");
  selectPictureLabel.classList.add("label-btn-picture");
  selectPictureLabel.textContent = "+ Ajouter photo";
  addPictureContainer.appendChild(selectPictureLabel);
  selectPictureBtn.addEventListener("change", () => {
    const file = selectPictureBtn.files[0];

    if (file) {
      const reader = new FileReader();

      reader.readAsDataURL(file);

      reader.onload = (e) => {
        const image = document.createElement("img");
        image.src = e.target.result;
        image.classList.add("preview-image");
        addPictureContainer.innerHTML = "";
        addPictureContainer.appendChild(image);
      };
    }
  });

  selectPictureBtn.setAttribute("id", "select-picture");
  selectPictureBtn.setAttribute("type", "file");
  selectPictureBtn.setAttribute("accept", "image/jpg , image/png");
  addPictureContainer.appendChild(selectPictureBtn);

  infoPicture.classList.add("info-picture");
  infoPicture.textContent = "jpg, png : 4mo max";
  addPictureContainer.appendChild(infoPicture);

  infoForm.classList.add("info-form");
  infoForm.method = "POST";
  alignModaleAdd.appendChild(infoForm);

  titleForm.classList.add("title-form");
  infoForm.appendChild(titleForm);

  labelTitle.classList.add("label-title");
  labelTitle.setAttribute("for", "title");
  labelTitle.textContent = "Titre";
  titleForm.appendChild(labelTitle);

  inputTitle.classList.add("input-title");
  inputTitle.setAttribute("type", "text");
  inputTitle.setAttribute("id", "title");
  titleForm.appendChild(inputTitle);

  categoryForm.classList.add("category-form");
  infoForm.appendChild(categoryForm);

  categoryLabel.classList.add("label-category");
  categoryLabel.setAttribute("for", "category-select");
  categoryLabel.textContent = "Catégorie";
  categoryForm.appendChild(categoryLabel);

  categoryInput.classList.add("input-category");
  categoryInput.setAttribute("name", "category");
  categoryInput.setAttribute("id", "category-select");
  categoryForm.appendChild(categoryInput);

  option1.setAttribute("value", "");
  option1.textContent = "Choisir une catégorie";
  categoryInput.appendChild(option1);

  option2.setAttribute("value", "Objets");
  option2.textContent = "Objets";
  categoryInput.appendChild(option2);

  option3.setAttribute("value", "Appartements");
  option3.textContent = "Appartements";
  categoryInput.appendChild(option3);

  option4.setAttribute("value", "Hotels & restaurants");
  option4.textContent = "Hotels & restaurants";
  categoryInput.appendChild(option4);

  validBtn.classList.add("add-btn", "valid-btn");
  validBtn.textContent = "Valider";
  alignModaleAdd.appendChild(validBtn);
};
