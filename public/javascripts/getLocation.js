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
  let latCampo = document.querySelector('[name="latitude"]');
  let lonCampo = document.querySelector('[name="longitude"]');
  latCampo.value = latitude;
  lonCampo.value = longitude;
  // console.log('Mais ou menos ' + crd.accuracy + ' metros.');
}

function error(err) {
  console.warn("ERROR(" + err.code + "): " + err.message);
}
