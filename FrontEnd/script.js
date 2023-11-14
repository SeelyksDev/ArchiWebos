async function fetchTravaux() {
const response = await fetch("http://localhost:5678/api/works");
const travaux = await response.json();
for (i = 0; i < travaux.length; i++){
    const gallery = document.querySelector('.gallery')
    let galleryHtml = `<figure>
                      <img
                      src="${travaux[i].imageUrl}"
                      alt="${travaux[i].title}"/>
                     <figcaption>${travaux[i].title}</figcaption>
                     </figure>`
    gallery.innerHTML += galleryHtml
}
}

fetchTravaux()





