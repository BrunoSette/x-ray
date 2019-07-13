const Xray = require("x-ray");
const pages = 5; //Config Number of Pages to Scrapp
const fileName = "./../results/eletronics-amazon.json"; 


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


  x("https://www.amazon.com/s?i=electronics-intl-ship&rh=n%3A%2116225009011&page=2", ".sg-col-inner", [
    {
      asin: "@data-asin",
      description: ".a-size-medium",
      link: "a@href",
      image: "img@src",
      price: ".a-price-whole",
      cents: ".a-price-fraction",
      rating: ".a-icon-alt | slice:0,3",
      votes: ".a-size-base"
      }
  ])
    .paginate("li.a-last > a@href")
    .limit(pages)
    .write(fileName);
      
