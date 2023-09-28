// j'importe mes class
import galleryControllerClass from "./Controllers/galleryController.js";
import authControllerClass from "./Controllers/authController.js";
import ModalGallery from "./modalGallery.js";

// j'instancie nos differents controllers
const galleryController = new galleryControllerClass();
const authController = new authControllerClass();
// On instancie notre modal pour gérer la gallerie
new ModalGallery(galleryController, '#modalGallery','#modalButton')


//bouttons pour trigger des fonctions javascript
const loginButton = document.querySelector("#loginButton");
const logoutButton = document.querySelector("#logoutButton");
const modalButton = document.getElementById("modalButton")
const buttonFilters = document.querySelectorAll(".buttonFilter");

// Affichage du logout/login
if(authController.isLoggedIn()){
    logoutButton.style.display = 'block';
}else{
    loginButton.style.display = 'block'; 
    modalButton.style.display = 'none'
}

// Fetch works à l'api
await galleryController.fetch();
// Affiche les works sur le site
galleryController.displayAllWorks();

// Pour chaque boutonf filtre
buttonFilters.forEach(buttonFilter => {
    // on écoute le click
    buttonFilter.addEventListener("click", function (e) {

        // on prend son id
        const buttonFilterId = e.target.id;

        // si l'id === ALL
        if (buttonFilterId === "All") {
            galleryController.displayAllWorks();
        // sinon
        } else {
            galleryController.filterWorks(buttonFilterId);
        }
    });
});

logoutButton.addEventListener('click', (e) => {
    e.preventDefault();
    authController.logout();
});

