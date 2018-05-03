function trocaFraseAleatoria(data) {
  const frase = $('.frase');
  const numeroAleatorio = Math.floor(Math.random() * data.length);

  frase.text(data[numeroAleatorio].texto);
  atualizaTamanhoFrase();
  atualizaTempoInicial(data[numeroAleatorio].tempo);
}

function trocaFrase(data) {
  const frase = $('.frase');
  frase.text(data.texto);
  atualizaTamanhoFrase();
  atualizaTempoInicial(data.tempo);
}

function buscaFrase() {
  $('#spinner').toggle();
  const fraseId = $('#frase-id').val();
  const dados = { id: fraseId };
  $.get('http://localhost:3000/frases', dados, trocaFrase)
    .fail(() => {
      $('#erro').show();
      setTimeout(() => {
        $('#erro').toggle();
      }, 3000);
    })
    .always(() => {
      $('#spinner').toggle();
    });
}

function fraseAleatoria() {
  $('#spinner').show();

  $.get('http://localhost:3000/frases', trocaFraseAleatoria)
    .fail(() => {
      $('#erro').show();
      setTimeout(() => {
        $('#erro').toggle();
      }, 3000);
    })
    .always(() => {
      $('#spinner').toggle();
    });
}

$('#botao-frase').click(fraseAleatoria);
$('#botao-frase-id').click(buscaFrase);
