// Ajout des projets à la galerie

fetch("http://localhost:5678/api/works")
    .then (response => response.json())
    .then (data => {
    // Récupération des travaux via l'API
       for (let i = 0; i < data.length; i++) {
        // Pour chaque élément
            const work = document.createElement("figure");
            work.classList.add("work");
            let categoryName = (data[i].category.name);
            categoryName = categoryName.replace(/\s/g, '-');
            categoryName = encodeURIComponent(categoryName).replace(/%26/g, '&');
            // Remplacement des caractères spéciaux pour la chaine de caractère (pour événements)
            work.classList.add(`${categoryName}`);
            // Récupération de la catégorie de chaque projet et ajout dans une classe (pour événements)
            const workImage = document.createElement("img");
            const workTitle = document.createElement("figcaption");
            // Création des balises dédiées aux projets
            workImage.src = data[i].imageUrl;
            workImage.crossOrigin = 'anonymous';
            workImage.alt = data[i].title;
            workTitle.innerText = data[i].title;
            // Configuration de la source de chaque image et de leur légende
            const gallery = document.querySelector(".gallery");
            gallery.appendChild(work);
            work.appendChild(workImage);
            work.appendChild(workTitle);
            // Rattachement de chacune des balises au DOM
        }

    // Ajout des catégories de travaux
    
        const categoryNames = data.map(work => work.category.name);
        // Récupération du nom des catégories
        const filteredCategoryNames = new Set(categoryNames);
        // Suppression des catégories en doublon 
        const portfolio = document.getElementById("portfolio");
        const allCategories = document.createElement("div");
        allCategories.classList.add("categories");
        // Création de la balise contenant les boutons catégories

        const buttonAll = document.createElement("button");
        buttonAll.classList.add("btn-category");
        buttonAll.setAttribute("id","all");
        buttonAll.innerText = "Tous";
        allCategories.appendChild(buttonAll);
        // Création du bouton Tous qui regroupe tous les projets

        filteredCategoryNames.forEach(category => {
        // Pour chaque catégorie de projet
            const categoryButton = document.createElement("button");
            categoryButton.classList.add("btn-category");
            // Création des balises dédiées aux filtres
            categoryButton.innerText = category;
            // Configuration du titre de chaque bouton
            portfolio.appendChild(allCategories);
            const gallery = document.querySelector(".gallery");
            portfolio.insertBefore(allCategories, gallery);
            allCategories.appendChild(categoryButton);
            // Rattachement au DOM
        })


    // Création des événements

        const buttons = document.querySelectorAll(".btn-category");
        const work = document.querySelectorAll(".work"); 
        const defaultButton = document.querySelector("#all");
        // Sélection des boutons catégories
        defaultButton.classList.add("active");
        // Par défaut, la catégorie Tous est cliquée

        for (let button of buttons) {
        // Pour chaque bouton
            button.addEventListener("click", () => {
            // Au clic
                for (let removeActive of buttons) {
                    removeActive.classList.remove("active")
                // Retire la classe active
                }
                    button.classList.add("active");
                // Ajoute la classe active au bouton

                function commonWords(string1, string2) {
                    let word = string1.replace(/\s+/g, "-").split(" ");
                    let otherWord = string2.toString().split(" ");
                    let common = [];

                    for (let i = 0; i < word.length; i++) {
                        if (otherWord.includes(word[i])) {
                            common.push(word[i]);
                        }
                    }
                    return common;
                } // Comparer chaque mot pour voir si ils ont un mot en commun

                for (let i =0; i < work.length; i++) {
                    if (commonWords(button.innerText, work[i].classList).length > 0) {
                    // Si le bouton et le projet en question ont au moins un mot commun
                        work[i].style.display = "block";
                        // Affiche moi les projets concernés
                    } else if (button.innerText == "Tous") {
                        work[i].style.display = "block";
                        // Idem si le bouton est Tous
                    } else {
                        work[i].style.display = "none";
                        // Sinon cache les autres
                    }
                }
            })
        }
    })
