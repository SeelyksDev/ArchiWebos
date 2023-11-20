function envoyerMailEtMdp() {
  const envoyer = document.querySelector(".form-login");
  envoyer.addEventListener("submit", (event) => {
    event.preventDefault();

    const authentification = {
      email: event.target.querySelector("[name=email]").value,
      password: event.target.querySelector("[name=mot-de-passe]").value,
    };
    const chargeUtile = JSON.stringify(authentification);

    fetch("http://localhost:5678/api/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: chargeUtile,
    });
  });
}

envoyerMailEtMdp();
