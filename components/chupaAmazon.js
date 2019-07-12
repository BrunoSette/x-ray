const Xray = require("x-ray");
const pages = 1; //TODO Jogar esses dados em arquivo de Config
const fileName = "./../results/eletronics-amazon.json"; //nome do arquivo para exportar 


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


  x("https://www.amazon.com/s?i=electronics-intl-ship&rh=n%3A%2116225009011&page=2", ".s-result-item", [
    {
      asin: "@data-asin",
      description: ".a-size-medium",
      link: "a@href",
      details: x('a@href', {
        categoria: '.title@h4', //not working
        modelo: '.term', //not working
        data: '.text', //not working
        opcionais: 'ul .OLXad-features-list' //not working
      }),
      image: "img@src",
      price: ".a-price-whole",
      cents: ".a-price-fraction",
      rating: ".a-icon-alt | slice:0,3",
      votes: ".a-size-base"
      }
  ])
    .paginate("li:a-last > a@href@href") //not working
    .limit(pages)
    .write(fileName);
      
