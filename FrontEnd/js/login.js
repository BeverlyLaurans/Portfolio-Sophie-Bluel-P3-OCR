// Gestion du login

function logOut() {
  const unlogged = sessionStorage.removeItem("user");
} // Gestion de la déconnexion

const form = document.querySelector(".login-form");
const inputs = document.querySelectorAll("input");

// Gestion du formulaire
form.addEventListener("submit", (event) => {
  event.preventDefault();

  const email = inputs[0].value;
  const password = inputs[1].value;

  const user = {
    email: email,
    password: password,
  };

  fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      if (response.ok) {
        location.replace("index.html");
        return response.json();
      } else {
        const error = document.querySelector("#error");
        if (error) {
          error.innerHTML = "Erreur dans l'identifiant ou le mot de passe";
        } else {
          const error = document.createElement("p");
          error.setAttribute("id", "error");
          error.innerHTML = "Erreur dans l'identifiant ou le mot de passe";
          document.querySelector(".btn-submit").before(error);
        } // Si saisie incorrecte, affichage d'un message d'erreur si il n'existe pas déjà
      }
    })
    .then((data) => {
      if (data.token) {
        const loggedUser = sessionStorage.setItem("user", data.token);
        // Stockage du token d'authentification
        const logIn = document.querySelector("#loginLink");
        logIn.innerText = "logout";
        logIn.addEventListener("click", () => logOut());
      } // Passage en mode connecté -> déconnexion possible
    });
});
