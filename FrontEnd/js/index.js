// Ajout des projets à la galerie

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
    }) 