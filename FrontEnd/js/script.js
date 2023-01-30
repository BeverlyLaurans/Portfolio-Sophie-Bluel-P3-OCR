// Ajout des travaux à la galerie
    
fetch("http://localhost:5678/api/works")
    .then (response => response.json())
    .then (data => {
    // Récupération des travaux via l'API
       for (let i = 0; i < data.length; i++) {
        // Pour chaque élément
            const work = document.createElement("figure");
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
        console.log(filteredCategoryNames);
        // Suppression des catégories en doublon 
        const portfolio = document.getElementById("portfolio");
        const allCategories = document.createElement("div");
        allCategories.classList.add("categories");
        // Création de la balise contenant les boutons catégories

        const buttonAll = document.createElement("button");
        buttonAll.classList.add("btn-category");
        buttonAll.setAttribute("id","All");
        buttonAll.innerText = "Tous";
        allCategories.appendChild(buttonAll);
        // Création du bouton Tous qui regroupe tous les travaux

        filteredCategoryNames.forEach(category => {
        // Pour chaque catégorie de travaux
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
    })