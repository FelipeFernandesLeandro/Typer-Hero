let tempoInicial = $('#tempo-digitacao').text();
const campo = $('.campo-digitacao');

function atualizaTamanhoFrase() {
  const frase = $('.frase').text();
  const numPalavras = frase.split(' ').length;
  const tamanhoFrase = $('#tamanho-frase');

  tamanhoFrase.text(numPalavras);
}

function inicializaContadores() {
  campo.on('input', () => {
    const conteudo = campo.val();

    const qtdPalavras = conteudo.split(/\S+/).length - 1;
    $('#contador-palavras').text(qtdPalavras);

    const qtdCaracteres = conteudo.length;
    $('#contador-caracteres').text(qtdCaracteres);
  });
}

function inicializaMarcadores() {
  campo.on('input', () => {
    const frase = $('.frase').text();
    const digitado = campo.val();
    const comparavel = frase.substr(0, digitado.length);

    if (digitado == comparavel) {
      campo.addClass('borda-verde');
      campo.removeClass('borda-vermelha');
    } else {
      campo.addClass('borda-vermelha');
      campo.removeClass('borda-verde');
    }
  });
}

function finalizaJogo() {
  campo.attr('disabled', true);
  campo.toggleClass('campo-desativado');
  inserePlacar();
}

function inicializaCronometro() {
  campo.one('focus', () => {
    let tempoRestante = $('#tempo-digitacao').text();
    const cronometroID = setInterval(() => {
      tempoRestante--;
      $('#tempo-digitacao').text(tempoRestante);
      if (tempoRestante < 1) {
        clearInterval(cronometroID);
        finalizaJogo();
      }
    }, 1000);
  });
}

function reiniciaJogo() {
  campo.attr('disabled', false);
  campo.val('');
  $('#contador-palavras').text(0);
  $('#contador-caracteres').text(0);
  $('#tempo-digitacao').text(tempoInicial);
  inicializaCronometro();
  campo.toggleClass('campo-desativado');
  campo.removeClass('borda-vermelha');
  campo.removeClass('borda-verde');
}

function atualizaTempoInicial(tempo) {
  tempoInicial = tempo;
  $('#tempo-digitacao').text(tempo);
}

$(() => {
  atualizaTamanhoFrase();
  inicializaContadores();
  inicializaCronometro();
  inicializaMarcadores();
  $('#botao-reiniciar').click(reiniciaJogo);
  atualizaPlacar();

  $('#usuarios').selectize({
    create: true,
    sortField: 'text',
  });

  $('.tooltip').tooltipster({
    trigger: 'custom',
  });
});
