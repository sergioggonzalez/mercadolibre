var express         = require("express"),
    app             = express(),
    axios           = require("axios");





exports.getData = function(req, res) {
    var url = 'https://api.mercadolibre.com/sites/MLA/search?q='+req.params.query;
    axios.get(url)
    .then(function (response) {
      var data = processData(response.data);
      var result = {'query':req.params.query, 'results':data}
      res.status(200).jsonp(result);
    })
    .catch(function (error) {
      console.log(error);
      res.status(500).jsonp(error);
    });
};


function processData(data){
  var resultados = data.results;
  var prices = [];
  var condition = {'Nuevo': 0, 'Usado': 0};
  var shipping = {'Si': 0, 'No': 0};
  var adress = [];


  //available_quantity
  //sold_quantity
  //address.state_name
  //shipping.free_shipping
  for(var item in resultados){
    //Precios y ventas
    prices.push({'Item': resultados[item].title, 'price': resultados[item].price, 'sold': resultados[item].sold_quantity});

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
  return {prices, condition, shipping, addressCount};
}
