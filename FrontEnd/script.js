const editionBox = document.querySelector(".edition-box");
const liLogin = document.querySelector(".li-login");
const linkContact = document.querySelector("#contact");
const navLink = document.querySelector(".nav-link");
const logoutLink = document.createElement("a");
const liLogout = document.createElement("li");
const editionProjet = document.querySelector(".edition-projet");
const filterBox = document.querySelector(".filter_box");
const li = document.createElement("li");
const filterButtons = document.querySelectorAll(".filter-btn");
const btnTous = document.querySelector(".btn-tous");
const btnModif = document.querySelector(".modif-btn");
const body = document.querySelector("body");

const containerModale = document.createElement("div");
const modale = document.createElement("section");
const cross = document.createElement("i");
const alignCenterModale = document.createElement("div");
const modaleTitle = document.createElement("h1");
const modifGallery = document.createElement("div");
const addBtn = document.createElement("button");

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
const categoryInput = document.createElement("select");
const option1 = document.createElement("option");
const validBtn = document.createElement("button");

let travauxData = "";
let categoryData;

const fetchTravaux = async () => {
    const response = await fetch("http://localhost:5678/api/works");
    travauxData = await response.json();
    displayTravaux(travauxData);
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

const fetchFilters = async () => {
    const response = await fetch("http://localhost:5678/api/categories");
    categoryData = await response.json();
    displayFilters(categoryData);
    manageFilterClick();
};

const displayFilters = (filters) => {
    const filterBox = document.querySelector(".filter_box");
    const tousFilter = document.createElement("li");
    tousFilter.classList.add("filter-btn", "btn-tous", "active");
    tousFilter.textContent = "Tous";

    tousFilter.addEventListener("click", () => {
        choixCategorie("");
    });

    filterBox.appendChild(tousFilter);

    filters.forEach((filter) => {
        const li = document.createElement("li");
        li.textContent = filter.name;
        li.classList.add("filter-btn");

        li.addEventListener("click", () => {
            choixCategorie(filter.id);
        });
        filterBox.appendChild(li);
    });
};

const choixCategorie = (categoryId) => {
    let categorieFiltree;
    if (categoryId === "") {
        categorieFiltree = travauxData;
    } else {
        categorieFiltree = travauxData.filter(
            (travail) => travail.categoryId === categoryId
        );
    }
    displayTravaux(categorieFiltree);
};

fetchFilters();
fetchTravaux();

const manageFilterClick = () => {
    const filterButtons = document.querySelectorAll(".filter_box li");

    filterButtons.forEach((button) => {
        button.addEventListener("click", () => {
            filterButtons.forEach((btn) => {
                btn.classList.remove("active");
            });
            button.classList.add("active");
        });
    });
};

const modeAdmin = () => {
    editionBox.style.height = "59px";
    liLogin.insertAdjacentElement("afterend", logoutLink);

    liLogout.classList.add("li-logout");
    liLogout.textContent = "logout";

    liLogout.style.display = "block";
    logoutLink.appendChild(liLogout);

    liLogin.style.display = "none";

    editionProjet.style.display = "block";

    filterBox.style.visibility = "hidden";
};

let auth = JSON.parse(localStorage.getItem("auth")) ?? false;

if (auth) {
    modeAdmin();
    liLogout.addEventListener("click", () => {
        window.localStorage.removeItem("auth");
        window.location.href = "index.html";
    });
}
let modifBtnClicked = false;

btnModif.addEventListener("click", () => {
    displayModale();
    if (modifBtnClicked === false) {
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
    modifGallery.innerHTML = "";
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
        btnRemove.addEventListener("click", () => {
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
        createModale();
    });
};

const deleteTravaux = async (id) => {
    try {
        let response = await fetch(`http://localhost:5678/api/works/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${auth.token}`,
            },
        });

        if (!response.ok) {
            throw new Error("La requête n'a pas abouti");
        } else {
            const removedElement = document.querySelector(`[data-id="${id}"]`);
            if (removedElement) {
                removedElement.parentElement.remove();
            }
            fetchTravaux();
        }
    } catch (error) {
        console.error("Erreur lors de la suppression : ", error);
    }
};

const createAddModaleContainer = () => {
    containerModaleAdd.classList.add("modale-add-container");
    body.appendChild(containerModaleAdd);

    containerModaleAdd.style.display = "block";
};

const modaleContainerListener = () => {
    containerModaleAdd.addEventListener("click", () => {
        containerModaleAdd.style.display = "none";
        inputTitle.value = "";
        categoryInput.value = "";

        addPictureContainer.innerHTML = "";
        selectPictureBtn.value = null;

        const errorElement = document.querySelector(".error-img");
        if (errorElement) {
            errorElement.remove();
        }

        const previewImage = document.querySelector(".preview-image");
        if (previewImage) {
            previewImage.remove();
        }

        const validateMessage = document.querySelector(".validate-message");
        if (validateMessage) {
            validateMessage.remove();
        }

        modaleAdd.addEventListener("click", (event) => {
            event.stopPropagation();
        });
    });
};

const createBackgroundAddModale = () => {
    modaleAdd.classList.add("modale-add");
    containerModaleAdd.appendChild(modaleAdd);
};

const addModaleListener = () => {
    modaleAdd.addEventListener("click", (event) => {
        event.stopPropagation();
    });
};

const crossModale = () => {
    crossAddModale.classList.add("fa-solid", "fa-xmark", "cross");
    modaleAdd.appendChild(crossAddModale);
};

const crossModaleListener = () => {
    crossAddModale.addEventListener("click", () => {
        containerModaleAdd.style.display = "none";
        addPictureContainer.innerHTML = "";
        selectPictureBtn.value = null;
        inputTitle.value = "";
        categoryInput.value = "";

        const errorElement = document.querySelector(".error-img");
        if (errorElement) {
            errorElement.remove();
        }

        const previewImage = document.querySelector(".preview-image");
        if (previewImage) {
            previewImage.remove();
        }

        const validateMessage = document.querySelector(".validate-message");
        if (validateMessage) {
            validateMessage.remove();
        }
    });
};

const arrowLeftInit = () => {
    arrowLeftModale.classList.add(
        "fa-solid",
        "fa-arrow-left",
        "arrow-left-modale"
    );
    modaleAdd.appendChild(arrowLeftModale);
};

const arrowLeftModaleListener = () => {
    arrowLeftModale.addEventListener("click", () => {
        displayModale();

        containerModaleAdd.style.display = "none";
        selectPictureBtn.value = null;
        inputTitle.value = "";
        categoryInput.value = "";

        const errorElement = document.querySelector(".error-img");
        if (errorElement) {
            errorElement.remove();
        }

        const previewImage = document.querySelector(".preview-image");
        if (previewImage) {
            previewImage.remove();
        }

        const validateMessage = document.querySelector(".validate-message");
        if (validateMessage) {
            validateMessage.remove();
        }
    });
};

const alignModaleCenter = () => {
    alignModaleAdd.classList.add("modale-add-aligncenter");
    modaleAdd.appendChild(alignModaleAdd);
};

const modaleTitleInit = () => {
    modaleAddTitle.classList.add("modale-title", "modale-add-title");
    modaleAddTitle.textContent = "Ajout photo";
    alignModaleAdd.appendChild(modaleAddTitle);
};

const insertPictureContainerInit = () => {
    addPictureContainer.classList.add("add-picture-container");
    alignModaleAdd.appendChild(addPictureContainer);
};

const iconInsertPicture = () => {
    iconPicture.classList.add("fa-regular", "fa-image");
    addPictureContainer.appendChild(iconPicture);
};

const selectPictureLabelInit = () => {
    selectPictureLabel.setAttribute("for", "select-picture");
    selectPictureLabel.classList.add("label-btn-picture");
    selectPictureLabel.textContent = "+ Ajouter photo";
    addPictureContainer.appendChild(selectPictureLabel);
};

const selectPictureLabelListener = () => {
    selectPictureBtn.addEventListener("change", () => {
        const file = selectPictureBtn.files[0];

        if (file) {
            const acceptedFormats = ["image/jpeg", "image/png"];
            const maxSize = 4 * 1024 * 1024;
            const errorElement = document.querySelector(".error-img");
            if (errorElement) {
                errorElement.remove();
            }

            let alreadyDisplay = false;

            if (!acceptedFormats.includes(file.type)) {
                if (alreadyDisplay === false) {
                    const errorImg = document.createElement("p");
                    errorImg.classList.add("error-img");
                    errorImg.textContent =
                        "Veuillez sélectionner une image au format JPEG ou PNG.";
                    addPictureContainer.appendChild(errorImg);
                    alreadyDisplay = true;
                }
                selectPictureBtn.value = null;
            } else if (file.size > maxSize) {
                if (alreadyDisplay === false) {
                    const errorImg = document.createElement("p");
                    errorImg.classList.add("error-img");
                    errorImg.textContent = "La taille du fichier dépasse 4 Mo.";
                    addPictureContainer.appendChild(errorImg);
                    alreadyDisplay = true;
                }
                selectPictureBtn.value = null;
            } else {
                if (errorElement) {
                    errorElement.remove();
                }

                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = (event) => {
                    const image = document.createElement("img");
                    image.src = event.target.result;
                    image.classList.add("preview-image");
                    addPictureContainer.innerHTML = "";
                    addPictureContainer.appendChild(image);
                };
            }
        }
        const validateMessage = document.querySelector(".validate-message");
        if (validateMessage) {
            validateMessage.remove();
        }
    });
};

const selectPictureInput = () => {
    selectPictureBtn.setAttribute("id", "select-picture");
    selectPictureBtn.setAttribute("type", "file");
    selectPictureBtn.setAttribute("accept", "image/jpeg, image/png");
    addPictureContainer.appendChild(selectPictureBtn);
};

const infoSelectPicture = () => {
    infoPicture.classList.add("info-picture");
    infoPicture.textContent = "jpg, png : 4mo max";
    addPictureContainer.appendChild(infoPicture);
};

const formInfoPictureInit = () => {
    infoForm.classList.add("info-form");
    infoForm.method = "POST";
    alignModaleAdd.appendChild(infoForm);
};

const titleFormInit = () => {
    titleForm.classList.add("title-form");
    infoForm.appendChild(titleForm);
};

const labelTitleInit = () => {
    labelTitle.classList.add("label-title");
    labelTitle.setAttribute("for", "title");
    labelTitle.textContent = "Titre";
    titleForm.appendChild(labelTitle);
};

const inputTitleInit = () => {
    inputTitle.classList.add("input-title");
    inputTitle.setAttribute("type", "text");
    inputTitle.setAttribute("id", "title");
    titleForm.appendChild(inputTitle);
};

const categoryFormInit = () => {
    categoryForm.classList.add("category-form");
    infoForm.appendChild(categoryForm);
};

const categoryLabelInit = () => {
    const categoryLabel = document.createElement("label");
    categoryLabel.classList.add("label-category");
    categoryLabel.setAttribute("for", "category-select");
    categoryLabel.textContent = "Catégorie";
    categoryForm.appendChild(categoryLabel);
};

const categoryInputInit = () => {
    categoryInput.classList.add("input-category");
    categoryInput.setAttribute("name", "category");
    categoryInput.setAttribute("id", "category-select");
    categoryForm.appendChild(categoryInput);
};

const optionsSelectInit = async () => {
    option1.setAttribute("value", "");
    option1.textContent = "Choisir une catégorie";
    categoryInput.appendChild(option1);
    try {
        const response = await fetch("http://localhost:5678/api/categories");
        const categories = await response.json();

        if (response.ok) {
            categories.forEach((category) => {
                const option = document.createElement("option");
                option.setAttribute("value", category.name);
                option.textContent = category.name;
                categoryInput.appendChild(option);
            });
        } else {
            throw new Error("Erreur dans la récuperation des catégories");
        }
    } catch (error) {
        console.error(error);
    }
};

const displayConfirmation = () => {
    const validateMessage = document.createElement("p");
    validateMessage.classList.add("validate-message");
    validateMessage.textContent = "Votre travail à bien été ajouté !";
    infoForm.appendChild(validateMessage);
};

const validBtnInit = () => {
    validBtn.classList.add("add-btn", "valid-btn");
    validBtn.textContent = "Valider";
    alignModaleAdd.appendChild(validBtn);
};

const toggleValidBtn = () => {
    const file = selectPictureBtn.files[0];
    const title = inputTitle.value;
    const category = categoryInput.value;
    if (file && title.trim() !== "" && category !== "") {
        validBtn.disabled = false;
        validBtn.style.backgroundColor = "#1d6154";

        if (!validBtn.hasClickEvent) {
            validBtn.addEventListener("click", handleValidationClick);
            validBtn.hasClickEvent = true;
        }
    } else {
        validBtn.disabled = true;
        validBtn.style.backgroundColor = "#a7a7a7";
        validBtn.removeEventListener("click", handleValidationClick);
        validBtn.hasClickEvent = false;
    }
};

const handleValidationClick = (event) => {
    event.preventDefault();
    const file = selectPictureBtn.files[0];
    const title = inputTitle.value;
    const category = categoryInput.value;

    const selectedCategory = categoryData.find((el) => el.name === category);

    if (
        file &&
        title.trim() !== "" &&
        category !== "" &&
        selectedCategory &&
        selectedCategory.id
    ) {
        const categoryId = selectedCategory.id;
        fetchSendWork(title, file, categoryId);
    } else {
        console.error("La catégorie sélectionnée n'est pas valide.");
    }
};

const verificationEachInputValue = () => {
    selectPictureBtn.addEventListener("change", toggleValidBtn);
    inputTitle.addEventListener("input", toggleValidBtn);
    categoryInput.addEventListener("input", toggleValidBtn);
};

const resetFormElements = () => {
    selectPictureBtn.value = null;
    addPictureContainer.innerHTML = "";
    inputTitle.value = "";
    categoryInput.value = "";
    iconInsertPicture();
    selectPictureLabelInit();
    selectPictureLabelListener();
    selectPictureInput();
    infoSelectPicture();
    toggleValidBtn();
};

const fetchSendWork = async (title, file, category) => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("image", file);
    formData.append("category", category);

    try {
        const response = await fetch("http://localhost:5678/api/works", {
            method: "POST",
            headers: {
                accept: "application/json",
                authorization: `Bearer ${auth.token}`,
            },
            body: formData,
        });

        if (!response.ok) {
            console.log(response);
            throw new Error("L'envoi n'a pas pu aboutir");
        } else {
            const data = await response.json();
            await fetchTravaux();
            displayGallery(travauxData);
            resetFormElements();
            displayConfirmation();
        }
    } catch (error) {
        console.error("Erreur ", error);
    }
};
let optionsInitialized = false;
let categoryLabelInitialized = false;

const createModale = () => {
    createAddModaleContainer();
    modaleContainerListener();
    createBackgroundAddModale();
    addModaleListener();
    crossModale();
    crossModaleListener();
    arrowLeftInit();
    arrowLeftModaleListener();
    alignModaleCenter();
    modaleTitleInit();
    insertPictureContainerInit();
    iconInsertPicture();
    selectPictureLabelInit();
    selectPictureLabelListener();
    selectPictureInput();
    infoSelectPicture();
    formInfoPictureInit();
    titleFormInit();
    labelTitleInit();
    inputTitleInit();
    categoryFormInit();
    if (!categoryLabelInitialized) {
        categoryLabelInit();
        categoryLabelInitialized = true;
    }
    categoryInputInit();

    if (!optionsInitialized) {
        optionsSelectInit();
        optionsInitialized = true;
    }
    validBtnInit();
    toggleValidBtn();
    verificationEachInputValue();
};
