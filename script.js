window.onload = function() {
  var http = new XMLHttpRequest();
  var url = "pokemons.json";
  var picture = document.querySelector("#picture");
  var contentBox = document.querySelector("#stats");
  var notFound = "http://ecole.spault.fr/pokedex/notfound.jpg";
  var baseUrlPokemon = "http://img.pokemondb.net/artwork/";
  http.open("GET", url, true);
  http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  http.onload = function() {
    if (http.readyState == 4 && http.status == 200) {
      var array = JSON.parse(this.responseText);
      Pokedex(array);
    }
  };
  function Pokedex(array) {
    document.forms['pokemon'].onsubmit = function(){
      var regex = new RegExp('^[0-9]+$');
      var input = this.elements['input'].value.toLowerCase();
      if (!regex.test(input)) {
        for (var key in array) {
          if (input === array[key].name.toLowerCase()) {
            var cleanPokemon = array[key].name.toLowerCase().replace(". ","-").replace("'","");
            if (input == "nidoran") {
              if (confirm("Ok for male, Cancel for female.")) {
                cleanPokemon = "nidoran-m";
              }
              else {
                cleanPokemon = "nidoran-f";
              }
            }
            var content = array[key.toString()].name + "<br>Type : " + array[key.toString()].type;
            picture.style.backgroundImage = 'url("' + baseUrlPokemon + cleanPokemon + '.jpg")';
            break;
          }
          else {
            var content = "Pokemon " + input + " not found";
            picture.style.backgroundImage = 'url("' + notFound + '")';
          }
        }
      }
      else {
        if (input >= 1 && input <= 151) {
          var cleanPokemon = array[input].name.toLowerCase().replace(". ","-").replace("'","");
          if (input == 29) {
            cleanPokemon = "nidoran-f";
          }
          if (input == 32) {
            cleanPokemon = "nidoran-m";
          }
          var content = array[input].name + "<br>Type : " + array[input].type;
          picture.style.backgroundImage = 'url("' + baseUrlPokemon + cleanPokemon + '.jpg")';
        }
        else {
          var content = "Pokemon number " + input + " not found";
          picture.style.backgroundImage = 'url("' + notFound + '")';
        }
      }
      contentBox.innerHTML = content;
      return false;
      }
    }
    http.send();
};
