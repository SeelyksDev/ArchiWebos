const editionBox = document.querySelector(".edition-box")
const liLogin = document.querySelector(".li-login")
const liLogout = document.querySelector(".li-logout")
const editionProjet = document.querySelector(".edition-projet")
const filterBox = document.querySelector(".filter_box")
let travauxData = ""

async function fetchTravaux() {
    const response = await fetch("http://localhost:5678/api/works");
    travauxData = await response.json();
    displayTravaux(travauxData);
}

function displayTravaux(travaux) {
    const gallery = document.querySelector('.gallery');
    let galleryHtml = '';
    travaux.forEach(travail => {
        galleryHtml += `
            <figure>
                <img src="${travail.imageUrl}" alt="${travail.title}" />
                <figcaption>${travail.title}</figcaption>
            </figure>`;
    });
    gallery.innerHTML = galleryHtml;
}

function choixCategorie(categorie) {
    if (categorie === '') {
        displayTravaux(travauxData);
    } else {
        const categorieFiltree = travauxData.filter(travail => travail.category.name === categorie)
        displayTravaux(categorieFiltree)
    }
}

function eventListener(categorie, btnSelector) {
    const btn = document.querySelector(btnSelector)
    btn.addEventListener('click', () => {
        choixCategorie(categorie)
    })
}

fetchTravaux();
eventListener("Objets", ".btn-objets")
eventListener("Appartements", ".btn-appartements")
eventListener("Hotels & restaurants", ".btn-hotels")
eventListener("", ".btn-tous")


 function modeAdmin() {
    //editionBox.style.display = "block"
    liLogin.style.display = "none"
    liLogout.style.display = "block"
    editionProjet.style.display = "block"
    filterBox.style.display = "none"
}


if (localStorage.getItem("userData")) {
        modeAdmin()  
}
