const Xray = require("x-ray");
const pages = 10; // TODO Jogar esses dados em arquivo de Config
const fileName = "./../results/iphone.json"; // nome do arquivo para exportar
const brand = "Iphone";
const model = "";
const year = "";

const x = Xray({
  filters: {
    trim: function (value) {
      return typeof value === "string" ? value.trim() : value;
    },
    reverse: function (value) {
      return typeof value === "string"
        ? value.split("").reverse().join("")
        : value;
    },
    slice: function (value, start, end) {
      return typeof value === "string" ? value.slice(start, end) : value;
    },
  },
});

const mountUrl = (brand = "", model = "", year = "") => {
  let baseUrl =
    "https://pe.olx.com.br/grande-recife/recife/celulares/iphone/usado/";
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

x(mountUrl(brand, model, year), ".ggOGTJ", [
  {
    id: "a@data-lurker_list_id",
    description: ".deEIZJ",
    link: ".iZLVht@href",
    next_page: x("a[lurker=list_id]@href", {
      categoria: ".title@h4", // no
      modelo: "a[class=link]@title", // no
      data: "tbody > tr > tr > td.a-size-base",
      opcionais: "ul .OLXad-features-list",
    }),
    image: "img@src",
    price: ".jqSHIm ", // | slice:4
    details: ".detail-specific",
    city: ".hdwqVC",
  },
])
  .paginate(".iDkXSM@href")
  .limit(pages)
  .write(fileName);
