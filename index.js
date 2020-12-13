const osmosis = require('osmosis');
//const axios = require('axios');
//const cheerio = require('cheerio');

const fs = require('fs');
let savedData = [];

osmosis
   .get('https://incidecoder.com/ingredients/all')
	//.get('https://incidecoder.com/ingredients/helianthus-annuus-seed-oil')
   .paginate('.paddingbl > a[href]:last-child', 19).delay(5000)
   .follow('.paddingtbl > a[href]')
   .find('.ingredinfobox')
   .set({
   		name: 'h1',
   		desc:[
   		osmosis
   			.find('.itemprop')
   			.set({
   				'label': 'span.label',
    			'desc': 'span.value',
    })
    ]
     })
   .data(function(data) {
      console.log(data);
      savedData.push(data);
   })
   .log(console.log) // включить логи
   .error(console.error) // на случай нахождения ошибки
   .done(function() {
      fs.writeFile('data.json', JSON.stringify( savedData, null, 4), function(err) {
        if(err) console.error(err);
        else console.log('Data Saved to data.json file');
      })
   });
