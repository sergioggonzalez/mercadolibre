var express         = require("express"),
    app             = express(),
    mongoStorage    = require('./mongoStorage'),
    axios           = require("axios");


exports.getData = function(query) {
    var url = 'https://api.mercadolibre.com/sites/MLA/search?q='+query;
    axios.get(url)
    .then(function (response) {
      var data = processData(response.data);
      var result = {'query':query, 'results':data}
      mongoStorage.storeMeliData(result);
      return result;
    })
    .catch(function (error) {
      console.log(error);
      //res.status(500).jsonp(error);
    });
};


function processData(data){
  var resultados = data.results;
  var processedData = [];
  var prices = [];
  var condition = {'Nuevo': 0, 'Usado': 0};
  var shipping = {'Si': 0, 'No': 0};
  var adress = [];


  for(var item in resultados){
    //Precios y ventas
    prices.push({'Item': resultados[item].title, 'price': resultados[item].available_quantity, 'sold': resultados[item].sold_quantity});

    //Nuevos vs Usado
    if(resultados[item].condition == 'new'){
      condition.Nuevo = condition.Nuevo + 1;
    }else{
      condition.Usado = condition.Usado + 1;
    }

    //Envio Gratis
    if(resultados[item].shipping.free_shipping == 'true'){
      shipping.Si = shipping.Si + 1;
    }else{
      shipping.No = shipping.No + 1;
    }

    //Localidad
    adress.push(resultados[item].address.state_name);
}
 var addressCount = {};

  for(var i = 0; i< adress.length; i++) {
     var loc = adress[i];
     addressCount[loc] = addressCount[loc] ? addressCount[loc]+1 : 1;
  }

  processedData.push({'type':'prices', 'stats':prices });
  processedData.push({'type':'condition', 'stats':condition });
  processedData.push({'type':'shipping', 'stats':shipping });
  processedData.push({'type':'address', 'stats':addressCount });

  return processedData;
}
