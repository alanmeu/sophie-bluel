const BASE_API = "http://localhost:5678/api/";
const galleryContainer = document.querySelector(".gallery");


class galleryController {

    works = [];

    // je recupere les works dans l'api, et remplis le tableau (l.7)
    async fetch() {
        await fetch(BASE_API + "works")
        .then(res => {
            return res.json();
        }).then(data => {
            this.works = data;
        });
    }

    // Afficher les works sur le site
    displayAllWorks() {
        if (galleryContainer) {
            galleryContainer.innerHTML = "";
            
            // pour chaque work
            this.works.forEach((work) => {
                this.addWorkToContainer(work, galleryContainer);
            });
        }
    }

    // Ajouter un élémént work à la gallery
    addWorkToContainer(work, container) {
        const projectFigure = document.createElement("figure");
        // ensuite je créé une image pour chaque work
        const image = document.createElement("img");
        //je recupere la source
        image.src = work.imageUrl;
        //je recupere le titre de l'image
        image.alt = work.title;
        // je creer un (figcaption)pour la description
        const figcaption = document.createElement("figcaption");
        figcaption.textContent = work.title;
        // j'ajoute l'image et la légende et le work a la gallery
        projectFigure.appendChild(image);
        projectFigure.appendChild(figcaption);
        if (container) {
            container.appendChild(projectFigure);
        }
    }

    // Filtre les works
    filterWorks(filterId) {
        const worksFiltered = this.works.filter(function (work) {
            return work.category.name === filterId;
        });

        // j'efface la gallery par précaution
        if (galleryContainer) {
            galleryContainer.innerHTML = "";
            
            // j'affiche les works filtré dans le html
            worksFiltered.forEach((work) => {
                this.addWorkToContainer(work, galleryContainer);
            });
        }
    }

    async deleteWork(workId) {
        // api call pour supprimer le work en utilisant son ID
        await fetch(BASE_API + "works/" + workId, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
    
        // Mettre à jour le tableau this.works en supprimant l'élément 
        this.works = this.works.filter(work => work.id !== workId);

 }
}

document.addEventListener('DOMContentLoaded', () => {
    //je recupere le form et le submit
    const form = document.getElementById('addWorkForm'); 
    const submitButton = document.getElementById('submit'); 

    form.addEventListener('submit', async (event) => {
        event.preventDefault(); 
        //je recupere la valeur de chaque input
        const title = document.getElementById('title').value; 
        const category = document.getElementById('category').value; 
        const image = document.getElementById('image').files[0]; 

        // je Crée un objet FormData pour envoyer les données du formulaire
        const formData = new FormData();
        formData.append('title', title);
        formData.append('category', category);
        formData.append('image', image);

        // j'envoie la requête POST a l'api
            const response = await fetch(BASE_API+'works', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                body: formData,
            });

          
    });
});
export default galleryController;