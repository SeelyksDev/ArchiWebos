const envoyer = document.querySelector(".form-login");
const wrongInfo = document.querySelector(".wrong-info");

envoyer.addEventListener("submit", (event) => {
    event.preventDefault();
    const infoUser = dataUser(event);
    if (verifRegExp(infoUser)) {
        recupToken(infoUser);
    } else {
        DisplayWrongInfo("E-mail ou Mot de passe incorrect");
    }
});

const dataUser = (event) => {
    const email = event.target.querySelector("[name=email]").value;
    const password = event.target.querySelector("[name=mot-de-passe]").value;
    return { email, password };
};

const verifRegExp = (authValue) => {
    let emailRegExp = new RegExp("[a-z0-9._-]+@[a-z0-9._-]+.[a-z0-9._-]+");
    let passwordRegExp = new RegExp("^(?=.*[A-Z])(?=.*\\d).+$");
    return (
        emailRegExp.test(authValue.email) &&
        passwordRegExp.test(authValue.password)
    );
};

const recupToken = async (authValue) => {
    try {
        const chargeUtile = JSON.stringify(authValue);
        let url = "http://localhost:5678/api/users/login";
        let options = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: chargeUtile,
        };
        let response = await fetch(url, options);
        let data = await response.json();
        if (!response.ok) {
            throw new Error("Erreur réseau.");
        } else {
            localStorage.setItem("auth", JSON.stringify(data));
            wrongInfo.textContent = "";
            window.location.href = "index.html";
        }
    } catch (error) {
        console.log(error);
    }
};
const DisplayWrongInfo = (message) => {
    wrongInfo.textContent = message;
};
