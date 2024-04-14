let listaDeNumerosSorteados = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2} );
}

function exibirMensagemInicial(){
    exibirTextoNaTela('h1', 'Jogo do Número Secreto');
exibirTextoNaTela('p', 'Escolha um número entre 1 e 10');
} 
exibirMensagemInicial();

// função chute botao 
function verificarChute() {
    let chute = document.querySelector('input').value;
    
    if (chute == numeroSecreto) {
        exibirTextoNaTela('h1', 'Acertou!');
        // se tentativas for maior que 1 teremos tentativas, senao teremos tentativa.
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = (`Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`); 
        exibirTextoNaTela('p', mensagemTentativas);
        
        // ativando botao NOVO JOGO pelo ID 
        document.getElementById('reiniciar').removeAttribute('disabled');

    } else {
        if (chute > numeroSecreto) {
            exibirTextoNaTela('p', 'O número secreto é menor.');
        } else {
            exibirTextoNaTela('p', 'O número secreto é maior.');
        }
        tentativas++;
        limparCampo();
    }
}

// função para gerar número aleatorio
function gerarNumeroAleatorio(){
   let numeroEscolhido = parseInt(Math.random() *numeroLimite + 1);
   let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

    if (quantidadeDeElementosNaLista == numeroLimite){
        listaDeNumerosSorteados = [];
    }

   if (listaDeNumerosSorteados.includes(numeroEscolhido)){ 
        return gerarNumeroAleatorio();      
   } else {
        listaDeNumerosSorteados.push(numeroEscolhido);
        return numeroEscolhido;
   }
}

// função limpar o campo 
function limparCampo() {
    chute = document.querySelector('input');
    chute.value = ''; 
}

// função reiniciar o jogo
function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1; 
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}

