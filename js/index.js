import { alertError, campoVazio } from './alert-error.js';

const selectProduct = document.querySelector('#select-product');
const quantMaquinas = document.querySelector('#quant-maquinas');

const valorNegociacao = document.querySelector('#valor-negociacao');
const formaDePagamento = document.querySelector('#forma-pagamento');

const form = document.querySelector('form');

/* Modal */
const Modal = {
    wrapper: document.querySelector('.modal-wrapper'),
    screen1: document.querySelector('.screen1'),
    messagePorcentagem: document.querySelector('.porcentagem span'),
    messageLucro: document.querySelector('.lucro span '),
    messageValorTotalNegociacao: document.querySelector(
        '.valor-da-negociacao-total span'
    ),
    messageCusto: document.querySelector('.custo span'),
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

    const valorDaNegociacao = parseInt(valorNegociacao.value);
    const quantidadeDeMaquinas = parseInt(quantMaquinas.value);

    Modal.openModal();
    Modal.closeScreen();

    calculadoraDeCustos(
        product,
        quantidadeDeMaquinas,
        kitInstalacao,
        maoDeObra,
        aguaLuz,
        notaFiscal,
        valorDaNegociacao,
        formaDePagamentoSelecionada
    );
};

/* Funções */

function calculadoraDeCustos(
    product,
    quantidadeDeMaquinas,
    kitInstalacao,
    maoDeObra,
    aguaLuz,
    notaFiscal,
    valorDaNegociacao,
    formaDePagamentoSelecionada
) {
    let custo = 0;
    let taxas = 0;

    switch (product) {
        case 'teto-poloclima':
            custo = 3900;
            custo = custo * parseInt(quantidadeDeMaquinas);
            break;
        case 'teto-mwm':
            custo = 4500;
            custo = custo * quantidadeDeMaquinas;
            break;
        case 'portatil-poloclima':
            custo = 4350;
            custo = custo * quantidadeDeMaquinas;
            break;
        case false:
            console.log('deu errado');
    }

    switch (kitInstalacao) {
        case 'sim':
            custo = custo + 1400;
            break;
        case 'nao':
            break;
        case false:
            console.log('deu errado kit instalacao');
    }

    switch (maoDeObra) {
        case 'sim':
            custo = custo + 700;
            break;
        case 'nao':
            break;
        case false:
            console.log('deu errado mao de obra');
    }

    switch (aguaLuz) {
        case 'sim':
            custo = custo + 300;
            break;
        case 'nao':
            break;
        case false:
            console.log('deu errado agua e luz');
    }

    switch (formaDePagamentoSelecionada) {
        case 'parcelamento-cartao':
            taxas = taxas + custo * 0.13;
            custo = custo + taxas;
            break;
        case 'cheque':
            break;
        case 'boleto':
            break;
        case 'a-vista':
            break;
        case false:
            console.log('deu errado forma de pagamento');
            break;
    }

    switch (notaFiscal) {
        case 'sim':
            taxas = valorDaNegociacao * 0.03;
            custo = custo + taxas;
            break;
        case 'nao':
            break;
        case false:
            console.log('deu errado nota fiscal');
    }

    let lucroFinal = valorDaNegociacao - custo;
    let porcentagemDeLucro = 100 - (custo / valorDaNegociacao) * 100;

    const messageValorTotal = `R$${valorDaNegociacao.toFixed(2)}`;
    const messagePorcentagemLucro = `${porcentagemDeLucro.toFixed(0)}%`;
    const messageLucro = `R$${lucroFinal.toFixed(2)}`;
    const messageCusto = `R$${custo.toFixed(2)}`;

    Modal.messageValorTotalNegociacao.innerText = messageValorTotal;
    Modal.messagePorcentagem.innerText = messagePorcentagemLucro;
    Modal.messageLucro.innerText = messageLucro;
    Modal.messageCusto.innerText = messageCusto;
}
