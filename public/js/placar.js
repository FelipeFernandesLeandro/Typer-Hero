function novaLinha(usuario, palavras) {
  const linha = $('<tr>');
  const colunaUsuario = $('<td>').text(usuario);
  const colunaPalavras = $('<td>').text(palavras);
  const colunaRemover = $('<td>');

  const link = $('<a>')
    .attr('href', '#')
    .addClass('botao-remover');
  const icone = $('<i>')
    .addClass('small')
    .addClass('material-icons')
    .text('delete');

  link.append(icone);

  colunaRemover.append(link);

  linha.append(colunaUsuario);
  linha.append(colunaPalavras);
  linha.append(colunaRemover);

  return linha;
}

function removeLinha(event) {
  event.preventDefault();
  const linha = $(this)
    .parent()
    .parent();
  linha.fadeOut(() => {
    linha.remove();
  });
}

function scrollPlacar() {
  const posicaoPlacar = $('.placar').offset().top;

  $('body, html').animate(
    {
      scrollTop: `${posicaoPlacar}px`,
    },
    1000,
  );
}

function inserePlacar() {
  const placar = $('.placar');
  const corpoTabela = placar.find('tbody');
  const usuario = $('#usuarios').val();
  const numPalavras = $('#contador-palavras').text();

  const linha = novaLinha(usuario, numPalavras);
  linha.find('.botao-remover').click(removeLinha);

  corpoTabela.prepend(linha);

  $('.placar').slideDown(500);
  scrollPlacar();
}

function mostrarPlacar() {
  $('.placar')
    .stop()
    .slideToggle(600);
}

function sincronizaPlacar() {
  const placar = [];
  const linhas = $('tbody>tr');
  linhas.each(function () {
    const usuario = $(this)
      .find('td:nth-child(1)')
      .text();
    const palavras = $(this)
      .find('td:nth-child(2)')
      .text();
    const score = {
      usuario,
      pontos: palavras,
    };
    placar.push(score);
  });
  const dados = {
    placar,
  };
  $.post('http://localhost:3000/placar', dados, () => {
    $('.tooltip').tooltipster('open');
  })
    .fail(() => {
      $('.tooltip')
        .tooltipster('open')
        .tooltipster('content', 'Falha ao sincronizar');
    })
    .always(() => {
      setTimeout(() => {
        $('.tooltip').tooltipster('close');
      }, 1200);
    });
}

function atualizaPlacar() {
  $.get('http://localhost:3000/placar', (data) => {
    $(data).each(function () {
      const linha = novaLinha(this.usuario, this.pontos);
      linha.find('.botao-remover').click(removeLinha);
      $('tbody').append(linha);
    });
  });
}

$('#botao-placar').click(mostrarPlacar);
$('#botao-sync').click(sincronizaPlacar);
