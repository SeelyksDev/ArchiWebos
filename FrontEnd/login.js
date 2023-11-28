const envoyer = document.querySelector(".form-login");
const wrongInfo = document.querySelector(".wrong-info");

envoyer.addEventListener("submit", (event) => {
    event.preventDefault();
    const authentification = {
        email: event.target.querySelector("[name=email]").value,
        password: event.target.querySelector("[name=mot-de-passe]").value,
    };
    const chargeUtile = JSON.stringify(authentification);

    let emailRegExp = new RegExp("[a-z0-9._-]+@[a-z0-9._-]+.[a-z0-9._-]+");
    let passwordRegExp = new RegExp("^(?=.*[A-Z])(?=.*\\d).+$");

    if (
        emailRegExp.test(authentification.email) &&
        passwordRegExp.test(authentification.password)
    ) {
        fetch("http://localhost:5678/api/users/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: chargeUtile,
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Erreur réseau.");
                }
                return response.json();
            })
            .then((data) => {
                localStorage.setItem("userData", JSON.stringify(data.token));
                console.log(localStorage.getItem("userData"));
                wrongInfo.textContent = "";
                window.location.href = "index.html";
            })
            .catch((error) => {
                console.log(error);
                //wrongInfo.textContent = "E-mail ou Mot de passe incorrect";
            });
    } else {
        wrongInfo.textContent = "E-mail ou Mot de passe incorrect";
    }
});

/*
const maFunction = async () => {
    try {
        let url = "http://localhost:5678/api/users/login";
        let options = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: chargeUtile,
        };
        let response = await fetch(url, options);
        let data = await response.json();


    } catch (error) {
        console.log(error);
    }
};
*/
