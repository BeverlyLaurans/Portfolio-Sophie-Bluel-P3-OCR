// Récupération des projets et ajout dans la galerie

fetch("http://localhost:5678/api/works")
    .then (response => response.json())
    .then (data => {
    // Récupération des travaux via l'API
    
        const allWorksCategories = data.map(work => work.category.name);
        // Récupération du nom des catégories de tous les projets
        const categoryList = new Set(allWorksCategories);
        // Récupération de la liste des catégories (sans doublon)
        
        const portfolio = document.getElementById("portfolio");
        const categoryButtonsWrapper = document.createElement("div");
        categoryButtonsWrapper.classList.add("categories");
        // Création de la balise contenant les boutons catégories
        portfolio.appendChild(categoryButtonsWrapper);
        const gallery = document.querySelector(".gallery");
        portfolio.insertBefore(categoryButtonsWrapper, gallery);
        // Rattachement au DOM

        const buttonAll = document.createElement("button");
        buttonAll.classList.add("btn-category");
        buttonAll.setAttribute("id","all");
        buttonAll.innerText = "Tous";
        categoryButtonsWrapper.appendChild(buttonAll);
        // Création du bouton Tous qui contient tous les projets

        categoryList.forEach(category => {
        // Pour chaque catégorie
            const categoryButton = document.createElement("button");
            categoryButton.classList.add("btn-category");
            // Création des boutons catégorie
            categoryButton.innerText = category;
            // Configuration du titre de chaque bouton
            categoryButtonsWrapper.appendChild(categoryButton);
            // Affichage de chaque bouton          
        })

        const buttons = document.querySelectorAll(".btn-category");
        // Sélection de tous les boutons

        buttonAll.classList.add("active");
        // Par défaut, ajout de la classe active sur le bouton Tous

        buttons.forEach(button => {
        // Pour chacun des boutons
            buttonAll.click();
            // Par défaut, clic sur le bouton Tous
            button.addEventListener("click", function() {
            // Au clic sur un bouton,
                buttons.forEach(btn => btn.classList.remove("active"));
                this.classList.add("active");
                // Retire la classe active et applique la sur le bouton cliqué

                gallery.innerHTML = "";
                // Vidage de la gallerie avant chaque nouvel affichage de projets

                for (let i = 0; i < data.length; i++) {
                // Pour chaque projet
                    if (this.innerText === "Tous" || data[i].category.name === this.innerText) {
                    // Si la catégorie du projet correspond au titre du bouton ou au bouton Tous     
                        const work = document.createElement("figure");
                        work.classList.add("work");
                        const workImage = document.createElement("img");
                        const workTitle = document.createElement("figcaption");
                        // Création des balises des projets en question
                        workImage.src = data[i].imageUrl;
                        workImage.crossOrigin = 'anonymous';
                        workImage.alt = data[i].title;
                        workTitle.innerText = data[i].title;
                        // Configuration de la source de chaque image et de leur légende
                        const gallery = document.querySelector(".gallery");
                        gallery.appendChild(work);
                        work.appendChild(workImage);
                        work.appendChild(workTitle);
                        // Et affichage
                    } 
                }
            })
        })

        for (let i = 0; i < data.length; i++) {
        // Pour chaque projet
            const modalGallery = document.querySelector(".modal-gallery");
            // Sélection de la gallerie de photo
            const modalWork = document.createElement("div");
            const modalWorkImage = document.createElement("img");
            const modalWorkDelete = document.createElement("img");
            const modalWorkEdit = document.createElement("p");
            // Création d'une balise image
            modalWorkImage.classList.add("modal-figure");
            modalWorkDelete.classList.add("modal-delete");
            // Ajout d'un classe
            modalWorkImage.src = data[i].imageUrl;
            modalWorkImage.crossOrigin = 'anonymous';
            modalWorkImage.alt = data[i].title;
            modalWorkEdit.innerText = "éditer";
            modalWorkDelete.src = "assets/icons/delete-icon.png";
            // Configuration de la source de chaque image et de leur description
            modalGallery.appendChild(modalWorkImage);
            modalGallery.appendChild(modalWork);
            modalWork.appendChild(modalWorkImage);
            modalWork.appendChild(modalWorkDelete);
            modalWork.appendChild(modalWorkEdit)
            // Rattachement au DOM
        }

    }) 

// Gestion du login

const stayLogged = localStorage.getItem("user");
// Récupération du token

function logOut() { 
    loggedUser = localStorage.removeItem("user");
}
// Gestion de la déconnexion

if (stayLogged) {
// Si l'utilisateur est logué
    const logIn = document.querySelector("#loginLink");
    logIn.innerText = "logout";
    // Remplacement du lien login par logout
    logIn.addEventListener("click", () => logOut());
    // Au clic, déconnexion

    // Mode édition

    // const editBanner = ;
    // // Ajout du bandeau d'édition (prototype)

    // Ajout des boutons "modifier"

        // // Gestion de la photo de présentation (prototype)

        // // Gestion du titre (prototype)

        // Gestion des projets

        const worksEditButton = document.createElement("div");
        worksEditButton.classList.add("btn-edit");
        const worksEditIcon = document.createElement("img");
        worksEditIcon.src = "assets/icons/black-edit-icon.png" ;
        const worksEditText = document.createElement("p");
        worksEditText.innerText = "modifier";
        // Création du bouton modifier pour les projets
        const galleryTitle = document.querySelector(".galleryTitle");
        galleryTitle.appendChild(worksEditButton);
        worksEditButton.appendChild(worksEditIcon);
        worksEditButton.appendChild(worksEditText);
        // Rattachement au DOM 

        // Modale

        const modal = document.querySelector(".modal");
        // Sélection de la modale

        worksEditButton.addEventListener("click", () => {
        // Au clic sur le bouton modifier
            modal.style.display = "block";
            modal.style.display = "flex";
        }) // Ouverture de la modale

        const closeButtonModal = document.querySelector(".close-icon");
        // Sélection de la croix

        closeButtonModal.addEventListener("click", () => {
        // Au clic,    
            modal.style.display = "none";
        }) // Fermeture de la modale

        modal.addEventListener("click", () => {
        // Au clic en dehors de la modale,
            modal.style.display = "none";
        }) // Fermeture
        
        modal.children[0].addEventListener("click", function(e) {
            e.stopPropagation();
        }) // Empêche le clic en dehors de la modale de se propager à la modale 

}



                // Icone déplacer photo sur chaque figure existante (prototype)

                // Icone supprimer photo sur chaque figure existante

                // // Au clic, suppression de la photo

                // // Au clic sur Ajouter une photo

                    // // Suite de la modale


                // Gestion de la suppression d'un projet

                // Gestion de l'ajout d'un nouveau projet

                    // Ajout d'une photo

                    // Ajout d'un titre

                    // Choix de la catégorie

                    // Validation et gestion de l'affichage du nouveau projet