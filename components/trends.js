// Check cars category brands:
//https://github.com/pat310/google-trends-api/wiki/Google-Trends-Categories

const googleTrends = require('google-trends-api');

googleTrends.interestOverTime({
        keyword: 'Corolla',
        startTime: new Date('2018-01-01'),
        category: 863,
        resolution: 'CITY',
        hl: 'portuguese-BR',
        geo: 'BR-PE'
    })
    .then((res) => {
        console.log(res);
    })
    .catch((err) => {
        console.log(err);
    })