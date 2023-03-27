const selectProduct = document.querySelector('#select-product');
const quantMaquinas = document.querySelector('#quant-maquinas');
const kitInstalacao = document.querySelector('#kit-instalacao');
const maoDeObra = document.querySelector('#mao-de-obra');
const aguaLuz = document.querySelector('#agua-luz');
const notaFiscal = document.querySelector('#nota-fiscal');
const valorNegociacao = document.querySelector('#valor-negociacao');
const formaDePagamento = document.querySelector('#forma-pagamento');
const btnForm = document.querySelector('.form button');
const form = document.querySelector('form');

/* Modal */
const Modal = {
    wrapper: document.querySelector('.modal-wrapper'),
    screen1: document.querySelector('.screen1'),
    message: document.querySelector('.box-wrapper span'),
    btnClose: document.querySelector('.modal button'),

    openModal() {
        Modal.wrapper.classList.remove('hide');
    },
    closeModal() {
        Modal.wrapper.classList.add('hide');
    },
    openScreen() {
        Modal.screen1.classList.remove('hide');
    },
    closeScreen() {
        Modal.screen1.classList.add('hide');
    },
};

Modal.btnClose.onclick = () => {
    Modal.closeModal();
    Modal.openScreen();
};

window.addEventListener('keydown', handleKeyDown);
function handleKeyDown(event) {
    if (event.key === 'Escape') {
        Modal.closeModal();
        Modal.openScreen();
    }
}

/* Eventos */
form.onsubmit = (event) => {
    event.preventDefault();

    Modal.openModal();
    Modal.closeScreen();
    /* displayProfitabilityResult(result); */
};

/* Funções */

function displayProfitabilityResult(result) {
    const message = `A lucratividade total é ${result}`;

    Modal.message.innerText = message;
    Modal.open();
}
