window.onload = function() {
  var http = new XMLHttpRequest();
  var url = "pokemons.json";
  var picture = document.getElementById("picture");
  http.open("GET", url, true);
  http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  http.onload = function() {
    if (http.readyState == 4 && http.status == 200) {
      var array = JSON.parse(this.responseText);
      Pokedex(array);
    }
    else {
      var errors = JSON.parse(http.responseText);
      for (var error in errors['errors']){
      console.log(error+' : '+errors['errors'][error]);
    }
  }
};

function Pokedex(array) {
  document.forms['pokemon'].onsubmit = function(){
    var regex = new RegExp('^[0-9]+$');
    var input = this.elements['input'].value.toLowerCase();
    if (!regex.test(input)) {
      for (var key in array) {
        if (input === array[key.toString()].name.toLowerCase()) {
          var content = array[key.toString()].name + "<br>Type : " + array[key.toString()].type;
          picture.style.backgroundImage = 'url("http://img.pokemondb.net/artwork/' + array[key.toString()].name.toLowerCase() + '.jpg")';
        }
        else {
          var content = "Pokemon " + input + " not found";
          picture.style.backgroundImage = 'url("http://vignette2.wikia.nocookie.net/assassinscreed/images/3/39/Not-found.jpg")';
        }
      }
    }
    else {
      if (input >= 1 && input <= 151) {
        var content = array[input].name + "<br>Type : " + array[input].type;
        picture.style.backgroundImage = 'url("http://img.pokemondb.net/artwork/' + array[input].name.toLowerCase() + '.jpg")';
      }
      else {
        var content = "Pokemon number " + input + " not found";
        picture.style.backgroundImage = 'url("http://vignette2.wikia.nocookie.net/assassinscreed/images/3/39/Not-found.jpg")';
      }
    }
    document.getElementById("stats").innerHTML = content;
    return false;
    }
  }
  http.send();
  return false;
};
