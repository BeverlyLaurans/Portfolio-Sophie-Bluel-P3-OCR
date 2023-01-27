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
    })