let store = [];

const fnGetID = (id) => document.getElementById(id);
const limitarCaractere = (string, qtde = 50) =>
  string.length >= qtde ? string.substring(0, qtde) + "..." : string;

const fnSetPaginacao = (pags, cards) => {
  console.log(pags, cards);

  const linkPags = fnGetID("id-paginacao");

  linkPags.innerHTML = "";
  if (pags && cards.length) {
    console.log("wwww");
    let i = 0;
    while (++i <= pags) {
      linkPags.innerHTML += `
        <li class="page-item">
            <button class="page-link" onclick="fnSetPagina(${i})">
            ${i}
            </button>
        </li>
    `;
    }
  }
};

const fnSetTags = (tags) => {
  const linkTags = fnGetID("id-tags");
  if (tags) {
    linkTags.innerHTML = "";
    tags.map((e) => {
      linkTags.innerHTML += `
            <li><a href="/categoria.html?${e}">${e}</a></li>
          `;
    });
  }
};

const fnSetCards = (noticias) => {
  const cardNoticias = fnGetID("id-cards");
  cardNoticias.innerHTML = "";

  //   noticias = fnListarItens(noticias, 1, 4);
  if (noticias.length > 0) {
    noticias.reverse().map((e) => {
      cardNoticias.innerHTML += `
          <div class="col mb-2">
            <div class="card h-100 w-100">
              <img
                src="https://mdbcdn.b-cdn.net/img/new/standard/city/${
                  e.id
                }.webp"
                class="card-img-top"
                alt=""
              />
              <div class="card-body">
                <p class="text-secondary">${e.data}</p>
                <h5 class="card-title">${limitarCaractere(e.titulo)}</h5>
                <p class="card-text">
                  ${limitarCaractere(e.descricao, 150)}.
                </p>
                <a
                  name=""
                  id=""
                  class="btn btn-primary"
                  href="/noticia.html?${e.id}"
                  role="button"
                  >Ver mais
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-arrow-right"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          `;
    });
  } else {
    cardNoticias.innerHTML += `
        <div class="col my-4 h-100 w-100">
            <p>Ops... não temos noticias</p>    
            <a href="/criar_noticia.html" class="btn btn-primary w-100">
                Cadastrar agora
            </a>
        </div>
      `;
  }
};

const fnURLAmigavel = (nova) => history.pushState({}, null, nova);
