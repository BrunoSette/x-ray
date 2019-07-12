const Xray = require("x-ray");
const pages = 1; //TODO Jogar esses dados em arquivo de Config
const fileName = "./../results/eletronics-amazon.json"; //nome do arquivo para exportar 
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
    "https://www.amazon.com/s?i=electronics-intl-ship&rh=n%3A%2116225009011&page=2";
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


  x(mountUrl(brand, model, year), ".s-result-item", [
    {
      // id: "a@data-lurker_list_id",
      asin: "@data-asin",
      description: ".a-size-medium",
      link: "a@href",
      details: x('a@href', {
        categoria: '.title@h4', //no
        modelo: '.term', //no
        data: '.text',
        opcionais: 'ul .OLXad-features-list'
      }),
      image: "img@src",
      price: ".a-price-whole",
      cents: ".a-price-fraction",
      rating: ".a-icon-alt | slice:0,3",
      votes: ".a-size-base"
      }
  ])
    .paginate("li:a-last > a@href@href")
    .limit(pages)
    .write(fileName);
      
