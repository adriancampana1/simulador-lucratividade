const selectProduct = document.querySelector('#select-product');
const quantMaquinas = document.querySelector('#quant-maquinas');

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

    const product = selectProduct.options[selectProduct.selectedIndex].value;
    const formaDePagamentoSelecionada =
        formaDePagamento.options[formaDePagamento.selectedIndex].value;

    const kitInstalacao = document.querySelector(
        'input[name="kit-instalacao"]:checked'
    ).value;
    const maoDeObra = document.querySelector(
        'input[name="mao-de-obra"]:checked'
    ).value;
    const aguaLuz = document.querySelector(
        'input[name="agua-luz"]:checked'
    ).value;
    const notaFiscal = document.querySelector(
        'input[name="nota-fiscal"]:checked'
    ).value;

    const valorDaNegociacao = valorNegociacao.value;
    const quantidadeDeMaquinas = quantMaquinas.value;

    calculadoraDeLucratividade(product, formaDePagamentoSelecionada);

    Modal.openModal();
    Modal.closeScreen();

    displayProfitabilityResult(result);
};

/* Funções */

function calculadoraDeLucratividade(
    product,
    formaDePagamentoSelecionada,
    kitInstalacao,
    maoDeObra,
    aguaLuz,
    notaFiscal,
    valorDaNegociacao,
    quantidadeDeMaquinas
) {
    let custoDoProduto = 0;
    let taxaDePagamento = 0;
    let custoKitInstalacao = 1400;
    let custoMaoDeObraInstalacao = 700;
    let custoMaoDeObraEnergiaeAgua = 300;
    let custoImposto = 0.03;

    let custoTotalPadrao =
        custoKitInstalacao +
        custoMaoDeObraInstalacao +
        custoMaoDeObraEnergiaeAgua;
    let custoTotalFinal = 0;

    switch (product) {
        case 'teto-poloclima':
            custoDoProduto = 3900;
            break;
        case 'teto-mwm':
            custoDoProduto = 4500;
            break;
        case 'portatil-poloclima':
            custoDoProduto = 4350;
            break;
        case false:
            console.log('deu errado');
    }

    switch (formaDePagamentoSelecionada) {
        case 'parcelamento-cartao':
            taxaDePagamento = 12;
            break;
        case 'cheque':
            taxaDePagamento = 2;
            break;
        case 'boleto':
            break;
        case 'a-vista':
            break;
        case false:
            break;
    }
}

function displayProfitabilityResult(result) {
    const message = `A lucratividade total é ${result}`;

    Modal.message.innerText = message;
    Modal.open();
}
