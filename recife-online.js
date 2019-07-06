const Xray = require("x-ray");
const shell = require("shelljs");
const pages = 1; //TODO Jogar esses dados em arquivo de Config
const secondsForEachExport = 10;
const fileName = "recife.json"; //nome do arquivo para exportar
const brand = "hyundai";
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
    image: "img@data-original",
    price: ".OLXad-list-price | slice:4", //| trim:(R$ )
    // km: ".detail-specific | slice:40,47 | trim:( )",
    details: ".detail-specific",
    city: ".detail-region | slice:10,16",
    bairro:
      ".detail-region | slice:29,60 | trim:(\n\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t)"
  }
])
  .paginate("a[rel=next]@href")
  .limit(pages)
  .write(fileName);

console.log("It should take " + secondsForEachExport * pages + " seconds");

const ProgressBar = require("progress");
const bar = new ProgressBar("[:bar] :percent Termina em :etas seconds", {
  total: pages * secondsForEachExport,
  width: 80
});
const timer = setInterval(async function() {
  bar.tick();
  if (bar.complete) {
    clearInterval(timer);
  }
}, 1000);

setTimeout(function importDataToMongoDB() {
  shell.exec(
    "mongoimport --host mflix-shard-0/mflix-shard-00-00-p6kx5.mongodb.net:27017,mflix-shard-00-01-p6kx5.mongodb.net:27017,mflix-shard-00-02-p6kx5.mongodb.net:27017 --ssl --username m220student --password m220password --authenticationDatabase admin --db serverless --collection notes --type json --file " +
      fileName +
      " --jsonArray --mode merge"
  );
}, pages * secondsForEachExport * 1000);
