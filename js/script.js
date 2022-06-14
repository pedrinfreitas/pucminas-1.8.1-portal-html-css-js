let updateNoticias = [];
const urlPesquisa = decodeURI(window.location.search.substring(1));

const fnFiltro = (arr, txt) => arr.filter((e) => e.titulo.includes(txt));

const fnDebounce = (func, timeout = 300) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
};

const fnListarItens = (itens, paginaAtual = 1, limiteItens = 4) => {
  let result = [];

  let totalPage = Math.ceil(itens.length / limiteItens);
  let count = paginaAtual * limiteItens - limiteItens;
  let delimiter = count + limiteItens;

  if (paginaAtual <= totalPage) {
    for (let i = count; i < delimiter; i++) {
      if (itens[i] != null) {
        result.push(itens[i]);
      }
      count++;
    }
  }

  return result;
};

// ao carregar a pagina
window.onload = () => {
  const json = JSON.parse(localStorage.getItem("noticias"));
  store.push(
    json ?? {
      noticias: [],
      tags: [],
      paginas: [],
    }
  );

  if (urlPesquisa) {
    updateNoticias = fnFiltro(store[0].noticias, urlPesquisa);
    fnSetPaginacao(Math.ceil((updateNoticias.length + 1) / 4), updateNoticias);
  } else {
    updateNoticias = store[0].noticias;
    fnSetPaginacao(store[0].paginas, store[0].noticias);
  }

  fnSetTags(store[0].tags);
  fnSetPagina();
};

const fnPesquisaNoticia = fnDebounce(() => {
  const txtPesquisa = fnGetID("id-pesquisa").value;

  const pesquisado = fnFiltro(store[0].noticias, txtPesquisa);

  updateNoticias = pesquisado;
  //   Math.ceil((getBrowser.noticias.length + 1) / limite)
  fnSetPaginacao(Math.ceil((pesquisado.length + 1) / 4), pesquisado);
  fnSetPagina(1, pesquisado);
});

const fnSetPagina = (pagAtual = 1, noticias = updateNoticias) => {
  fnSetCards(fnListarItens(noticias, pagAtual));
  const pagTotal = store[0].paginas;

  if (noticias.length != 0) {
    pagTotal > 1
      ? (fnGetID("id-pag-titulo").innerText = "paginas:")
      : (fnGetID("id-pag-titulo").innerText = "pagina:");
  } else {
    fnGetID("id-pag-titulo").innerText = "";
  }
};
