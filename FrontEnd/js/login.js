// Gestion du login

function logOut() { 
    loggedUser = localStorage.removeItem("user");
}
// Gestion de la déconnexion

const form = document.querySelector(".login-form");
const inputs = document.querySelectorAll("input");
const submit = document.querySelector("#submit");
// Récupération des balises liées au formulaire de login

// Gestion du submit
form.addEventListener("submit", event => {
    event.preventDefault();

    const email = inputs[0].value;
    const password = inputs[1].value;
    // Récupération des champs du formulaire

    const user = {
        email: email,
        password: password,
    }
    // Gestion du corps de la réponse

    fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify(user),
    })
        .then (response => {
            if (response.ok) {
            // Si identifiants ok
                location.replace("index.html");
                // Redirection vers la page d'accueil
                return response.json();
            } else {
                const error = document.createElement("p");
                // Création d'une balise pour afficher le message d'erreur
                error.setAttribute("id","error");
                // Ajout d'une classe pour l'apparence du message
                error.innerHTML = "Erreur dans l'identifiant ou le mot de passe";
                // Gestion du message
                document.querySelector(".btn-submit").before(error);
                // Affichage
            }
        })
        .then (data => { 
            if (data.token) {
                const loggedUser = localStorage.setItem("user", data.token);
                // Stockage du token d'authentification
                const logIn = document.querySelector("#loginLink");
                logIn.innerText = "logout";
                // Remplacement du lien login par logout
                logIn.addEventListener("click", () => logOut());
                // Au clic, déconnexion
            }
        }) 
})