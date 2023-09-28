//je declare mes constante
const apiUrl = 'http://localhost:5678/api';
const loginMdpError = document.getElementById("loginError");

// Contient toutes les fonctions pour l'authentification
class authController {

    // return true/false en checkant si le token existe
    isLoggedIn() {
        return !!localStorage.getItem('token');
    }

    // ajoute le token dans loclStorage, sinon le retire
    setToken(token) {
        if (token) {
            localStorage.setItem('token', token);
        } else {
            localStorage.removeItem('token');
        }
    }


    logout() {   
        this.setToken();
        window.location.href = 'index.html';
     };


    login() {
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        // je créé un objet avec les données du formulaire
        const loginData = {
            email,
            password,
        };
    

        // j'effectue ma requête POST vers l'API
        fetch(apiUrl + '/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(loginData)
        })
            .then(response => response.json())
            .then(result => {

                // Si email/mdp est incorrect
                if (result.error || result.message) {
                    //j'ajoute un paragraphe pour afficher le message d'erreur
                    const p = document.createElement("p");
                    p.innerHTML = "La combinaison e-mail/mot de passe est incorrecte";
                    // j'ajoute le paragraphe au conteneur d'erreur
                    loginMdpError.appendChild(p);

                } else if (result.token) { // Si email/mdp est correct

                    this.setToken(result.token)

                    window.location.href = "index.html"; // je redirige vers la page d'accueil
                }
            })
    }

}


export default authController;