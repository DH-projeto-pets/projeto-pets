let distancia = "";
window.onload = function () {
  navigator.geolocation.getCurrentPosition(success, error, {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  });
};

async function success(pos) {
  console.log("pegou");
  var { latitude, longitude, accuracy, altitudeAccuracy } = pos.coords;
  coords = { latitude, longitude };
  distancia = distance(
    petLatitude,
    petLongitude,
    coords.latitude,
    coords.longitude
  );

  span.innerText = `${Math.round(distancia)}km de você`;
}

function error(err) {
  console.log("error");
  coords = {
    latitude: Number('<%=  user.endereco ?  user.endereco.latitude : "" %>'),
    longitude: Number('<%= user.endereco ? user.endereco.longitude : "" %>'),
  };
  distancia = distance(
    petLatitude,
    petLongitude,
    coords.latitude,
    coords.longitude
  );
  span.innerText = `${Math.round(distancia)}km de você`;
}
