const idNoticia = window.location.search.substring(1);

if (!idNoticia) {
  window.location.href = "/";
}

const fnPesquisaHome = () => {
  const pesquisa = fnGetID("id-pesquisa").value;
  window.location.href = `/?${pesquisa}`;
};

window.onload = () => {
  const json = JSON.parse(localStorage.getItem("noticias"));
  store.push(json);

  fnSetTags(json.tags);

  const noticia = store[0].noticias.find((e) => e.id == idNoticia);

  if (!noticia) {
    window.location.href = "/";
  }
  //TODO: trocar id per um slug amigavel
  //   fnURLAmigavel("noticia/" + noticia.titulo.replaceAll(" ", "-"));

  fnGetID(
    "id-img"
  ).src = `https://mdbcdn.b-cdn.net/img/new/standard/city/${noticia.id}.webp`;

  fnGetID("id-titulo").innerText = noticia.titulo;
  fnGetID("id-titulo").classList.remove("squeleton");

  fnGetID("id-data").innerText = noticia.data;
  fnGetID("id-data").classList.remove("squeleton");

  fnGetID("id-titulo-card").innerText = noticia.titulo;
  fnGetID("id-titulo-card").classList.remove("squeleton");

  fnGetID("id-descricao").innerText = noticia.descricao;
  fnGetID("id-descricao").classList.remove("squeleton");
};
