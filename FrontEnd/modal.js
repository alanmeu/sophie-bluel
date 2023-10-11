class Modal {

    modal = null;
    isOpen = false;

    constructor(modalId, triggerId){

        // represente le modal au complet
        this.modal = document.querySelector(modalId);

        // ajouter le background
        const background = document.createElement('div')
        background.setAttribute('id',"modalBackground");
        this.modal.appendChild(background);

        // represente le bouton pour ouvrir le modal
        this.trigger = document.querySelector(triggerId);


        // ouvrir le modal quand on click sur le trigger
        this.trigger.addEventListener('click', e => {
            this.openModal();
        })

        //ferme quand on clique sur le bouton close
        this.modal.querySelector('.closeModal').addEventListener('click', e => {
            this.closeModal();
            step0.style.display = 'block';
            step1.style.display = 'none';

        })

        //ferme quand on clique sur le background noir
        this.modal.querySelector('#modalBackground').addEventListener('click', e => {
            this.closeModal();
            step0.style.display = 'block';
            step1.style.display = 'none';
        })
    }
        
    openModal(){
        this.isOpen = true;
        this.modal.style.display = "flex"
        this.onOpen();
    }

    closeModal(){
        this.isOpen = false;
        step0.style.display = 'block';
        step1.style.display = 'none';
        this.modal.style.display = "none"
        this.onClose();
    }
    
}


  


export default Modal;