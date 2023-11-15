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




