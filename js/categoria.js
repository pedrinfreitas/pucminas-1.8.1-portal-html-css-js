const idTag = window.location.search.substring(1);

window.onload = () => {
  const json = JSON.parse(localStorage.getItem("noticias"));
  store.push(json);

  // fnSetTags(json.tags);

  const noticias = store[0].noticias.filter((e) => e.tag.includes(idTag));
  fnSetCards(noticias);

  fnGetID("id-titulo").innerText = idTag.toLocaleUpperCase();
  fnGetID("id-titulo").classList.remove("squeleton");
};
