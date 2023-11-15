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

function filtreTous() {
    const btnTous = document.querySelector('.btn-tous')
    btnTous.addEventListener('click', () => {
        fetchTravaux()
        displayTravaux(travauxData)
    })
}

function filtreObjet() {
    const btnObjet = document.querySelector('.btn-objets');
    btnObjet.addEventListener('click', () => {
        const objetFiltrees = travauxData.filter(travail => travail.category.name === "Objets");
        displayTravaux(objetFiltrees);
    });
}

function filtreAppartements() {
    const btnAppartements = document.querySelector('.btn-appartements')
    btnAppartements.addEventListener('click', () => {
        const appartementsFiltrees = travauxData.filter(travail => travail.category.name === "Appartements")
        displayTravaux(appartementsFiltrees)
    })
}

function filtreHotelEtAppart() {
    const btnHotelEtAppart = document.querySelector('.btn-hotels')
    btnHotelEtAppart.addEventListener('click', () => {
    const hotelEtAppartFiltees = travauxData.filter(travail => travail.category.name === "Hotels & restaurants" )
    displayTravaux(hotelEtAppartFiltees)
})
}

fetchTravaux();
filtreTous()
filtreObjet();
filtreAppartements()
filtreHotelEtAppart()



