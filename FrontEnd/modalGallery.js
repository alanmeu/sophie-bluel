import Modal from "./modal.js";

class ModalGallery extends Modal {

    galleryController = null;
    galleryContainer = null;
    workForm = null;
    imageInput = false;
    selectedImage = false;
    step = 0;
    isPopulated = false;

    constructor(galleryController, modalId, triggerId) {

        // Appel le constructeur du Modal
        super(modalId, triggerId);

        this.galleryController = galleryController;

        this.galleryContainer = this.modal.querySelector('#gallery');

        this.selectedImage = document.querySelector('#selectedImage');

        this.workForm = this.modal.querySelector('#addWorkForm');
        this.workForm.addEventListener('submit', async (event) => {

            event.preventDefault();

            this.galleryController.postWork();
            await this.galleryController.fetch()
            await this.galleryController.displayAllWorks()
            await this.displayAllWorks();

            this.step = 0;
            this.closeModal();
        });

        this.imageInput = this.modal.querySelector('#image');
        this.imageInput.addEventListener('change', (event) => {
            const selectedFile = event.target.files[0];
            if (selectedFile) {
                // je créé un objet url pour l'image sélectionnée
                const imageUrl = URL.createObjectURL(selectedFile);
        
                //j'integre l'element avec son url
                this.selectedImage.src = imageUrl;
                this.selectedImage.style.display = 'block';
        
            }
        });


    }

    onClose(){
        this.imageInput.value = '';
        this.selectedImage.src = null;
        this.selectedImage.style.display = 'none';
        


    }


    onOpen() {
        //premiere page de modal
        this.step = 0;
        //si pas de photo ajouter les works
        if (!this.isPopulated) {
            this.displayAllWorks();
        }
    }



    async displayAllWorks() {
        if (!this.isPopulated) {
            this.galleryController.works.forEach((work) => {
                const projectFigure = document.createElement("figure");
                // ensuite je créé une image pour chaque work
                const image = document.createElement("img");
                //je recupere la source
                image.src = work.imageUrl;
                //je recupere le titre de l'image
                image.alt = work.title;
                //je créé ma corbeille
                const deleteIcon = document.createElement("i");
                deleteIcon.className = "fas fa-trash-alt corbeil";

                // je supprime l'element au click
                deleteIcon.addEventListener("click", async (e) => {
                    await this.galleryController.deleteWork(work.id);
                    await this.galleryController.fetch()

                    await this.galleryController.displayAllWorks()
                    await this.displayAllWorks();
                });

                // je creer un (figcaption) pour la description
                const figcaption = document.createElement("figcaption");
                figcaption.textContent = work.title;

                // j'ajoute l'image et la légende et le work a la gallery
                projectFigure.appendChild(image);
                projectFigure.appendChild(deleteIcon);
                projectFigure.appendChild(figcaption);
                if (this.galleryContainer) {
                    this.galleryContainer.appendChild(projectFigure);
                }
            });

            this.isPopulated = true;
        } else {
            this.isPopulated = false
            this.galleryContainer.innerHTML = "";
            this.displayAllWorks()
        }
    }


}


const addPictureButton = document.getElementById('addPicture');
const step0 = document.getElementById('step0');
const step1 = document.getElementById('step1');


addPictureButton.addEventListener('click', function () {
    step0.style.display = 'none';
    step1.style.display = 'block';
})

document.addEventListener('DOMContentLoaded', function () {
    const addPictureButton = document.getElementById('addPicture');
    const step0 = document.getElementById('step0');
    const step1 = document.getElementById('step1');
    const back = document.getElementById('back');

    addPictureButton.addEventListener('click', function () {
        step0.style.display = 'none';
        step1.style.display = 'block';
    });

    back.addEventListener('click', function () {
        step0.style.display = 'block';
        step1.style.display = 'none';
    });
});

export default ModalGallery;