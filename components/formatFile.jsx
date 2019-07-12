
const replace = require("replace-in-file");

const options = {
  files: "./../results/cars-olx.json",
  from: [
    /Autom�tic/g,
    /autom�tic/g,
    /AUTOM�TIC/g,
    /C�mbio/g,
    /pre�o/g,
    /gracas/g,
    /V�rzea/g,
    /Imperd�vel/g,
    /Impec�vel/g,
    /complet�o/g,
    /�tim/g,
    /�nic/g,
    /�pido/g,
    /ultim�dia/g,
    /�gua/g,
    /Gra�as/g,
    /F�brica/g,
    /�gua/g,
    /Po�o da Panela/g,
    /ov�ssimo/g,
    /Est�ncia/g,
    /Torr�es/g,
    /Torre�o/g,
    /gera��o/g,
    /Fund�o/g,
    /Est�ncia/g,
    /r�tis /g,
    /g�s/g,
    /G�s/g,
    /Jiqui�/g,
    /S�o /g,
    /Jos� /g
  ],
  to: [
    "Automátic",
    "automátic",
    "AUTOMÁTIC",
    "Câmbio",
    "preço",
    "Graças",
    "Várzea",
    "Imperdível",
    "Impecável",
    "completão",
    "ótim",
    "únic",
    "ápido",
    "ultimídia",
    "água",
    "Graças",
    "Fábrica",
    "água",
    "Poço da Panela",
    "ovíssimo",
    "Estância",
    "Torrões",
    "Torreão",
    "geração",
    "Fundão",
    "Estância",
    "rátis ",
    "gás",
    "Gás",
    "Jiquiá",
    "São ",
    "José "
  ]
};


  try {
    const results = replace.sync(options);
    console.log("Replacement results:", results);
  } catch (error) {
    console.error("Error occurred:", error);
  }


