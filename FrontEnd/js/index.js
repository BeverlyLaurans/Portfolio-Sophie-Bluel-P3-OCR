let works = [];
let categories = [];

// Affichage de la galerie
function displayWorks() {

  const gallery = document.querySelector(".gallery");
  gallery.innerHTML = "";
  // Vidage de la galerie avant chaque nouvel affichage de projets

  for (let i = 0; i < works.length; i++) {
    if (
      activeButton.innerText === "Tous" ||
      activeButton.dataset.id === works[i].categoryId.toString()
    ) { 
      // Si l'id de la catégorie du projet correspond à l'id du bouton ou au bouton Tous
      const work = document.createElement("figure");
      work.classList.add("work");
      const workImage = document.createElement("img");
      const workTitle = document.createElement("figcaption");

      workImage.src = works[i].imageUrl;
      workImage.crossOrigin = "anonymous";
      workImage.alt = works[i].title;
      workTitle.innerText = works[i].title;

      const gallery = document.querySelector(".gallery");
      gallery.appendChild(work);
      work.appendChild(workImage);
      work.appendChild(workTitle);
      // Pour chaque projet, création et affichage des balises
    }
  }
}

function displayCategories() {

    for (let i = 0; i < categories.length; i++) {
      const categoryButton = document.createElement("button");
      categoryButton.classList.add("btn-category");
      categoryButton.innerText = categories[i].name;
      categoryButtonsWrapper.appendChild(categoryButton);
      // Création et affichage des boutons catégories pour chaque catégorie

      for (let i = 0; i < works.length; i++) {
        if (categoryButton.innerText === works[i].category.name) {
        categoryButton.dataset.id = works[i].categoryId;
        }
      } // Attribution de l'id de la catégorie à chaque bouton catégorie
    }
}

function switchToEditMode() {
  // Bandeau d'édition //
  const editBanner = document.createElement("div");
  editBanner.classList.add("edit-banner");
  const editMode = document.createElement("div");
  const editModeIcon = document.createElement("img");
  editModeIcon.src = "assets/icons/white-edit-icon.png";
  const editModeText = document.createElement("p");
  editModeText.innerText = "Mode édition";
  const saveChanges = document.createElement("button");
  saveChanges.innerHTML = "publier les changements";

  const body = document.querySelector("body");
  body.before(editBanner);
  const header = document.querySelector("header");
  header.style.margin = "0";
  header.style.marginTop = "100px";

  editBanner.appendChild(editMode);
  editBanner.appendChild(saveChanges);
  editMode.appendChild(editModeIcon);
  editMode.appendChild(editModeText);

  // Boutons d'édition //

  // Bouton modifier pour la photo de présentation //
  const pictureEditButton = document.createElement("div");
  pictureEditButton.classList.add("btn-edit", "btn-edit-picture");
  const pictureEditIcon = document.createElement("img");
  pictureEditIcon.src = "assets/icons/black-edit-icon.png";
  const pictureEditText = document.createElement("p");
  pictureEditText.innerText = "modifier";

  const introduction = document.querySelector("#introduction > figure");
  introduction.appendChild(pictureEditButton);
  pictureEditButton.appendChild(pictureEditIcon);
  pictureEditButton.appendChild(pictureEditText);

  // Bouton modifier pour le titre //
  const titleEditButton = document.createElement("div");
  titleEditButton.classList.add("btn-edit", "btn-edit-title");
  const titleEditIcon = document.createElement("img");
  titleEditIcon.src = "assets/icons/black-edit-icon.png";
  const titleEditText = document.createElement("p");
  titleEditText.innerText = "modifier";

  const article = document.querySelector("article");
  article.prepend(titleEditButton);
  titleEditButton.appendChild(titleEditIcon);
  titleEditButton.appendChild(titleEditText);

  // Bouton modifier pour les projets //
  const worksEditButton = document.createElement("div");
  worksEditButton.classList.add("btn-edit", "btn-edit-works");
  const worksEditIcon = document.createElement("img");
  worksEditIcon.src = "assets/icons/black-edit-icon.png";
  const worksEditText = document.createElement("p");
  worksEditText.innerText = "modifier";

  const galleryTitle = document.querySelector(".galleryTitle");
  galleryTitle.appendChild(worksEditButton);
  worksEditButton.appendChild(worksEditIcon);
  worksEditButton.appendChild(worksEditText);
} // Affichage du mode édition

const modalOverlay = document.querySelector(".modal-overlay");
const modal = document.querySelector(".modal");

function openModal() {
  modalOverlay.style.display = "block";
  modalOverlay.style.display = "flex";
  modal.style.display = "block";
  modal.style.display = "flex";
} // Affichage / Ouverture de la modale

let addPhoto = document.querySelector(".addphoto");
let formTitle = document.querySelector("#title");
let formCategory = document.querySelector("#category");

function closeModal() {
  modal.style.display = "none";
  modalOverlay.style.display = "none";
  addWorkModal.style.display = "none";
  galleryPhotoModal.style.display = "block";
  galleryPhotoModal.style.display = "flex";
  formTitle.value = "";
  formCategory.value = "";
  const fileUploadInput = document.querySelector("#file");
  fileUploadInput.value = "";
  const selectedPicture = document.querySelector(".selected-picture");
  if (selectedPicture) {
    document.querySelector(".selected-picture").remove();
  }
  const error = document.querySelector("#error");
  if (error) {
    error.remove();
  }
} // Fermeture de la modale

const addPhotoButton = document.querySelector(".modal-gallery-wrapper > button");
const galleryPhotoModal = document.querySelector(".modal-gallery-wrapper");
const addWorkModal = document.querySelector(".modal-addwork-wrapper");
const goBackArrow = document.querySelector(".back-icon");

const addPhotoPicture = document.querySelector(".addphoto > img");
const addPhotoLabel = document.querySelector(".addphoto > label");
const addPhotoParagraph = document.querySelector(".addphoto > p");

function displayAddWorkModal() {
  galleryPhotoModal.style.display = "none";
  addWorkModal.style.display = "block";
  addWorkModal.style.display = "flex";
  goBackArrow.style.display = "block";
  document.querySelector(".modal-navigation").style.justifyContent = "space-between";
  addPhotoPicture.style.display = "block";
  addPhotoLabel.style.display = "block";
  addPhotoParagraph.style.display = "block";
} // Affichage de la suite de la modale pour ajouter un projet

function goBackModal() {
  addWorkModal.style.display = "none";
  goBackArrow.style.display = "none";
  galleryPhotoModal.style.display = "block";
  galleryPhotoModal.style.display = "flex";
  document.querySelector(".modal-navigation").style.justifyContent = "end";
  const fileUploadInput = document.querySelector("#file");
  fileUploadInput.value = "";
  const selectedPicture = document.querySelector(".selected-picture");
  if (selectedPicture) {
    document.querySelector(".selected-picture").remove();
  }
  closeModal();
  openModal();
} // Retour au début de la modale

// Affichage des projets dans la galerie photo de la modale
function displayModalGallery() {
  const modalGallery = document.querySelector(".modal-gallery");
  modalGallery.innerHTML = "";
  // Vidage de la galerie avant chaque nouvel affichage de projets

  for (let i = 0; i < works.length; i++) {
    const modalWork = document.createElement("div");
    const modalWorkWithIcons = document.createElement("div");
    const modalWorkImage = document.createElement("img");
    const modalWorkDelete = document.createElement("img");
    const modalWorkEdit = document.createElement("p");

    modalWork.classList.add("modal-work");
    modalWorkWithIcons.classList.add("modal-figure-elements");
    modalWorkImage.classList.add("modal-figure");
    modalWorkDelete.classList.add("modal-delete");

    modalWorkImage.src = works[i].imageUrl;
    modalWorkImage.crossOrigin = "anonymous";
    modalWorkImage.alt = works[i].title;
    modalWorkEdit.innerText = "éditer";
    modalWorkDelete.src = "assets/icons/delete-icon.png";

    modalWorkDelete.dataset.id = works[i].id;
    // Association de l'id du projet à son bouton delete

    const modalGallery = document.querySelector(".modal-gallery");
    modalGallery.appendChild(modalWork);
    modalWork.appendChild(modalWorkWithIcons);
    modalWork.appendChild(modalWorkEdit);
    modalWorkWithIcons.appendChild(modalWorkImage);
    modalWorkWithIcons.appendChild(modalWorkDelete);
    // Pour chaque projet, création, configuration et affichage de la galerie photo dans la modale

    // Affichage de l'icone drag //

    modalWorkWithIcons.addEventListener("mouseenter", () => {
      const modalWorkDrag = document.createElement("img");
      modalWorkDrag.classList.add("modal-drag");
      modalWorkDrag.src = "assets/icons/drag-icon.png";
      modalWorkWithIcons.appendChild(modalWorkDrag);
    }); // Affichage de l'icone au hover

    modalWorkWithIcons.addEventListener("mouseleave", () => {
      const modalWorkDrag = document.querySelector(".modal-drag");
      modalWorkDrag.remove();
    });
  }
  deleteWork();
  deleteAllWorks();
  // Gestion de la suppression de projet à l'affichage de la galerie modale
}

function deleteWork() {
  const trashIcons = document.querySelectorAll(".modal-delete");

  trashIcons.forEach((trashIcon) => {
    trashIcon.addEventListener("click", () => {
      let id = trashIcon.dataset.id;

      fetch(`http://localhost:5678/api/works/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("user")}`,
        },
      }).then((response) => {
        if (response.ok) {
          trashIcon.closest(".modal-work").remove();

          for (let i = 0; i < works.length; i++) {
            if (works[i].id == id) {
              works.splice(i, 1);

              if (works.length < 1) {
                closeModal();
              }
            }
            displayWorks();
          }
        }
      });
    });
  });
} // Suppression de projet

function deleteAllWorks() {
  const deleteAllWorks = document.querySelector(".delete-gallery");

  works.forEach((work) => {
    const id = work.id;

    deleteAllWorks.addEventListener("click", () => {
      fetch(`http://localhost:5678/api/works/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("user")}`,
        },
      }).then((response) => {
        if (response.ok) {
          works = [];
          displayWorks();
          displayModalGallery();
          closeModal();
        }
      }).then((data) => {
        const categories = document.querySelector(".categories");
      });
    });
  });
} // Suppression de tous les projets

function previewFile(e) {
  const fileExtension = /\.(jpe?g|png)$/i;

  if (
    e.target.files.length === 0 ||
    !fileExtension.test(e.target.files[0].name)
  ) {
    return;
  } // Vérifie le format du fichier

  const file = e.target.files[0];
  fileReader = new FileReader();
  fileReader.readAsDataURL(file);
  fileReader.addEventListener("load", (e) => displayPicture(e, file));
} // Conserve et lit le fichier

function displayPicture(e, file) {
  const addPhoto = document.querySelector(".addphoto");

  const picture = document.createElement("img");
  picture.classList.add("selected-picture");
  picture.src = e.target.result;
  picture.style.objectFit = "contain";
  picture.style.margin = "0";
  picture.style.width = "100%";
  picture.style.height = "100%";

  const addPhotoPicture = document.querySelector(".addphoto > img");
  const addPhotoLabel = document.querySelector(".addphoto > label");
  const addPhotoInput = document.querySelector(".addphoto > input");
  const addPhotoParagraph = document.querySelector(".addphoto > p");

  addPhotoPicture.style.display = "none";
  addPhotoLabel.style.display = "none";
  addPhotoInput.style.display = "none";
  addPhotoParagraph.style.display = "none";

  addPhoto.appendChild(picture);
} // Affiche la photo

function logOut() {
  const unlogged = sessionStorage.removeItem("user");
  location.replace("index.html");
} // Gestion de la déconnexion

const logged = sessionStorage.getItem("user");
// Récupération du token d'authentification

async function main() {
  
  works = await fetch("http://localhost:5678/api/works");
  works = await works.json(); // Récupération des projets

  categories = await fetch("http://localhost:5678/api/categories");
  categories = await categories.json(); // Récupération des catégories

  const portfolio = document.getElementById("portfolio");
  const gallery = document.querySelector(".gallery");

  categoryButtonsWrapper = document.createElement("div");
  categoryButtonsWrapper.classList.add("categories");

  portfolio.appendChild(categoryButtonsWrapper);
  portfolio.insertBefore(categoryButtonsWrapper, gallery);
  // Création et affichage de la balise contenant les boutons catégories

  const buttonAll = document.createElement("button");
  buttonAll.classList.add("btn-category");
  buttonAll.setAttribute("id", "all");
  buttonAll.innerText = "Tous";
  categoryButtonsWrapper.appendChild(buttonAll);
  // Création et affichage du bouton Tous qui contient tous les projets

  buttonAll.classList.add("active");
  activeButton = buttonAll;
  // Par défaut, ajout de la classe active sur le bouton Tous

  displayCategories();

  const categoryButtons = document.querySelectorAll(".btn-category");

    categoryButtons.forEach((categoryButton) => {
      categoryButton.addEventListener("click", function () {
        activeButton.classList.remove("active");
        categoryButton.classList.add("active");
        activeButton = categoryButton;
        // Au clic sur un bouton, retire la classe active et l'applique sur le bouton cliqué
        displayWorks();
      });
    });

  displayWorks();

  // Gestion du login //

  if (logged) {
    const logIn = document.querySelector("#loginLink");
    logIn.innerText = "logout";
    logIn.addEventListener("click", () => logOut());
    // Si l'utilisateur est logué, affichage de logout et au clic, déconnexion

    switchToEditMode(); // Passage en mode édition

    const worksEditButton = document.querySelector(".btn-edit-works");
    worksEditButton.addEventListener("click", openModal);
    // Ouverture de la modale au clic sur le bouton modifier des projets

    displayModalGallery(); // Affichage des projets dans la galerie photo de la modale

    const closeButtonModal = document.querySelector(".close-icon");
    closeButtonModal.addEventListener("click", closeModal);
    // Fermeture de la modale au clic sur la croix

    modalOverlay.addEventListener("click", closeModal);
    // Fermeture de la modale au clic en dehors

    addPhotoButton.addEventListener("click", displayAddWorkModal);
    // Affichage du gestionnaire d'ajout de projet via le bouton Ajouter une photo

    const goBackArrow = document.querySelector(".back-icon");
    goBackArrow.addEventListener("click", goBackModal);
    // Afficher la galerie photo au clic sur la flèche retour
  }

  // Gestion de l'ajout d'un nouveau projet //

  // Gestion du file upload //
  const fileUploadInput = document.querySelector("#file");
  fileUploadInput.addEventListener("change", previewFile);
  // Affiche la photo si le format du fichier est bon

  // Intégration des catégories en tant qu'option dans le champ select
  const formWorkCategory = document.querySelector("#category");
  const defaultOption = document.createElement("option");
  defaultOption.value = "";
  defaultOption.textContent = "";
  defaultOption.disabled = true;
  formWorkCategory.appendChild(defaultOption);

  categories.forEach((category) => {
    const option = document.createElement("option");
    option.value = category.name;
    option.textContent = category.name;
    formWorkCategory.appendChild(option);

    for (let i = 0; i < categories.length; i++) {
      if (option.textContent === categories[i].name) {
        option.dataset.id = categories[i].id;
      }
    } // Ajoute un champ option par catégorie existante
  }); // Par défaut, sélection de l'option vide
  formWorkCategory.options[0].selected = true;

  // Gestion du formulaire //

  const formAddWork = document.querySelector("#modal-addwork");
  const formWorkPicture = document.querySelector("#file");
  const formWorkTitle = document.querySelector("#title");

  const inputs = [formWorkPicture, formWorkTitle, formWorkCategory];

  inputs.forEach((input) => {
    input.addEventListener("input", () => {
      const allInputsFilled = inputs.every((input) => input.value !== "");
      if (allInputsFilled) {
        document.querySelector("#work-submit").style.backgroundColor = "#1D6154";
      } else {
        document.querySelector("#work-submit").style.backgroundColor = "#BFBFBF";
      }
    });
  }); // Vérifie si tous les champs inputs sont remplis pour colorer le bouton submit

  formAddWork.addEventListener("submit", (e) => {
    e.preventDefault();

    let errorHappened = false;

    const selectedOption =
      formWorkCategory.options[formWorkCategory.selectedIndex];
    // Sélection de l'option
    const categoryId = selectedOption.getAttribute("data-id");
    // Récupération de l'id de la catégorie sélectionnée

    const workFormData = new FormData();
    workFormData.append("image", formWorkPicture.files[0]);
    workFormData.append("title", formWorkTitle.value);
    workFormData.append("category", categoryId);

    fetch("http://localhost:5678/api/works", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("user")}`,
      },
      body: workFormData,
    })
      .then((response) => {
        if (response.ok) {
          closeModal();
          return response.json();
        } else {
          errorHappened = true;
          const error = document.querySelector("#error");
          if (error) {
            error.innerHTML = "Veuillez renseigner tous les champs";
          } else {
            const errorMessage = document.createElement("p");
            errorMessage.setAttribute("id", "error");
            errorMessage.innerHTML = "Veuillez renseigner tous les champs";
            formWorkCategory.after(errorMessage);
          } // Si champs incomplets, affichage d'un message d'erreur si il n'existe pas déjà
        }
      })
      .then((data) => {
        if (!errorHappened) {
        works.push(data);

        for (let i = 0; i < categories.length; i++) {
          const categoryButton = document.querySelectorAll(".btn-category");
          if (categoryButton.innerText === categories[i].name) {
          categoryButton.dataset.id = categories[i].id;
          }
        } // Attribution de l'id de la catégorie à chaque bouton catégorie

        displayWorks();
        displayModalGallery();
        console.log(data);
        console.log(works);
      }
      });
  });
}
main();