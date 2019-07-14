const Xray = require("x-ray");
const pages = 1; //TODO Jogar esses dados em arquivo de Config
const fileName = "./../results/cars-olx.json"; //nome do arquivo para exportar
const brand = "";
const model = "";
const year = "";

const x = Xray({
  filters: {
    trim: function(value) {
      return typeof value === "string" ? value.trim() : value;
    },
    reverse: function(value) {
      return typeof value === "string"
        ? value
            .split("")
            .reverse()
            .join("")
        : value;
    },
    slice: function(value, start, end) {
      return typeof value === "string" ? value.slice(start, end) : value;
    }
  }
});

const mountUrl = (brand = "", model = "", year = "") => {
  let baseUrl =
    "https://pe.olx.com.br/grande-recife/recife/autos-e-pecas/carros-vans-e-utilitarios/";
  if (brand !== "") {
    baseUrl += `${brand}/`;
    if (model !== "") {
      baseUrl += `${model}/`;
    }
  }

  if (year !== "") {
    baseUrl += `${year}`;
  }

  return baseUrl;
};


  x(mountUrl(brand, model, year), ".item", [
    {
      id: "a@data-lurker_list_id",
      description: "img@alt",
      link: "a[lurker=list_id]@href",
      next_page: x('a[lurker=list_id]@href', {
        categoria: '.title@h4', //no
        modelo: 'a[class=link]@title', //no
        data: 'tbody > tr > tr > td.a-size-base',
        opcionais: 'ul .OLXad-features-list'
      }),
      image: "img@data-original",
      price: ".OLXad-list-price | slice:4",
      details: ".detail-specific",
      city: ".detail-region | slice:10,16",
      bairro:
        ".detail-region | slice:29,60 | trim:(\n\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t)"
    }
  ])
    .paginate("a[next]@href")
    .limit(pages)
    .write(fileName);
      
