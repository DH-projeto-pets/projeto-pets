const btnLocation = document.querySelector('[data-button="getAddress"]');
if (btnLocation) {
  btnLocation.addEventListener("click", () => {
    navigator.geolocation.getCurrentPosition(success, error, options);
  });
}

window.onload = function () {
  navigator.geolocation.getCurrentPosition(success, error, options);
};

var options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};

async function success(pos) {
  var { latitude, longitude, accuracy, altitudeAccuracy } = pos.coords;
  console.log(accuracy);
  const address = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyDiPqRxxOBUUX9-H8OUnjgZQZukxX98TjE`
  ).then((res) => res.json());
  console.log(address);
  // console.log('Longitude: ' + crd.longitude);
  let latCampo = document.querySelector('[name="latitude"]');
  let lonCampo = document.querySelector('[name="longitude"]');
  latCampo.value = latitude;
  lonCampo.value = longitude;
  // console.log('Mais ou menos ' + crd.accuracy + ' metros.');
}

function error(err) {
  console.warn("ERROR(" + err.code + "): " + err.message);
}
