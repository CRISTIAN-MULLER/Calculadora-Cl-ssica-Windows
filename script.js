const numeros = document.querySelectorAll('.numeros');
const operadores = document.querySelectorAll(['button.operacoes']);

const btnResultado = document.getElementById('resultado');
const btnLimpaTudo = document.getElementById('limpatudo');
const btnLimpaUltimo = document.getElementById('limpaultimo');
const btnMaisMenos = document.getElementById('botaoMaisMenos');
const btnPorcentagem = document.getElementById('porcentagem');

const voltar = document.getElementById('backspace');
const raizQuadrda = document.getElementById('raizquadrada');
const operacaoAnteriorTexto = document.getElementById('operacao-anterior');
const operacaoAtualTexto = document.getElementById('operacao-atual');
var operacaoAtual = '';
var operacaoAnterior = '';
var operacaoEscolhida = undefined;

function limparTudo() {
  operacaoAnterior = '';
  operacaoAtual = '';
  operacaoEscolhida = undefined;
}

function limparUltimo() {
  operacaoAtual = '';
}

function backspace() {
  operacaoAtual = operacaoAtual.toString().slice(0, -1);
}

function acrescentaNumero(numero) {
  operacaoAtual = operacaoAtual.toString() + numero.toString();
}

function operacoes(operacao) {
  operacaoEscolhida = operacao;
  operacaoAnterior = operacaoAtual;
  operacaoAtual = '';

  calcular();
}

function raizquadrada() {
  let sinal = Math.sign(parseInt(operacaoAtual));
  if (sinal == -1) {
    //if (operacaoAtual == '-1') {
    alert('Não é possível calcular raiz quadrada de número negativo.');
    return;
  } else {
    let numeroRaiz = parseInt(operacaoAtual);
    let raizNumero = Math.sqrt(numeroRaiz);
    operacaoAtual = raizNumero.toString();
    operacaoAnterior = '';
    operacaoEscolhida = '';
  }
}

function calculaPorcentagem() {
  let resultado;
  const primeiroValor = parseFloat(operacaoAnterior);
  const ultimoValor = parseFloat(operacaoAtual);
  // checar se tem algum valor pra computar
  if (isNaN(primeiroValor) || isNaN(ultimoValor)) return;

  switch (operacaoEscolhida) {
    case '+':
      resultado = primeiroValor + (ultimoValor * primeiroValor) / 100;
      break;
    case '/':
      resultado = (primeiroValor / (ultimoValor / 100)) * primeiroValor;
      break;
    case '-':
      resultado = primeiroValor - primeiroValor - ultimoValor;
      break;
    case '*':
      resultado = primeiroValor * (ultimoValor / 100) * primeiroValor;
      break;
    default:
      return;
  }
  operacaoAtual = resultado;
}

function pos_neg() {
  let sinal = Math.sign(operacaoAtual);

  if (sinal == '1') operacaoAtual = -Math.abs(operacaoAtual);
  if (sinal == '-1') operacaoAtual = Math.abs(operacaoAtual);
  return;
}
function calcular() {
  let resultado;
  const primeiroValor = parseFloat(operacaoAnterior);
  const ultimoValor = parseFloat(operacaoAtual);
  // checar se tem algum valor pra computar
  if (isNaN(primeiroValor) || isNaN(ultimoValor)) return;

  switch (operacaoEscolhida) {
    case '+':
      resultado = primeiroValor + ultimoValor;
      break;
    case '/':
      resultado = primeiroValor / ultimoValor;
      break;
    case '-':
      resultado = primeiroValor - ultimoValor;
      break;
    case '*':
      resultado = primeiroValor * ultimoValor;
      break;
    default:
      return;
  }
  operacaoAtual = resultado;
  operacaoAnterior = '';
  operacaoEscolhida = '';
}

const mostraCalculo = () => {
  operacaoAtualTexto.innerText = numeroTratado(operacaoAtual);
  if (operacaoEscolhida != null) {
    operacaoAnteriorTexto.innerText =
      numeroTratado(operacaoAnterior) + ' ' + operacaoEscolhida;
  } else {
    operacaoAnteriorTexto.innerText = numeroTratado(operacaoAnterior);
  }
};

let numeroTratado = (num) => {
  const numeroFloat = parseFloat(num);
  if (isNaN(numeroFloat)) return '';
  return numeroFloat.toLocaleString('pt-BR');
};

//const arrayNumeros = Array.from(numeros);

// console.log(arrayNumeros);
// arrayNumeros.map(
//   addEventListener('click', () => {
//     acrescentaNumero(numero.innerText);
//     console.log('number');
//   })
// );

numeros.forEach((button) => {
  button.addEventListener('click', () => {
    acrescentaNumero(button.innerText);
    mostraCalculo();
  });
});

operadores.forEach((button) => {
  button.addEventListener('click', () => {
    operacoes(button.innerText);
    mostraCalculo();
  });
});

raizQuadrda.addEventListener('click', () => {
  raizquadrada();
  mostraCalculo();
});

btnMaisMenos.addEventListener('click', () => {
  pos_neg();
  mostraCalculo();
});

btnPorcentagem.addEventListener('click', () => {
  calculaPorcentagem();
  mostraCalculo();
});

btnResultado.addEventListener('click', () => {
  calcular();
  mostraCalculo();
});

btnLimpaTudo.addEventListener('click', () => {
  limparTudo();
  mostraCalculo();
});

btnLimpaUltimo.addEventListener('click', () => {
  limparUltimo();
  mostraCalculo();
});

voltar.addEventListener('click', () => {
  backspace();
  mostraCalculo();
});
