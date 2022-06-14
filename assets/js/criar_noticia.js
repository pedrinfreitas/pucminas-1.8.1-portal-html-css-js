const fnGetID = (id) => document.getElementById(id);

let getBrowser = {
  noticias: [],
  tags: [],
  paginas: [],
};

const limite = 4; // limite de card por pagina

// ao carregar a pagina
window.onload = () =>
  (getBrowser = JSON.parse(localStorage.getItem("noticias")) ?? {
    noticias: [],
    tags: [],
  });

// limpar o localstage
const fnLimparNoticia = () => {
  localStorage.clear();
  document.location.reload(true);
};

const fnCriarNoticia = () => {
  const id = (getBrowser.noticias.length ?? 0) + 1;
  const titulo = fnGetID("txt_titulo").value;
  const descricao = fnGetID("txt_descricao").value;
  const tag = fnGetID("txt_tag").value;

  const noticia = {
    img: "",
    data: new Intl.DateTimeFormat("pt-BR", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    }).format(new Date()),
    id: ("000" + id).slice(-3),
    titulo,
    descricao,
    tag,
  };

  const tituloExistente = getBrowser.noticias?.filter(
    (e) => e.titulo == noticia.titulo
  ).length;

  let tags = tag.split(",").map((e) => e.trim());

  if (tituloExistente) {
    alert("noticia ja cadastrada com esse titulo!");
  } else if (!titulo || !descricao || !tag) {
    alert("Ops!! Preencha todos os campos");
  } else {
    getBrowser.noticias.push(noticia);
    getBrowser.tags.push(tags);

    getBrowser.paginas = Math.ceil((getBrowser.noticias.length + 1) / limite);
    getBrowser.tags = [...new Set(getBrowser.tags.flat())];

    localStorage.setItem("noticias", JSON.stringify(getBrowser));

    alert("noticia cadastrada com sucesso!");

    fnGetID("txt_titulo").value = "";
    fnGetID("txt_descricao").value = "";
    fnGetID("txt_tag").value = "";
  }
};
