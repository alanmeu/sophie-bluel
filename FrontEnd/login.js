import authControllerClass from "./Controllers/authController.js";
const authController = new authControllerClass();
const loginForm = document.getElementById("loginForm");

//j'ecoute l'evenement au click du boutton submit
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    authController.login()
});
